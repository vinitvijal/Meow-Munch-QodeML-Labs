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
            "flex items-center text-2xl font-black text-accent gap-x-4 font-display italic",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          Review Order
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-start gap-x-1 w-full mb-8 bg-background-light p-8 rounded-[2rem] border border-neutral-border">
            <div className="w-full">
              <Text className="text-xs text-primary/60 leading-relaxed font-medium italic">
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
