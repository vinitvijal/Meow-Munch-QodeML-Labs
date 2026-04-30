import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-6">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-neutral-border transition-all hover:shadow-2xl hover:shadow-primary/5">
        <Addresses cart={cart} customer={customer} />
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-neutral-border transition-all hover:shadow-2xl hover:shadow-primary/5">
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-neutral-border transition-all hover:shadow-2xl hover:shadow-primary/5">
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-neutral-border transition-all hover:shadow-2xl hover:shadow-primary/5">
        <Review cart={cart} />
      </div>
    </div>
  )
}
