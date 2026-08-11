import {
  AbstractPaymentProvider,
  MedusaError,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  Logger,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"
import { PaypalClient } from "./core/client"
import type { PaypalOptions, PaypalOrder } from "./types"

type InjectedDependencies = {
  logger: Logger
}

class PaypalProviderService extends AbstractPaymentProvider<PaypalOptions> {
  static identifier = "paypal"

  protected logger_: Logger
  protected options_: PaypalOptions
  protected client_: PaypalClient

  constructor(container: InjectedDependencies, options: PaypalOptions) {
    super(container, options)

    this.logger_ = container.logger
    this.options_ = options
    this.client_ = new PaypalClient(options)
  }

  static validateOptions(options: Record<string, unknown>): void | never {
    if (!options.clientId || typeof options.clientId !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal clientId is required in the provider's options."
      )
    }

    if (!options.clientSecret || typeof options.clientSecret !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal clientSecret is required in the provider's options."
      )
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context } = input

    if (amount == null || !currency_code) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Amount and currency code are required to initiate a PayPal payment"
      )
    }

    try {
      const order = await this.client_.createOrder({
        amount: Number(amount),
        currency: currency_code,
        sessionId: context?.idempotency_key,
        email: context?.customer?.email,
      })

      return {
        id: order.id,
        data: {
          id: order.id,
          status: order.status,
          amount: Number(amount),
          currency_code,
        },
      }
    } catch (error) {
      this.logger_.error("PayPal initiatePayment failed", error)
      throw error
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    const { amount, currency_code, context, data } = input

    if (amount == null || !currency_code) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Amount and currency code are required to update a PayPal payment"
      )
    }

    const existingAmount = Number(data?.amount)
    const existingCurrency = String(data?.currency_code || "").toUpperCase()

    if (
      existingAmount === Number(amount) &&
      existingCurrency === currency_code.toUpperCase() &&
      data?.id
    ) {
      return { data }
    }

    const order = await this.client_.createOrder({
      amount: Number(amount),
      currency: currency_code,
      sessionId: context?.idempotency_key,
      email: context?.customer?.email,
    })

    return {
      data: {
        id: order.id,
        status: order.status,
        amount: Number(amount),
        currency_code,
      },
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const orderId = this.getOrderId(input.data)

    if (!orderId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal order ID is required to authorize payment"
      )
    }

    try {
      let order = await this.client_.retrieveOrder(orderId)

      // Already captured (e.g. webhook raced with place-order)
      if (this.isOrderCaptured(order) || order.status === "COMPLETED") {
        return {
          status: PaymentSessionStatus.CAPTURED,
          data: this.normalizeOrderData(order, input.data),
        }
      }

      // PayPal only allows capture after the buyer approves the order.
      // Never capture CREATED / PAYER_ACTION_REQUIRED — that fails and corrupts
      // the complete-cart workflow (often surfacing as ok → temp_failure).
      if (order.status !== "APPROVED") {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          `PayPal order ${orderId} is "${order.status}" and cannot be captured yet. Complete PayPal approval first.`
        )
      }

      order = await this.client_.captureOrder(orderId)

      if (!this.isOrderCaptured(order) && order.status !== "COMPLETED") {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `PayPal capture did not complete (status: ${order.status})`
        )
      }

      // CAPTURE intent: funds are taken during authorize/place-order
      return {
        status: PaymentSessionStatus.CAPTURED,
        data: this.normalizeOrderData(order, input.data),
      }
    } catch (error) {
      this.logger_.error("PayPal authorizePayment failed", error)
      if (error instanceof MedusaError) {
        throw error
      }
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to authorize PayPal payment: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const orderId = this.getOrderId(input.data)

    if (!orderId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal order ID is required to capture payment"
      )
    }

    if (
      input.data?.status === PaymentSessionStatus.CAPTURED ||
      input.data?.status === "COMPLETED"
    ) {
      return {
        data: {
          ...input.data,
          status: PaymentSessionStatus.CAPTURED,
        },
      }
    }

    try {
      let order = await this.client_.retrieveOrder(orderId)

      if (!this.isOrderCaptured(order)) {
        order = await this.client_.captureOrder(orderId)
      }

      return {
        data: {
          ...this.normalizeOrderData(order, input.data),
          status: PaymentSessionStatus.CAPTURED,
          captured_at: new Date().toISOString(),
        },
      }
    } catch (error) {
      this.logger_.error("PayPal capturePayment failed", error)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to capture PayPal payment"
      )
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    const orderId = this.getOrderId(input.data)

    return {
      data: {
        ...(input.data || {}),
        id: orderId,
        status: PaymentSessionStatus.CANCELED,
        cancelled_at: new Date().toISOString(),
      },
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        status: PaymentSessionStatus.CANCELED,
        cancelled_at: new Date().toISOString(),
      },
    }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const orderId = this.getOrderId(input.data)

    if (!orderId) {
      return { status: PaymentSessionStatus.PENDING }
    }

    const order = await this.client_.retrieveOrder(orderId)

    if (this.isOrderCaptured(order) || order.status === "COMPLETED") {
      return { status: PaymentSessionStatus.CAPTURED }
    }

    if (order.status === "APPROVED" || order.status === "SAVED") {
      return { status: PaymentSessionStatus.AUTHORIZED }
    }

    if (order.status === "VOIDED") {
      return { status: PaymentSessionStatus.CANCELED }
    }

    return { status: PaymentSessionStatus.PENDING }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const orderId = this.getOrderId(input.data)

    if (!orderId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal order ID is required to retrieve payment"
      )
    }

    const order = await this.client_.retrieveOrder(orderId)

    return {
      data: this.normalizeOrderData(order, input.data),
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    const orderId = this.getOrderId(input.data)

    if (!orderId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayPal order ID is required to refund payment"
      )
    }

    const order =
      (input.data?.purchase_units as PaypalOrder["purchase_units"]) != null
        ? (input.data as unknown as PaypalOrder)
        : await this.client_.retrieveOrder(orderId)

    const captureIds =
      order.purchase_units
        ?.flatMap((unit) => unit.payments?.captures?.map((c) => c.id) || [])
        .filter(Boolean) || []

    if (!captureIds.length) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No PayPal captures found to refund"
      )
    }

    const refundAmount =
      input.amount != null
        ? {
            currency_code: String(
              order.purchase_units?.[0]?.amount?.currency_code ||
                input.data?.currency_code ||
                "USD"
            ).toUpperCase(),
            value: Number(input.amount).toFixed(2),
          }
        : undefined

    for (const captureId of captureIds) {
      await this.client_.refundCapture(captureId, refundAmount)
      // Only pass amount on the first capture for partial refunds
      break
    }

    return {
      data: {
        ...this.normalizeOrderData(order, input.data),
        status: "REFUNDED",
        refunded_at: new Date().toISOString(),
      },
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const { data, headers } = payload

    try {
      const normalizedHeaders = Object.fromEntries(
        Object.entries(headers || {}).map(([key, value]) => [
          key.toLowerCase(),
          Array.isArray(value) ? value.join(",") : String(value),
        ])
      )

      const verification = await this.client_.verifyWebhook({
        headers: normalizedHeaders,
        body: data as Record<string, unknown>,
      })

      if (verification.verification_status !== "SUCCESS") {
        return { action: "failed" }
      }

      const eventType = String(
        (data as Record<string, unknown>).event_type || ""
      )
      const resource = ((data as Record<string, unknown>).resource ||
        {}) as Record<string, unknown>
      const amountValue = Number(
        ((resource.amount as Record<string, unknown>)?.value as string) || 0
      )
      const sessionId = String(resource.custom_id || "")

      if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
        return {
          action: "captured",
          data: {
            session_id: sessionId,
            amount: amountValue,
          },
        }
      }

      if (eventType === "PAYMENT.CAPTURE.DENIED") {
        return {
          action: "failed",
          data: {
            session_id: sessionId,
            amount: amountValue,
          },
        }
      }

      return { action: "not_supported" }
    } catch (error) {
      this.logger_.error("PayPal webhook handling failed", error)
      return { action: "failed" }
    }
  }

  private getOrderId(data?: Record<string, unknown>): string | null {
    if (!data) {
      return null
    }

    return (
      (data.id as string) ||
      (data.order_id as string) ||
      (data.orderId as string) ||
      null
    )
  }

  private isOrderCaptured(order: PaypalOrder): boolean {
    if (order.status === "COMPLETED") {
      return true
    }

    return Boolean(
      order.purchase_units?.some((unit) =>
        unit.payments?.captures?.some(
          (capture) =>
            capture.status === "COMPLETED" || capture.status === "PENDING"
        )
      )
    )
  }

  private normalizeOrderData(
    order: PaypalOrder,
    previous?: Record<string, unknown>
  ): Record<string, unknown> {
    return {
      ...(previous || {}),
      id: order.id,
      status: order.status,
      purchase_units: order.purchase_units,
      intent: order.intent,
    }
  }
}

export default PaypalProviderService
