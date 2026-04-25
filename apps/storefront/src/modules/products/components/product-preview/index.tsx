import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group relative flex flex-col bg-transparent h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#F6F7F9] mb-3 transition-colors group-hover:bg-[#f0f2f5]">
        <img alt={product.title}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 p-6"
          src={product.thumbnail || "https://lh3.googleusercontent.com/aida-public/AB6AXuARLqe6PXL8IVV3Ae_7KwCqOXS8SzjU3YGQkcu18AD-Db7psxzB4f-E-i30UAr_NL2XhvTSxeNxkqC6EuqtGGuM5o2opDG9ADpHQ5Z3R_-ak9iSQ9aI8lVoaUnHTfzQm_22-xa4OftayZPIurFB4_Dp4-8DwYpRJW6BTaeOr5CkhnoKIh-szkVodk6URnasoN9lK1OTK4ULJrHO2n7GDtNUvrnd8L-D3lTeZqyETW8blhuFgWHXOEOpNRBhNmbataYNHlCJUcExsfo"} />
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-md shadow-sm text-neutral-800 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full tracking-widest">Bestseller</span>
          </div>
        )}
        {/* Subtle Add to Cart hover icon inside image */}
        <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="flex items-center justify-center size-10 bg-white shadow-md rounded-full text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1 px-1">
        <h3 className="text-[15px] font-semibold text-neutral-900 group-hover:text-neutral-500 transition-colors cursor-pointer line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="mt-1 pt-0">
          <div className="flex items-center gap-2 font-medium text-neutral-900 text-[15px]">
            {cheapestPrice ? <PreviewPrice price={cheapestPrice} /> : "$0.00"}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
