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
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-secondary/20 mb-4 lg:mb-6 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1 border border-transparent group-hover:border-neutral-border">
        <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-8">
          <img
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
            src={product.thumbnail || "https://medusa-public-images.s3.eu-west-1.amazonaws.com/placeholder.png"}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 lg:top-6 lg:left-6 z-10 flex flex-col gap-1.5 lg:gap-2">
          {isFeatured && (
            <span className="bg-accent text-white text-[7px] lg:text-[9px] uppercase font-black px-3 py-1 lg:px-4 lg:py-1.5 rounded-full tracking-[0.2em] shadow-xl">
              Signature
            </span>
          )}
          {cheapestPrice?.price_type === "sale" && (
            <span className="bg-primary text-white text-[7px] lg:text-[9px] uppercase font-black px-3 py-1 lg:px-4 lg:py-1.5 rounded-full tracking-[0.2em] shadow-xl">
              Special Offer
            </span>
          )}
        </div>

        {/* Quick Add - Invisible till hover */}
        <div className="absolute inset-x-3 bottom-3 lg:inset-x-6 lg:bottom-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 hidden lg:block">
          <div className="w-full h-12 lg:h-16 bg-white/90 backdrop-blur-md rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl border border-white group/btn hover:bg-accent hover:text-white transition-all duration-300">
            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.25em] text-accent group-hover/btn:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base lg:text-lg">shopping_bag</span>
              View Details
            </span>
          </div>
        </div>

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-accent/5 transition-colors duration-700"></div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1 lg:gap-2 px-1 lg:px-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs lg:text-[9px] font-extrabold text-primary/40 uppercase tracking-[0.2em]">
            {product.collection?.title || "Limited Edition"}
          </span>
          <div className="lg:flex text-primary hidden">
            <span className="material-symbols-outlined text-[6px] lg:text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[6px] lg:text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[6px] lg:text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </div>

        <h3 className="text-base lg:text-xl font-black text-accent leading-tight font-display tracking-tight group-hover:text-primary transition-colors line-clamp-1">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 lg:gap-3 mt-0.5">
          {cheapestPrice ? (
            <div className="flex items-baseline gap-1.5 lg:gap-2">
              <span className="text-sm lg:text-lg font-black text-accent">
                {cheapestPrice.calculated_price}
              </span>
              {cheapestPrice.price_type === "sale" && (
                <span className="text-[9px] lg:text-xs font-bold text-primary/30 line-through decoration-primary/50">
                  {cheapestPrice.original_price}
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm lg:text-lg font-black text-accent">$0.00</span>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
