import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface PolicyTemplateProps {
  title: string
  effectiveDate: string
  children: React.ReactNode
}

const PolicyTemplate: React.FC<PolicyTemplateProps> = ({ title, effectiveDate, children }) => {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-secondary/30 border-b border-neutral-border">
        <div className="content-container flex flex-col items-center text-center">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 mb-8">
            <LocalizedClientLink href="/" className="hover:text-primary transition-colors">Home</LocalizedClientLink>
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="text-primary">{title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-accent mb-4 tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
            <span className="w-8 h-px bg-primary" />
            Effective Date: {effectiveDate}
            <span className="w-8 h-px bg-primary" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-16 border border-neutral-border/50">
            <div className="text-text-main leading-relaxed space-y-8">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-40 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-40 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
    </div>
  )
}

export default PolicyTemplate
