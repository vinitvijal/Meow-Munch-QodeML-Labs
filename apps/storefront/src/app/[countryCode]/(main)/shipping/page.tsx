import { Metadata } from "next"
import PolicyTemplate from "@modules/policies/templates"
import React from "react"

export const metadata: Metadata = {
  title: "Shipping Policy | MeowCrunch",
  description: "Understand MeowCrunch's shipping times, charges, and tracking information.",
}

export default function ShippingPolicyPage() {
  return (
    <PolicyTemplate 
      title="Shipping Policy" 
      effectiveDate="May 14, 2026"
    >
      <div className="space-y-12">
        <section>
          <p className="text-xl font-display font-black text-accent text-center italic">
            At MeowCrunch, we aim to deliver your orders quickly and safely 🐾
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Order Processing</h2>
          <p>
            All orders are processed within 1–2 business days after confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Delivery Time</h2>
          <p>
            Estimated delivery time is 3–7 business days, depending on your location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Shipping Charges</h2>
          <p>
            Shipping fees (if applicable) will be shown at checkout before payment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive a tracking link via email or SMS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Delays</h2>
          <p>
            Delays may occur due to weather, courier issues, or high order volume. We appreciate your patience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Need Help?</h2>
          <p className="mb-4">
            For shipping-related queries, contact us at:
          </p>
          <div className="bg-secondary/20 p-6 rounded-2xl border border-neutral-border inline-block">
            <p className="font-bold text-accent">support@meowcrunch.com</p>
          </div>
        </section>

        <section className="pt-8 border-t border-neutral-border text-center">
          <p className="text-primary font-bold">
            🐾 We&apos;re committed to delivering your MeowCrunch products safely and on time.
          </p>
        </section>
      </div>
    </PolicyTemplate>
  )
}
