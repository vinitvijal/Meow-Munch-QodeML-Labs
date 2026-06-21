import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updateTicketStep } from "./steps/update-ticket"

type UpdateTicketWorkflowInput = {
  id: string
  status?: string
}

export const updateTicketWorkflow = createWorkflow(
  "update-ticket",
  function (input: UpdateTicketWorkflowInput) {
    const ticket = updateTicketStep(input)
    return new WorkflowResponse(ticket)
  }
)
