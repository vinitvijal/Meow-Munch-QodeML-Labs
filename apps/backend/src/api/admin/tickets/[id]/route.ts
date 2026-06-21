import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateTicketWorkflow } from "../../../../workflows/update-ticket"
import { AdminUpdateTicketSchema } from "../../../middlewares"

export async function POST(
  req: AuthenticatedMedusaRequest<AdminUpdateTicketSchema>,
  res: MedusaResponse
) {
  const { id } = req.params

  const { result } = await updateTicketWorkflow(req.scope).run({
    input: {
      id,
      ...req.validatedBody,
    },
  })

  res.status(200).json({ ticket: result })
}
