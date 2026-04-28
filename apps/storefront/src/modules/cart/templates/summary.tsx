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
    <div className="flex flex-col gap-y-6 p-10 rounded-[2.5rem] bg-white shadow-soft border border-neutral-border transition-all hover:shadow-2xl hover:shadow-primary/5">
      <Heading level="h2" className="text-2xl font-black text-accent flex items-center gap-3 font-display italic">
        <span className="w-2 h-8 bg-primary rounded-full"></span>
        Order Summary
      </Heading>
      
      <div className="space-y-4">
        <CartTotals totals={cart} />
      </div>

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-16 bg-accent hover:bg-primary transition-all duration-300 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-accent/10 transform hover:-translate-y-1">
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
