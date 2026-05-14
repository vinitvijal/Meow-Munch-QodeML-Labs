import { Metadata } from "next"
import PolicyTemplate from "@modules/policies/templates"
import React from "react"

export const metadata: Metadata = {
  title: "Refund Policy | MeowCrunch",
  description: "Learn about MeowCrunch's return and refund policies for a happy pet parenting experience.",
}

export default function RefundPolicyPage() {
  return (
    <PolicyTemplate 
      title="Refund Policy" 
      effectiveDate="May 14, 2026"
    >
      <div className="space-y-12">
        <section>
          <p className="text-xl font-display font-black text-accent text-center italic">
            At MeowCrunch, your satisfaction matters to us 🐾
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Returns & Refunds</h2>
          <p>
            We accept returns only for eligible products that are unused, undamaged, and in original packaging.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Refund Process</h2>
          <p>
            Once your return is received and inspected, we will notify you about the approval status. If approved, your refund will be processed to your original payment method within 5–7 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Non-Refundable Items</h2>
          <p>
            Some items may not be eligible for return or refund, including hygiene-related or discounted products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">Need Help?</h2>
          <p className="mb-4">
            For refund or return support, contact us at:
          </p>
          <div className="bg-secondary/20 p-6 rounded-2xl border border-neutral-border inline-block">
            <p className="font-bold text-accent">support@meowcrunch.com</p>
          </div>
        </section>

        <section className="pt-8 border-t border-neutral-border text-center">
          <p className="text-primary font-bold">
            🐾 We&apos;re here to make sure you and your pets are happy with every purchase.
          </p>
        </section>
      </div>
    </PolicyTemplate>
  )
}
