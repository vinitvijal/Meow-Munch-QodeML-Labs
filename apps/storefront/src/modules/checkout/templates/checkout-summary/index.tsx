import { Heading } from "@modules/common/components/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import CartTotals from "@modules/common/components/cart-totals"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="sticky top-32 flex flex-col gap-y-8 p-10 rounded-[2.5rem] bg-white border border-neutral-border shadow-soft shadow-primary/5">
      <div className="w-full flex flex-col gap-y-6">
        <Heading
          level="h2"
          className="text-2xl font-black text-accent flex items-center gap-3 font-display italic"
        >
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          Order Overview
        </Heading>
        
        <div className="bg-background-light rounded-2xl p-6 border border-neutral-border">
           <CartTotals totals={cart} />
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.25em] italic">Items In Bag</h3>
          <ItemsPreviewTemplate cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
