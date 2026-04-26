import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen flex flex-col">
      <div className="h-20 bg-white border-b border-gray-100 flex items-center">
        <nav className="flex w-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 text-gray-500 hover:text-orange-600 transition-colors group flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90 group-hover:-translate-x-1 transition-transform" size={18} />
            <span className="text-sm font-bold uppercase tracking-tight hidden small:block">
              Back to cart
            </span>
            <span className="text-sm font-bold uppercase tracking-tight block small:hidden">
              Back
            </span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="flex items-center gap-2 group"
            data-testid="store-link"
          >
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-2xl font-bold">pets</span>
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
              Meow<span className="text-orange-500 font-medium">Munch</span>
            </span>
          </LocalizedClientLink>

          <div className="flex-1 basis-0 flex justify-end">
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                Secure Checkout
              </div>
            </div>
          </div>
        </nav>
      </div>

      <main className="relative flex-grow" data-testid="checkout-container">
        {children}
      </main>

      <footer className="bg-neutral-900 py-12">
        <div className="content-container flex flex-col items-center gap-y-8">
          <div className="flex items-center gap-12 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-orange-500">local_shipping</span>
              Premium Delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-orange-500">support_agent</span>
              Expert Support
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-orange-500">verified</span>
              Quality Guaranteed
            </div>
          </div>

          <div className="w-16 h-px bg-neutral-800"></div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xl font-black text-white tracking-widest uppercase">
              Meow<span className="text-orange-500">Munch</span>
            </span>
            <p className="text-neutral-500 text-xs">
              © {new Date().getFullYear()} Meow Munch. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl text-white">credit_card</span>
            </div>
            <div className="flex items-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default text-white">
              <span className="material-symbols-outlined text-4xl font-bold">payments</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
