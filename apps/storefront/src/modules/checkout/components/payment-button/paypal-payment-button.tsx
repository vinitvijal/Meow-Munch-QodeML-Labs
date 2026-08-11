"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PayPalPaymentButtonProps = {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}

const PayPalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [{ isResolved }] = usePayPalScriptReducer()

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const getPayPalOrderId = (): string | null => {
    if (!paymentSession?.data) {
      return null
    }

    return (
      (paymentSession.data.order_id as string) ||
      (paymentSession.data.orderId as string) ||
      (paymentSession.data.id as string) ||
      null
    )
  }

  const createOrder = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    if (!paymentSession) {
      throw new Error("Payment session not found")
    }

    const existingOrderId = getPayPalOrderId()

    if (existingOrderId) {
      return existingOrderId
    }

    setSubmitting(false)
    throw new Error(
      "PayPal order not found. Please ensure the payment session is properly initialized."
    )
  }

  const onApprove = async (data: { orderID?: string }) => {
    try {
      setSubmitting(true)
      setErrorMessage(null)

      // PayPal only fires onApprove after the buyer approved the order.
      // Guard against empty approvals before calling Medusa complete.
      if (!data?.orderID && !getPayPalOrderId()) {
        throw new Error("PayPal approval did not return an order ID")
      }

      await onPaymentCompleted()
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to process PayPal payment")
      setSubmitting(false)
    }
  }

  const onError = (err: Record<string, unknown>) => {
    setErrorMessage(
      (err.message as string) || "An error occurred with PayPal payment"
    )
    setSubmitting(false)
  }

  const onCancel = () => {
    setSubmitting(false)
    setErrorMessage("PayPal payment was cancelled")
  }

  if (!isResolved) {
    return (
      <>
        <Button disabled size="large" isLoading={true} data-testid={dataTestId}>
          Loading PayPal...
        </Button>
        <ErrorMessage
          error={errorMessage}
          data-testid="paypal-payment-error-message"
        />
      </>
    )
  }

  return (
    <>
      <div className="mb-4">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          style={{
            layout: "horizontal",
            color: "black",
            shape: "rect",
            label: "buynow",
          }}
          disabled={notReady || submitting}
        />
      </div>
      <ErrorMessage
        error={errorMessage}
        data-testid="paypal-payment-error-message"
      />
    </>
  )
}

export default PayPalPaymentButton
