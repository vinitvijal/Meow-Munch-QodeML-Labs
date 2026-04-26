import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group relative flex flex-col bg-transparent h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-[#F9FAFB] dark:bg-slate-900 mb-6 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-orange-100 group-hover:-translate-y-2">
        <div className="absolute inset-0 flex items-center justify-center p-8">
           <img 
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
            src={product.thumbnail || "https://medusa-public-images.s3.eu-west-1.amazonaws.com/placeholder.png"} 
          />
        </div>

        {/* Badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          {isFeatured && (
            <span className="bg-slate-900 text-white text-[9px] uppercase font-black px-4 py-1.5 rounded-full tracking-[0.2em] shadow-xl">
              Signature
            </span>
          )}
          {cheapestPrice?.price_type === "sale" && (
            <span className="bg-orange-500 text-white text-[9px] uppercase font-black px-4 py-1.5 rounded-full tracking-[0.2em] shadow-xl animate-pulse">
              Private Offer
            </span>
          )}
        </div>

        {/* Quick Add - Invisible till hover */}
        <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <div className="w-full h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white group/btn hover:bg-orange-500 transition-all duration-300">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-900 group-hover/btn:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              Quick Claim
            </span>
          </div>
        </div>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between gap-4">
           <span className="text-[9px] font-extrabold text-slate-300 uppercase tracking-[0.3em]">
            {product.collection?.title || "Limited Edition"}
          </span>
          <div className="flex text-orange-400">
             <span className="material-symbols-outlined text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
             <span className="material-symbols-outlined text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
             <span className="material-symbols-outlined text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight font-display tracking-tight group-hover:text-orange-500 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-3 mt-1">
          {cheapestPrice ? (
            <div className="flex items-baseline gap-2">
               <span className="text-lg font-black text-slate-900 dark:text-white">
                {cheapestPrice.calculated_price}
              </span>
              {cheapestPrice.price_type === "sale" && (
                <span className="text-xs font-bold text-slate-300 line-through decoration-orange-500/50">
                  {cheapestPrice.original_price}
                </span>
              )}
            </div>
          ) : (
             <span className="text-lg font-black text-slate-900">$0.00</span>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
