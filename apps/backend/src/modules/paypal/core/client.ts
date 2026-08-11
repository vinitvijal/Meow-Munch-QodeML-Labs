import { MedusaError } from "@medusajs/framework/utils"
import type {
  PaypalAccessTokenResponse,
  PaypalCreateOrderInput,
  PaypalOptions,
  PaypalOrder,
  PaypalWebhookVerifyResponse,
} from "../types"

type WebhookVerificationInput = {
  headers: Record<string, string>
  body: Record<string, unknown>
}

export class PaypalClient {
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly baseUrl: string
  private readonly webhookId?: string

  private accessToken?: string
  private accessTokenExpiresAt = 0

  constructor(options: PaypalOptions) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
    this.webhookId = options.webhookId
    this.baseUrl =
      options.isSandbox === false
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com"
  }

  async createOrder(input: PaypalCreateOrderInput): Promise<PaypalOrder> {
    const amountValue = this.formatAmount(input.amount)

    return this.request<PaypalOrder>("/v2/checkout/orders", {
      method: "POST",
      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: input.currency.toUpperCase(),
              value: amountValue,
            },
            ...(input.sessionId ? { custom_id: input.sessionId } : {}),
          },
        ],
        application_context: {
          user_action: "PAY_NOW",
          ...(input.email ? { shipping_preference: "NO_SHIPPING" } : {}),
        },
      },
    })
  }

  async retrieveOrder(orderId: string): Promise<PaypalOrder> {
    return this.request<PaypalOrder>(`/v2/checkout/orders/${orderId}`, {
      method: "GET",
    })
  }

  async captureOrder(orderId: string): Promise<PaypalOrder> {
    return this.request<PaypalOrder>(
      `/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        body: {},
      }
    )
  }

  async refundCapture(
    captureId: string,
    amount?: { currency_code: string; value: string }
  ): Promise<Record<string, unknown>> {
    return this.request(`/v2/payments/captures/${captureId}/refund`, {
      method: "POST",
      body: amount
        ? {
            amount,
          }
        : {},
    })
  }

  async verifyWebhook({
    headers,
    body,
  }: WebhookVerificationInput): Promise<PaypalWebhookVerifyResponse> {
    if (!this.webhookId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal webhook ID is not configured"
      )
    }

    return this.request<PaypalWebhookVerifyResponse>(
      "/v1/notifications/verify-webhook-signature",
      {
        method: "POST",
        body: {
          auth_algo: headers["paypal-auth-algo"],
          cert_url: headers["paypal-cert-url"],
          transmission_id: headers["paypal-transmission-id"],
          transmission_sig: headers["paypal-transmission-sig"],
          transmission_time: headers["paypal-transmission-time"],
          webhook_id: this.webhookId,
          webhook_event: body,
        },
      }
    )
  }

  private formatAmount(amount: number): string {
    return Number(amount).toFixed(2)
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now()
    if (this.accessToken && now < this.accessTokenExpiresAt) {
      return this.accessToken
    }

    const credentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString("base64")

    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to authenticate with PayPal: ${response.status} ${errorBody}`
      )
    }

    const data = (await response.json()) as PaypalAccessTokenResponse
    this.accessToken = data.access_token
    // Refresh one minute before expiry
    this.accessTokenExpiresAt = now + (data.expires_in - 60) * 1000

    return this.accessToken
  }

  private async request<T>(
    path: string,
    options: {
      method: "GET" | "POST"
      body?: Record<string, unknown>
    }
  ): Promise<T> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `PayPal API error (${options.method} ${path}): ${response.status} ${errorBody}`
      )
    }

    if (response.status === 204) {
      return {} as T
    }

    return (await response.json()) as T
  }
}
