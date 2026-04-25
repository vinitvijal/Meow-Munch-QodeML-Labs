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
        <div className="flex items-center gap-3 mb-4">
            <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#61896f] text-xs">$</span>
                <input
                    className="w-full rounded-md border-[#dbe6df] bg-[#f0f4f2] py-2 pl-6 pr-2 text-sm focus:border-[#13ec5b] focus:ring-[#13ec5b]"
                    type="number" 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)} 
                />
            </div>
            <span className="text-[#61896f]">-</span>
            <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#61896f] text-xs">$</span>
                <input
                    className="w-full rounded-md border-[#dbe6df] bg-[#f0f4f2] py-2 pl-6 pr-2 text-sm focus:border-[#13ec5b] focus:ring-[#13ec5b]"
                    type="number" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                />
            </div>
        </div>
        <input 
            className="w-full accent-[#13ec5b] h-1 bg-[#dbe6df] rounded-lg appearance-none cursor-pointer"
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
