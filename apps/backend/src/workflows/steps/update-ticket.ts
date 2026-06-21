import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type UpdateTicketInput = {
  id: string
  status?: string
}

export const updateTicketStep = createStep(
  "update-ticket",
  async (input: UpdateTicketInput, { container }) => {
    const supportService = container.resolve("support")
    
    // Retrieve previous state for compensation rollback
    const previousTicket = await supportService.retrieveTicket(input.id)
    
    const ticket = await supportService.updateTickets(input)
    
    return new StepResponse(ticket, {
      id: input.id,
      status: previousTicket.status,
    })
  },
  async (previousData, { container }) => {
    if (previousData) {
      const supportService = container.resolve("support")
      await supportService.updateTickets({
        id: previousData.id,
        status: previousData.status,
      })
    }
  }
)
