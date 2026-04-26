import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-neutral-50/50 py-16">
      <div className="content-container" data-testid="cart-container">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Your Shopping <span className="text-orange-500 italic font-serif">Pantry</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Review your selected purr-ducts and get ready to treat your feline friend to something special.
          </p>
        </div>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-start">
            <div className="lg:col-span-8 flex flex-col gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                {!customer && (
                  <div className="mb-8">
                    <SignInPrompt />
                    <div className="my-8 border-t border-gray-100" />
                  </div>
                )}
                <ItemsTemplate cart={cart} />
              </div>
            </div>
            
            <div className="lg:col-span-4 sticky top-24 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              {cart && cart.region && (
                <Summary cart={cart} />
              )}
              
              <div className="mt-8 p-6 rounded-2xl bg-orange-50 border border-orange-100">
                <h3 className="text-sm font-bold text-orange-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">verified</span>
                  Purrfect Pantry Promise
                </h3>
                <p className="mt-2 text-xs text-orange-700/80 leading-relaxed">
                  We guarantee 100% satisfaction for you and your kitty. If they don't love it, we'll make it right.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
