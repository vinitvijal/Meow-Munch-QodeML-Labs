import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="min-h-screen bg-neutral-50/50 py-16">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" data-testid="checkout-container">
          <div className="lg:col-span-7 flex flex-col gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PaymentWrapper cart={cart}>
              <CheckoutForm cart={cart} customer={customer} />
            </PaymentWrapper>
          </div>
          <div className="lg:col-span-5 sticky top-24 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <CheckoutSummary cart={cart} />
            
            <div className="mt-8 p-6 rounded-2xl bg-orange-50 border border-orange-100 flex items-start gap-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                 <span className="material-symbols-outlined text-orange-600">security</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-orange-900">Secure Checkout</h3>
                <p className="mt-1 text-xs text-orange-700/80 leading-relaxed">
                  Your payment information is encrypted and processed securely. We never store your full credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
