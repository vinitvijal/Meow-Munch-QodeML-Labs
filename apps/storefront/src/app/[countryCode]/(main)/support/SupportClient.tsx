"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { submitSupportTicket } from "@lib/data/support"

export default function SupportClient() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "orders",
    message: ""
  })
  const [loading, setLoading] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: "How can I track my order?",
      a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also view your tracking details in your account page under Order History."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day return policy for all unopened items. If your cat doesn't like a product or you received a damaged item, please contact our support team and we will make it right."
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship to many countries worldwide! Shipping rates and delivery times vary by location and are calculated dynamically at checkout."
    },
    {
      q: "Are MeowCrunch toys safe for kittens?",
      a: "Absolutely. All MeowCrunch toys are made from non-toxic, pet-safe materials and undergo rigorous safety testing. We recommend supervising your kitten during play."
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitSupportTicket(formData)
      setFormSubmitted(true)
      setFormData({ name: "", email: "", subject: "orders", message: "" })
    } catch (err) {
      console.error("Failed to submit support ticket:", err)
      alert("Something went wrong while submitting your ticket. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  return (
    <div className="bg-[#FAF8F3] min-h-screen pb-24 font-sans">
      {/* Header / Hero */}
      <div className="pt-32 pb-20 bg-[#F5EADF] border-b border-neutral-border/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 mb-6">
            <LocalizedClientLink href="/" className="hover:text-primary transition-colors">Home</LocalizedClientLink>
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="text-primary">Support</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-accent mb-6 leading-tight tracking-tight max-w-3xl">
            How can we help you and your furry friend? 🐾
          </h1>
          <p className="text-lg text-accent/80 font-medium max-w-xl">
            Whether you have a question about our treats, shipping rates, or need order support, the MeowCrunch team is here for you.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        {/* Contact Channels Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {/* Card 1: Email */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-border/50 shadow-soft hover:shadow-lg hover:border-primary/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-bold">mail</span>
              </div>
              <h3 className="font-display font-black text-xl text-accent mb-3">Email Us</h3>
              <p className="text-accent/70 text-sm font-medium mb-6">
                Send us an email and our friendly support team will get back to you within 24 hours.
              </p>
            </div>
            <a
              href="mailto:support@meowcrunch.com"
              className="text-primary font-black hover:text-accent transition-colors text-sm inline-flex items-center gap-2"
            >
              support@meowcrunch.com &rarr;
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-border/50 shadow-soft hover:shadow-lg hover:border-primary/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-2xl bg-[#E6F3EE] flex items-center justify-center text-[#2D9F75] mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-bold">phone</span>
              </div>
              <h3 className="font-display font-black text-xl text-accent mb-3">Call Us</h3>
              <p className="text-accent/70 text-sm font-medium mb-6">
                Speak directly with one of our cat care experts for immediate order help.
              </p>
            </div>
            <span className="text-accent font-black text-sm block">
              +1 (888) MEOW-CRUNCH
              <span className="block text-xs text-accent/60 font-bold mt-1">Mon-Fri: 9 AM - 6 PM EST</span>
            </span>
          </div>

          {/* Card 3: Live Chat */}
          {/* <div className="bg-white p-8 rounded-3xl border border-neutral-border/50 shadow-soft hover:shadow-lg hover:border-primary/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-2xl bg-secondary/30 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-bold">forum</span>
              </div>
              <h3 className="font-display font-black text-xl text-accent mb-3">Live Chat</h3>
              <p className="text-accent/70 text-sm font-medium mb-6">
                Connect with our team instantly. Chat is active whenever you see the bubble icon.
              </p>
            </div>
            <button className="bg-accent text-white hover:bg-primary px-6 py-2.5 rounded-xl font-bold text-xs transition-colors self-start shadow-sm">
              Start Chat
            </button>
          </div> */}
        </div>

        {/* FAQs & Contact Form Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Accordion - 5 cols */}
          <div className="lg:col-span-5">
            <span className="text-xs font-black uppercase tracking-widest text-primary/60 mb-3 block">HELP TOPICS</span>
            <h2 className="text-3xl font-display font-black text-accent mb-8">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-neutral-border/50 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-[#FAF8F3]/50 transition-colors"
                  >
                    <span className="font-display font-black text-accent text-base leading-snug">{faq.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-300 text-accent/60 ${openFaq === i ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-40 border-t border-neutral-border/30' : 'max-h-0'}`}
                  >
                    <p className="p-6 text-accent/80 text-sm font-medium leading-relaxed bg-[#FAF8F3]/20">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form - 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-neutral-border/50 p-8 sm:p-12 shadow-soft">
            {formSubmitted ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-bounce">
                  <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
                </div>
                <h3 className="font-display font-black text-3xl text-accent mb-4">Message Sent!</h3>
                <p className="text-accent/80 font-medium max-w-sm mb-8 leading-relaxed">
                  Thank you for reaching out. We have received your inquiry and will respond to you within 24 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-accent text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-primary transition-all shadow-md hover:scale-105"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs font-black uppercase tracking-widest text-primary/60 mb-3 block">GET IN TOUCH</span>
                <h2 className="text-3xl font-display font-black text-accent mb-8">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-black text-accent/60 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Garfield"
                        className="bg-[#FAF8F3] border border-neutral-border/50 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary/50 transition-colors w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-black text-accent/60 uppercase tracking-wider">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="garfield@lasagna.com"
                        className="bg-[#FAF8F3] border border-neutral-border/50 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary/50 transition-colors w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs font-black text-accent/60 uppercase tracking-wider">How can we help?</label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-[#FAF8F3] border border-neutral-border/50 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary/50 transition-colors w-full appearance-none cursor-pointer"
                    >
                      <option value="orders">Questions about my Order</option>
                      <option value="shipping">Shipping & Delivery queries</option>
                      <option value="products">Product ingredients & details</option>
                      <option value="other">General inquiry / Feedback</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-black text-accent/60 uppercase tracking-wider">Your Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Meow! Tell us what's on your mind..."
                      className="bg-[#FAF8F3] border border-neutral-border/50 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary/50 transition-colors w-full resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-white py-4 rounded-2xl font-black text-sm hover:bg-primary disabled:bg-accent/50 transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block border-2 border-white/30 border-t-white rounded-full size-4 animate-spin" />
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">send</span>
                        Submit Ticket
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
