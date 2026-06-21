"use server"

import { sdk } from "@lib/config"

export async function submitSupportTicket(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return await sdk.client.fetch<{ ticket: any }>("/store/tickets", {
    method: "POST",
    body: data,
  })
}
