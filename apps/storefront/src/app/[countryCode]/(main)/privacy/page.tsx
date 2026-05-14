import { Metadata } from "next"
import PolicyTemplate from "@modules/policies/templates"
import React from "react"

export const metadata: Metadata = {
  title: "Privacy Policy | MeowCrunch",
  description: "Privacy policy for MeowCrunch. Learn how we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
  return (
    <PolicyTemplate 
      title="Privacy Policy" 
      effectiveDate="May 14, 2026"
    >
      <div className="space-y-12">
        <section>
          <p className="text-lg leading-relaxed">
            At <strong>MeowCrunch</strong>, your privacy is really important to MeowCrunch. This is how MeowCrunch collects your information and what MeowCrunch does with it when you are on the MeowCrunch website and use the MeowCrunch services.
          </p>
          <p className="mt-4">
            When you use the MeowCrunch website you are saying that you agree with the rules that&apos;re in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">1. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-accent mb-3">a. Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping and billing address</li>
                <li>Payment details (processed securely via third-party providers)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-accent mb-3">b. Non-Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type</li>
                <li>IP address</li>
                <li>Device information</li>
                <li>Pages visited and time spent on our site</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and deliver your orders</li>
            <li>Communicate with you regarding your purchases</li>
            <li>Improve our website and customer experience</li>
            <li>Send promotional emails (only if you opt-in)</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">3. Sharing of Information</h2>
          <p className="mb-4">We do not sell your personal data. However, we may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processors for secure transactions</li>
            <li>Shipping partners to deliver your orders</li>
            <li>Service providers who help operate our website</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">4. Cookies and Tracking Technologies</h2>
          <p className="mb-4">We use cookies to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Improve website functionality</li>
            <li>Analyze user behavior</li>
            <li>Provide a personalized experience</li>
          </ul>
          <p>You can choose to disable cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">5. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">6. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p>To exercise these rights, contact us at: <span className="font-bold text-primary">support@meowcrunch.com</span></p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">7. Third-Party Links</h2>
          <div className="space-y-2">
            <p>Our website has links to websites.</p>
            <p>We do not control how those websites handle user privacy.</p>
            <p>These external sites have their rules about user data.</p>
            <p>We are not responsible, for how they use or share user information.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">8. Children&apos;s Privacy</h2>
          <p>Our website is not for kids who&apos;re thirteen or younger. We do not collect information, from children on purpose.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">9. Changes to This Privacy Policy</h2>
          <p>We will change this policy now. Then. When we do we will put the version on this page and it will have a new date that says when it starts.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-black text-accent mb-6">10. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, you can contact us:</p>
          <div className="bg-secondary/20 p-6 rounded-2xl border border-neutral-border">
            <p className="mb-2"><strong>Email:</strong> support@meowcrunch.com</p>
            <p><strong>Address:</strong> [Insert Business Address]</p>
          </div>
        </section>
      </div>
    </PolicyTemplate>
  )
}
