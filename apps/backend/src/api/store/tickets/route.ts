import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createTicketWorkflow } from "../../../workflows/create-ticket"
import { StoreCreateTicketSchema } from "../../middlewares"

export async function POST(
  req: MedusaRequest<StoreCreateTicketSchema>,
  res: MedusaResponse
) {
  const { result } = await createTicketWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.status(200).json({ ticket: result })
}
