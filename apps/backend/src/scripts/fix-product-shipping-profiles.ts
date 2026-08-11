import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"

/**
 * Assigns the Default Shipping Profile to every product missing one.
 * Run: npx medusa exec ./src/scripts/fix-product-shipping-profiles.ts
 */
export default async function fixProductShippingProfiles({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillment = container.resolve(Modules.FULFILLMENT)

  const shippingProfiles = await fulfillment.listShippingProfiles({})
  const defaultProfile =
    shippingProfiles.find((p) =>
      p.name?.toLowerCase().includes("default")
    ) || shippingProfiles[0]

  if (!defaultProfile) {
    throw new Error("No shipping profile found in the store")
  }

  logger.info(
    `Using shipping profile: ${defaultProfile.name} (${defaultProfile.id})`
  )

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "shipping_profile.id"],
  })

  const productsMissingProfile = (products || []).filter(
    (product: { shipping_profile?: { id?: string } | null }) =>
      !product.shipping_profile?.id
  )

  logger.info(
    `Found ${productsMissingProfile.length} products without a shipping profile (of ${(products || []).length})`
  )

  if (!productsMissingProfile.length) {
    logger.info("Nothing to update.")
    return
  }

  const batchSize = 50
  let updated = 0

  for (let i = 0; i < productsMissingProfile.length; i += batchSize) {
    const batch = productsMissingProfile.slice(i, i + batchSize)

    await updateProductsWorkflow(container).run({
      input: {
        products: batch.map((product: { id: string }) => ({
          id: product.id,
          shipping_profile_id: defaultProfile.id,
        })),
      },
    })

    updated += batch.length
    logger.info(`Updated ${updated}/${productsMissingProfile.length} products`)
  }

  logger.info(
    `Done. Assigned "${defaultProfile.name}" to ${updated} products.`
  )
}
