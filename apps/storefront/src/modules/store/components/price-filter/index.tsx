"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

export default function PriceFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "100")

  const [debouncedMin] = useDebounce(minPrice, 1000)
  const [debouncedMax] = useDebounce(maxPrice, 1000)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedMin) {
      params.set("minPrice", debouncedMin)
    } else {
      params.delete("minPrice")
    }
    if (debouncedMax) {
      params.set("maxPrice", debouncedMax)
    } else {
      params.delete("maxPrice")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [debouncedMin, debouncedMax, pathname, router])

  return (
    <>
        <div className="flex items-center gap-3 mb-6">
            <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-[10px] font-black">$</span>
                <input
                    className="w-full rounded-xl border-neutral-border bg-white py-3 pl-8 pr-3 text-xs font-bold text-accent focus:border-primary focus:ring-primary/20 transition-all"
                    type="number" 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)} 
                />
            </div>
            <span className="text-primary/30 font-black">-</span>
            <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-[10px] font-black">$</span>
                <input
                    className="w-full rounded-xl border-neutral-border bg-white py-3 pl-8 pr-3 text-xs font-bold text-accent focus:border-primary focus:ring-primary/20 transition-all"
                    type="number" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                />
            </div>
        </div>
        <input 
            className="w-full accent-primary h-1.5 bg-neutral-border rounded-full appearance-none cursor-pointer"
            type="range" 
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
        />
    </>
  )
}
