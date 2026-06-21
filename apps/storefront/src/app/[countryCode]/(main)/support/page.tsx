import { Metadata } from "next"
import SupportClient from "./SupportClient"
import React from "react"

export const metadata: Metadata = {
  title: "Customer Support | MeowCrunch",
  description: "Get in touch with the MeowCrunch support team. We're here to help you and your feline companions with order tracking, shipping, returns, and product support.",
}

export default async function SupportPage() {
  return <SupportClient />
}
