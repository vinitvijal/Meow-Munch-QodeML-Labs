import { Metadata } from "next"
import PolicyTemplate from "@modules/policies/templates"
import React from "react"

export const metadata: Metadata = {
  title: "Terms & Conditions | MeowCrunch",
  description: "Terms and conditions for using MeowCrunch products and services.",
}

export default function TermsPage() {
  return (
    <PolicyTemplate 
      title="Terms & Conditions" 
      effectiveDate="May 14, 2026"
    >
      <div className="space-y-12">
        <section>
          <p className="text-lg leading-relaxed">
            Welcome to <strong>MeowCrunch</strong>. These Terms & Conditions (&quot;Terms&quot;) govern your use of our website, products, and services. By accessing or using our website, you agree to comply with these Terms. If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">1. Use of the Website</h2>
          <p className="mb-4">By using MeowCrunch, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are at least 18 years old or using the website under supervision of a parent/guardian</li>
            <li>You will use the website only for lawful purposes</li>
            <li>You will not misuse, disrupt, or interfere with the website’s functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">2. Products & Services</h2>
          <p className="mb-4">MeowCrunch offers pet-related products and services. We strive to ensure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accurate product descriptions and pricing</li>
            <li>Availability of products (subject to stock)</li>
          </ul>
          <p className="mt-4 mb-4">However, we reserve the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or discontinue products without notice</li>
            <li>Correct pricing or description errors at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">3. Orders & Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All orders placed through our website are subject to acceptance</li>
            <li>We reserve the right to cancel or refuse any order</li>
            <li>Prices are listed in INR and may change without notice</li>
            <li>Payments must be completed through approved payment methods</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">4. Shipping & Delivery</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Delivery timelines are estimates and may vary</li>
            <li>Delays may occur due to unforeseen circumstances</li>
            <li>MeowCrunch is not responsible for delays caused by courier services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">5. Returns & Refunds</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Returns are accepted only under specified conditions</li>
            <li>Products must be unused and in original packaging</li>
            <li>Refunds will be processed after inspection of returned items</li>
            <li>Certain items may not be eligible for return (e.g., hygiene-related products)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">6. Intellectual Property</h2>
          <p className="mb-4">All content on this website, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Logos</li>
            <li>Images</li>
            <li>Text</li>
            <li>Designs</li>
          </ul>
          <p>is the property of MeowCrunch and is protected by intellectual property laws. You may not copy, reproduce, or distribute any content without permission.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">7. User Accounts</h2>
          <p className="mb-4">If you create an account:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for maintaining confidentiality of your login details</li>
            <li>You agree to provide accurate and complete information</li>
            <li>We reserve the right to suspend or terminate accounts if misuse is detected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">8. Limitation of Liability</h2>
          <p className="mb-4">MeowCrunch is not liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Losses resulting from use or inability to use our website</li>
            <li>Errors or interruptions in service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">9. Third-Party Links</h2>
          <p className="mb-4">Our website may contain links to third-party websites. We are not responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Their content</li>
            <li>Their privacy practices</li>
            <li>Any damages resulting from their use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">10. Changes to Terms</h2>
          <p>We may update these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the website means you accept the updated Terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">11. Governing Law</h2>
          <p>These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes will be subject to the jurisdiction of the courts in [Your City].</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">12. Contact Us</h2>
          <p className="mb-4">If you have any questions about these Terms, you can contact us at:</p>
          <div className="bg-secondary/20 p-6 rounded-2xl border border-neutral-border">
            <p className="mb-2"><strong>Email:</strong> support@meowcrunch.com</p>
            <p><strong>Website:</strong> www.meowcrunch.com</p>
          </div>
        </section>
      </div>
    </PolicyTemplate>
  )
}
