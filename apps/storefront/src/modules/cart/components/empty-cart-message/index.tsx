import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-32 px-8 flex flex-col justify-center items-center text-center bg-white rounded-[3rem] border border-neutral-border shadow-soft" data-testid="empty-cart-message">
      <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-8 shadow-inner">
        <span className="material-symbols-outlined text-6xl text-primary">shopping_basket</span>
      </div>
      <Heading
        level="h1"
        className="text-4xl font-black text-accent font-display italic"
      >
        Your pantry is empty
      </Heading>
      <Text className="text-xl text-primary/60 mt-4 mb-10 max-w-md font-medium leading-relaxed">
        Looks like you haven&apos;t added any treats for your feline friend yet. Let&apos;s find something purr-fect!
      </Text>
      <div>
        <InteractiveLink href="/store" className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all shadow-xl shadow-accent/10 transform hover:-translate-y-1">
          Explore the Store
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
