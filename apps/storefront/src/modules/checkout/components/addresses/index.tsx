"use client"
import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Heading, Text } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between mb-8">
        <Heading
          level="h2"
          className="flex items-center text-2xl font-bold text-gray-900 gap-x-3"
        >
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Shipping Address
          {!isOpen && <CheckCircleSolid className="text-orange-500" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-4">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <Heading
                  level="h2"
                  className="text-xl font-bold text-gray-900 mb-6"
                >
                  Billing Address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-10 h-12 bg-orange-500 hover:bg-orange-600 transition-all rounded-xl" data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="animate-in fade-in duration-500">
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div
                  className="flex flex-col"
                  data-testid="shipping-address-summary"
                >
                  <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Shipping Details
                  </Text>
                  <Text className="font-semibold text-gray-900">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </Text>
                  <Text className="text-gray-500">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </Text>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Contact Information
                  </Text>
                  <Text className="text-gray-500">
                    {cart.shipping_address.phone}
                  </Text>
                  <Text className="text-gray-500 font-medium">
                    {cart.email}
                  </Text>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="billing-address-summary"
                >
                  <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Billing Details
                  </Text>

                  {sameAsBilling ? (
                    <Text className="text-gray-400 italic text-sm">
                      Same as shipping
                    </Text>
                  ) : (
                    <>
                      <Text className="font-semibold text-gray-900">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="text-gray-500">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
