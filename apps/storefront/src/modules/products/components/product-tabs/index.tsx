"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const ProductTabs = ({ product, region }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Specifications",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Pantry Delivery",
      component: <ShippingInfoTab region={region} product={product} />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
            className="border-none py-2"
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
  return (
    <div className="text-sm py-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Material</span>
            <p className="font-bold text-slate-900">{product.material || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Provenance</span>
            <p className="font-bold text-slate-900">{product.origin_country || "N/A"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weight</span>
            <p className="font-bold text-slate-900">{product.weight ? `${product.weight} g` : "N/A"}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile</span>
            <p className="font-bold text-slate-900">{product.type ? product.type.value : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = ({ region, product }: { region: HttpTypes.StoreRegion; product: HttpTypes.StoreProduct }) => {
  const shippingPolicy = (product.metadata?.shipping_policy as string) || `Standard delivery available to your pantry in ${region.name}.`;
  
  return (
    <div className="text-sm py-6">
      <div className="flex flex-col gap-y-8">
        <div className="flex items-start gap-x-4">
           <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 flex-shrink-0">
              <span className="material-symbols-outlined">local_shipping</span>
           </div>
           <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 block mb-1">Gourmet Shipping</span>
            <p className="text-slate-500 font-medium leading-relaxed">
              {shippingPolicy}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
           <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-200 flex-shrink-0">
               <span className="material-symbols-outlined text-[20px]">sync</span>
           </div>
           <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 block mb-1">Quality Promise</span>
            <p className="text-slate-500 font-medium leading-relaxed">
              If your feline friend isn't satisfied, we offer stress-free exchanges in {region.name} within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
