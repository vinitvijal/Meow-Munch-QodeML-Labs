import { Heading } from "@modules/common/components/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import CartTotals from "@modules/common/components/cart-totals"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="sticky top-24 flex flex-col gap-y-8 p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="w-full flex flex-col gap-y-6">
        <Heading
          level="h2"
          className="text-2xl font-bold text-gray-900 flex items-center gap-2"
        >
          <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
          Order Overview
        </Heading>
        
        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
           <CartTotals totals={cart} />
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Items In Bag</h3>
          <ItemsPreviewTemplate cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
