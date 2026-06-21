import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type CreateTicketInput = {
  name: string
  email: string
  subject: string
  message: string
}

export const createTicketStep = createStep(
  "create-ticket",
  async (input: CreateTicketInput, { container }) => {
    const supportService = container.resolve("support")
    const ticket = await supportService.createTickets(input)
    return new StepResponse(ticket, ticket.id)
  },
  async (id, { container }) => {
    if (id) {
      const supportService = container.resolve("support")
      await supportService.deleteTickets(id)
    }
  }
)
