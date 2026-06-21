import { defineMiddlewares } from "@medusajs/framework/http"
import { validateAndTransformQuery, validateAndTransformBody } from "@medusajs/framework/http"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { z } from "zod"

export const AdminGetWishlistsSchema = z.object({
  customer_id: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})

// Store Create Ticket Schema
export const StoreCreateTicketSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.enum(["orders", "shipping", "products", "other"]),
  message: z.string().min(1),
})
export type StoreCreateTicketSchema = z.infer<typeof StoreCreateTicketSchema>

// Admin Get Tickets Schema
export const AdminGetTicketsSchema = createFindParams().merge(
  z.object({
    status: z.enum(["open", "pending", "resolved"]).optional(),
    q: z.string().optional(),
  })
)
export type AdminGetTicketsSchema = z.infer<typeof AdminGetTicketsSchema>

// Admin Update Ticket Schema
export const AdminUpdateTicketSchema = z.object({
  status: z.enum(["open", "pending", "resolved"]).optional(),
})
export type AdminUpdateTicketSchema = z.infer<typeof AdminUpdateTicketSchema>

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
    {
      matcher: "/store/tickets",
      method: "POST",
      middlewares: [
        validateAndTransformBody(StoreCreateTicketSchema),
      ],
    },
    {
      matcher: "/admin/tickets",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          AdminGetTicketsSchema,
          {
            defaults: [
              "id",
              "name",
              "email",
              "subject",
              "message",
              "status",
              "created_at",
              "updated_at",
            ],
            isList: true,
          }
        ),
      ],
    },
    {
      matcher: "/admin/tickets/:id",
      method: "POST",
      middlewares: [
        validateAndTransformBody(AdminUpdateTicketSchema),
      ],
    },
  ],
})
