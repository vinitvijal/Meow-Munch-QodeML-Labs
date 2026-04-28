"use client"
import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import {
  Button,
  Container,
  Heading,
  Text,
  clx,
} from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between mb-8">
        <Heading
          level="h2"
          className={clx(
            "flex items-center text-2xl font-black text-accent gap-x-4 font-display italic",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid className="text-primary" />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors underline underline-offset-4 decoration-primary/30"
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block animate-in fade-in slide-in-from-top-2 duration-500" : "hidden"}>
          <div className="mb-6">
            <span className="text-sm text-gray-500 leading-relaxed max-w-prose block">
              Please select your preferred payment method. All transactions are safe, secure, and encrypted.
            </span>
          </div>

          {!paidByGiftcard && availablePaymentMethods?.length && (
            <div className="space-y-4">
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id} className="mb-4">
                    {isStripeLike(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {paidByGiftcard && (
            <div className="flex items-center gap-6 bg-background-light p-6 rounded-[2rem] border border-neutral-border max-w-max">
              <div className="bg-secondary p-3 rounded-2xl shadow-sm">
                 <span className="material-symbols-outlined text-primary text-2xl">card_giftcard</span>
              </div>
              <div className="flex flex-col">
                <Text className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] mb-1 italic">
                  Payment Method
                </Text>
                <Text className="font-black text-accent uppercase tracking-widest text-[11px]" data-testid="payment-method-summary">
                  Gift card
                </Text>
              </div>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="w-full h-16 bg-accent hover:bg-primary transition-all duration-300 rounded-2xl mt-8 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-accent/10 transform hover:-translate-y-1"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {!activeSession && isStripeLike(selectedPaymentMethod)
              ? " Enter card details"
              : "Continue to review"}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block animate-in fade-in duration-500"}>
          {cart && paymentReady && activeSession ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-background-light rounded-[2rem] border border-neutral-border">
              <div className="flex flex-col">
                <Text className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] mb-4 italic">
                  Payment Method
                </Text>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl border border-neutral-border shadow-sm">
                    {paymentInfoMap[activeSession?.provider_id]?.icon || (
                      <CreditCard className="text-primary/40" />
                    )}
                  </div>
                  <Text
                    className="font-black text-accent uppercase tracking-widest text-[11px]"
                    data-testid="payment-method-summary"
                  >
                    {paymentInfoMap[activeSession?.provider_id]?.title ||
                      activeSession?.provider_id}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Details
                </Text>
                <div
                  className="flex gap-2 items-center"
                  data-testid="payment-details-summary"
                >
                  <Text className="text-gray-500 font-medium lowercase">
                    {isStripeLike(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Card on file"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 max-w-max">
               <div className="bg-orange-100 p-2 rounded-lg">
                 <span className="material-symbols-outlined text-orange-600">card_giftcard</span>
              </div>
              <div className="flex flex-col">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Payment Method
                </Text>
                <Text
                  className="font-semibold text-gray-900"
                  data-testid="payment-method-summary"
                >
                  Gift card
                </Text>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
