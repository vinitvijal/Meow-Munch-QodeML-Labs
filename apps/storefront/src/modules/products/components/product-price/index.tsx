import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-end gap-3">
        <span
          className={clx("text-4xl font-black tracking-tighter italic font-display", {
            "text-orange-600": selectedPrice.price_type === "sale",
            "text-slate-900 dark:text-white": selectedPrice.price_type !== "sale",
          })}
        >
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>
        {selectedPrice.price_type === "sale" && (
           <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-1 shadow-sm">
             -{selectedPrice.percentage_diff}% OFF
           </span>
        )}
      </div>
      
      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="uppercase tracking-widest">Normally</span>
          <span
            className="line-through decoration-2"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </div>
      )}
    </div>
  )
}
