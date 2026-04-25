import { Metadata } from "next"

import CustomHome from "components/custom/CustomHome"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Purrfect Finds | Home",
  description:
    "Elevate Their Everyday Life with thoughtfully designed essentials for the modern cat.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  // Filter collections for Life Stage
  const lifeStageTitles = ["Kitten", "Adult", "Senior"]
  const lifeStageCollections = collections.filter(c =>
    lifeStageTitles.includes(c.title || "")
  ).sort((a, b) =>
    lifeStageTitles.indexOf(a.title || "") - lifeStageTitles.indexOf(b.title || "")
  )

  // Fetch Best Seller products
  const bestSellerCollection = collections.find(c => c.handle === "trending" || c.title?.toLowerCase() === "trending")

  console.log("Best Seller : ", bestSellerCollection)
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
        collections={collections}
        region={region}
        lifeStageCollections={lifeStageCollections}
        bestSellerProducts={bestSellerProducts}
      />
    </>
  )
}
