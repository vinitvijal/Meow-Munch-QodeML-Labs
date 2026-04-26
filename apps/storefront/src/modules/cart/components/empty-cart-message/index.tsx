import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 px-8 flex flex-col justify-center items-center text-center bg-white rounded-3xl border border-dashed border-gray-200" data-testid="empty-cart-message">
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-5xl text-orange-400">shopping_basket</span>
      </div>
      <Heading
        level="h1"
        className="text-3xl font-extrabold text-gray-900"
      >
        Your pantry is empty
      </Heading>
      <Text className="text-lg text-gray-500 mt-4 mb-8 max-w-md">
        Looks like you haven&apos;t added any treats for your feline friend yet. Let&apos;s find something purr-fect!
      </Text>
      <div>
        <InteractiveLink href="/store" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
          Start Shopping
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
