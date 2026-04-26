"use client"

import { Heading, Text, clx } from "@modules/common/components/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between mb-8">
        <Heading
          level="h2"
          className={clx(
            "flex items-center text-2xl font-bold text-gray-900 gap-x-3",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Review Order
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-start gap-x-1 w-full mb-8 bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
            <div className="w-full">
              <Text className="text-sm text-gray-500 leading-relaxed">
                By clicking the **Place Order** button, you confirm that you have
                read, understand and accept our **Terms of Use**, **Terms of Sale** and
                **Returns Policy** and acknowledge that you have read Meow Munch
                Store&apos;s **Privacy Policy**.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </div>
      )}
    </div>
  )
}

export default Review
