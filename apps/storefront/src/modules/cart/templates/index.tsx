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
    <div className="min-h-screen bg-background-light py-16">
      <div className="content-container" data-testid="cart-container">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-accent sm:text-5xl font-display">
            Your Shopping <span className="text-primary italic font-display">Pantry</span>
          </h1>
          <p className="mt-4 text-lg text-primary/60 max-w-2xl font-medium">
            Review your selected purr-ducts and get ready to treat your feline friend to something special.
          </p>
        </div>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-start">
            <div className="lg:col-span-8 flex flex-col gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-neutral-border transition-all hover:shadow-2xl hover:shadow-primary/5">
                {!customer && (
                  <div className="mb-10">
                    <SignInPrompt />
                    <div className="my-10 border-t border-neutral-border" />
                  </div>
                )}
                <ItemsTemplate cart={cart} />
              </div>
            </div>
            
            <div className="lg:col-span-4 sticky top-32 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              {cart && cart.region && (
                <Summary cart={cart} />
              )}
              
              <div className="mt-8 p-8 rounded-[2rem] bg-secondary/30 border border-secondary">
                <h3 className="text-sm font-black text-accent flex items-center gap-2 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-lg text-primary">verified</span>
                  Pantry Promise
                </h3>
                <p className="mt-3 text-xs text-primary/70 leading-relaxed font-medium">
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
