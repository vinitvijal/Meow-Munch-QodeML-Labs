import { Metadata } from "next"

import CustomHome from "components/custom/CustomHome"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"

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

  // Filter collections for Life Stage
  const lifeStageTitles = ["Kitten", "Adult", "Senior"]
  const lifeStageCollections = collections.filter(c =>
    lifeStageTitles.includes(c.title || "")
  ).sort((a, b) =>
    lifeStageTitles.indexOf(a.title || "") - lifeStageTitles.indexOf(b.title || "")
  )

  // Fetch Best Seller products
  const bestSellerCollection = collections.find(c => c.handle === "trending" || c.title?.toLowerCase() === "trending")

  let bestSellerProducts: any[] = []
  if (bestSellerCollection) {
    const { response } = await listProducts({
      queryParams: { collection_id: [bestSellerCollection.id], limit: 4 },
      countryCode,
    })
    bestSellerProducts = response.products
  }

  return (
    <>
      <CustomHome
        categories={mainCategories}
        collections={collections}
        region={region}
        lifeStageCollections={lifeStageCollections}
        bestSellerProducts={bestSellerProducts}
      />
    </>
  )
}
