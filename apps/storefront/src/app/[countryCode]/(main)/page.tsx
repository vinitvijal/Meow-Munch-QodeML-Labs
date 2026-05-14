import { Metadata } from "next"

import CustomHome from "components/custom/CustomHome"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { listCategories } from "@lib/data/categories"
import { getBlogPosts } from "@lib/blog"

export const metadata: Metadata = {
  title: "Meow Munch | Home",
  description:
    "Elevate Their Everyday Life with thoughtfully designed essentials for the modern cat.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)
  const blogPosts = await getBlogPosts()

  const [categories, { collections }] = await Promise.all([
    listCategories(),
    listCollections({
      fields: "id, handle, title",
    }),
  ])

  if (!collections || !region) {
    return null
  }

  // Filter categories to only show top-level ones or specific ones
  const mainCategories = categories.filter((c) => !c.parent_category)

  // Fetch New Arrivals collection
  const newArrivalsCollection = collections.find(c => c.handle === "new-arrivals" || c.title?.toLowerCase() === "new arrivals")

  let newArrivalsProducts: any[] = []
  if (newArrivalsCollection) {
    const { response } = await listProducts({
      queryParams: { collection_id: [newArrivalsCollection.id], limit: 4 },
      countryCode,
    })
    newArrivalsProducts = response.products.map(p => ({
      ...p,
      formattedPrice: getProductPrice({ product: p as any })?.cheapestPrice?.calculated_price || null
    }))
  }

  // Fetch Popular collection
  const popularCollection = collections.find(c => c.handle === "popular" || c.title?.toLowerCase() === "popular" || c.handle === "trending")

  let popularProducts: any[] = []
  if (popularCollection) {
    const { response } = await listProducts({
      queryParams: { collection_id: [popularCollection.id], limit: 4 },
      countryCode,
    })
    popularProducts = response.products.map(p => ({
      ...p,
      formattedPrice: getProductPrice({ product: p as any })?.cheapestPrice?.calculated_price || null
    }))
  }

  return (
    <>
      <CustomHome
        categories={mainCategories}
        collections={collections}
        region={region}
        newArrivalsProducts={newArrivalsProducts}
        popularProducts={popularProducts}
        blogPosts={blogPosts}
      />
    </>
  )
}
