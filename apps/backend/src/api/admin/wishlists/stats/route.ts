import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const query = req.scope.resolve("query");

  // Fetch all wishlist items to aggregate stats
  // In a real production app with many items, this should be done via a custom service or specialized query
  const { data: items } = await query.graph({
    entity: "wishlist_item",
    fields: ["product_id", "product_variant.product.title", "product_variant.product.thumbnail"],
  });

  const statsMap: Record<string, { id: string, title: string, thumbnail: string, count: number }> = {};

  items.forEach((item: any) => {
    const productId = item.product_id;
    if (!statsMap[productId]) {
      statsMap[productId] = {
        id: productId,
        title: item.product_variant?.product?.title || "Unknown Product",
        thumbnail: item.product_variant?.product?.thumbnail || "",
        count: 0,
      };
    }
    statsMap[productId].count++;
  });

  const topProducts = Object.values(statsMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  res.json({
    top_products: topProducts,
  });
}
