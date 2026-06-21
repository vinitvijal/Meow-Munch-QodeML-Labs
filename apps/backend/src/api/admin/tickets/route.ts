import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { AdminGetTicketsSchema } from "../../middlewares"

export async function GET(
  req: AuthenticatedMedusaRequest<AdminGetTicketsSchema>,
  res: MedusaResponse
) {
  const query = req.scope.resolve("query")
  
  const filters: any = {}
  
  if (req.validatedQuery.status) {
    filters.status = req.validatedQuery.status
  }
  
  if (req.validatedQuery.q) {
    filters.$or = [
      { name: { $ilike: `%${req.validatedQuery.q}%` } },
      { email: { $ilike: `%${req.validatedQuery.q}%` } },
      { subject: { $ilike: `%${req.validatedQuery.q}%` } },
      { message: { $ilike: `%${req.validatedQuery.q}%` } },
    ]
  }

  const { data: tickets, metadata } = await query.graph({
    entity: "ticket",
    filters,
    ...req.queryConfig,
  })

  res.json({
    tickets,
    count: metadata?.count,
    offset: req.queryConfig?.pagination?.skip,
    limit: req.queryConfig?.pagination?.take,
  })
}
