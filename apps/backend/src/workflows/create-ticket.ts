import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createTicketStep } from "./steps/create-ticket"

type CreateTicketWorkflowInput = {
  name: string
  email: string
  subject: string
  message: string
}

export const createTicketWorkflow = createWorkflow(
  "create-ticket",
  function (input: CreateTicketWorkflowInput) {
    const ticket = createTicketStep(input)
    return new WorkflowResponse(ticket)
  }
)
