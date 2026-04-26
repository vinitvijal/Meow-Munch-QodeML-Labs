"use client"

import { Button, Heading } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6 p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-orange-100 transition-all hover:shadow-2xl hover:border-orange-200">
      <Heading level="h2" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
        Order Summary
      </Heading>
      
      <div className="space-y-4">
        <CartTotals totals={cart} />
      </div>

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold rounded-xl shadow-lg shadow-orange-200">
          Proceed to Checkout
        </Button>
      </LocalizedClientLink>
      
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
        <span className="material-symbols-outlined text-sm">lock</span>
        Secure Checkout
      </div>
    </div>
  )
}

export default Summary
