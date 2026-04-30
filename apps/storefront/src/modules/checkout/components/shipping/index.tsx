"use client"
import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { Button, clx, Heading, Text } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string; location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string; location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => {
              if (p.value?.id) {
                pricesMap[p.value.id] = p.value.amount ?? 0
              }
            })

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          Delivery Method
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-primary" />
          )}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors underline underline-offset-4 decoration-primary/30"
                data-testid="edit-delivery-button"
              >
                Edit
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="grid">
            <div className="mb-6">
              <span className="text-sm text-gray-500 leading-relaxed max-w-prose block">
                Choose the shipping option that best fits your needs. We pride ourselves on fast, reliable delivery for your cat's treats.
              </span>
            </div>
            <div data-testid="delivery-options-container">
              <div className="pb-8 md:pt-0 pt-2 space-y-3">
                {hasPickupOptions && (
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={(_value) => {
                      const id = _pickupMethods.find(
                        (option) => !option.insufficient_inventory
                      )?.id

                      if (id) {
                        handleSetShippingMethod(id, "pickup")
                      }
                    }}
                  >
                    <Radio
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between p-5 bg-white border-2 rounded-[2rem] transition-all cursor-pointer hover:border-primary/50 hover:bg-background-light/50",
                        {
                          "border-primary bg-secondary/30 shadow-lg shadow-primary/5":
                            showPickupOptions === PICKUP_OPTION_ON,
                        }
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <MedusaRadio
                          checked={showPickupOptions === PICKUP_OPTION_ON}
                        />
                        <span className="font-semibold text-gray-900">
                          Pick up your order
                        </span>
                      </div>
                      <span className="text-accent font-black uppercase tracking-widest text-[10px]">
                        Free
                      </span>
                    </Radio>
                  </RadioGroup>
                )}
                
                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      return handleSetShippingMethod(v, "shipping")
                    }
                  }}
                  className="space-y-3"
                >
                  {_shippingMethods?.map((option) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number"

                    const isSelected = option.id === shippingMethodId

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "flex items-center justify-between p-6 bg-white border-2 rounded-[2rem] transition-all cursor-pointer",
                          {
                            "border-primary bg-secondary/30 shadow-lg shadow-primary/5": isSelected,
                            "border-neutral-border hover:border-primary/50 hover:bg-background-light/50": !isSelected && !isDisabled,
                            "opacity-50 cursor-not-allowed grayscale": isDisabled,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <MedusaRadio
                            checked={isSelected}
                          />
                          <div className="flex flex-col">
                             <span className="font-semibold text-gray-900">
                                {option.name}
                             </span>
                             <span className="text-xs text-gray-400">Regular Shipping</span>
                          </div>
                        </div>
                        <span className="font-black text-accent uppercase tracking-widest text-[11px]">
                          {option.price_type === "flat" ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "-"
                          )}
                        </span>
                      </Radio>
                    )
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid mt-4">
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">
                  Select Store
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pb-8 md:pt-0 pt-2 space-y-3">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "pickup")
                      }
                    }}
                    className="space-y-3"
                  >
                    {_pickupMethods?.map((option) => {
                      const isSelected = option.id === shippingMethodId
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficient_inventory}
                          data-testid="delivery-option-radio"
                          className={clx(
                            "flex items-center justify-between p-5 bg-white border rounded-2xl transition-all cursor-pointer",
                            {
                              "border-orange-500 ring-1 ring-orange-500 bg-orange-50/30": isSelected,
                              "border-gray-100 hover:border-orange-200 hover:bg-orange-50/10": !isSelected && !option.insufficient_inventory,
                              "opacity-50 cursor-not-allowed": option.insufficient_inventory,
                            }
                          )}
                        >
                          <div className="flex items-start gap-x-4">
                            <MedusaRadio
                              checked={isSelected}
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">
                                {option.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatAddress(
                                  (option as unknown as { service_zone?: { fulfillment_set?: { location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.location
                                    ?.address as HttpTypes.StoreCartAddress
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-orange-600">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="large"
              className="w-full h-16 bg-accent hover:bg-primary transition-all duration-300 rounded-2xl mt-6 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-accent/10 transform hover:-translate-y-1"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Continue to payment
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex items-center gap-6 bg-background-light p-6 rounded-[2rem] border border-neutral-border max-w-max">
                <div className="bg-secondary p-3 rounded-2xl shadow-sm">
                   <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
                </div>
                <div className="flex flex-col">
                  <Text className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] mb-1 italic">
                    Selected Method
                  </Text>
                  <Text className="font-black text-accent uppercase tracking-widest text-[11px]">
                    {cart.shipping_methods!.at(-1)!.name}{" "}
                    <span className="text-primary font-medium">
                      ({convertToLocale({
                        amount: cart.shipping_methods!.at(-1)!.amount!,
                        currency_code: cart?.currency_code,
                      })})
                    </span>
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Shipping
