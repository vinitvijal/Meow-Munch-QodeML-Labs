import { defineMiddlewares } from "@medusajs/framework/http"
import { validateAndTransformQuery } from "@medusajs/framework/http"
import { z } from "zod"

export const AdminGetWishlistsSchema = z.object({
  customer_id: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/wishlists",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          AdminGetWishlistsSchema,
          {
            defaults: [
              "id",
              "customer_id",
              "created_at",
              "items.*",
              "items.product_variant.*",
              "items.product_variant.product.*"
            ],
            isList: true,
          }
        ),
      ],
    },
  ],
})
