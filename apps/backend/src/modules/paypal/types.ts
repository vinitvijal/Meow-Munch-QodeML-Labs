export type PaypalOptions = {
  /**
   * PayPal REST API client ID.
   */
  clientId: string
  /**
   * PayPal REST API client secret.
   */
  clientSecret: string
  /**
   * Use PayPal sandbox environment when true.
   * @default true
   */
  isSandbox?: boolean
  /**
   * Webhook ID used to verify incoming PayPal webhook signatures.
   */
  webhookId?: string
}

export type PaypalCreateOrderInput = {
  amount: number
  currency: string
  sessionId?: string
  email?: string
}

export type PaypalAmount = {
  currency_code: string
  value: string
}

export type PaypalCapture = {
  id: string
  status: string
  amount?: PaypalAmount
  custom_id?: string
}

export type PaypalPurchaseUnit = {
  amount: PaypalAmount
  custom_id?: string
  payments?: {
    captures?: PaypalCapture[]
  }
}

export type PaypalOrder = {
  id: string
  status: string
  intent?: string
  purchase_units?: PaypalPurchaseUnit[]
}

export type PaypalAccessTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

export type PaypalWebhookVerifyResponse = {
  verification_status: "SUCCESS" | "FAILURE"
}
