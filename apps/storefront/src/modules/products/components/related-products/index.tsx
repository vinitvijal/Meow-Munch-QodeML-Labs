import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductListParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint py-20">
      <div className="flex flex-col items-center text-center mb-24">
        <span className="text-orange-500 font-extrabold uppercase tracking-[0.4em] text-[10px] mb-8 block font-sans">Curated Pairing</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-10 font-display uppercase leading-none">Customers also <span className="text-slate-200">Loved.</span></h2>
        <p className="text-lg text-slate-400 font-medium max-w-lg">
          Complete your gourmet collection with these hand-picked favorites from our current stock.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {products.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
