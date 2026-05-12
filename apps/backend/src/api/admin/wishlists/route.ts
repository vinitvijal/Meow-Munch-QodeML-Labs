import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const query = req.scope.resolve("query");

  const { data: wishlists, metadata } = await query.graph({
    entity: "wishlist",
    fields: ["*", "items.*", "items.product_variant.*", "items.product_variant.product.*"],
    filters: (req as any).filterableFields || {},
    ...req.queryConfig?.pagination,
  });

  res.json({
    wishlists,
    count: metadata?.count,
    offset: metadata?.take,
    limit: metadata?.take,
  });
}
