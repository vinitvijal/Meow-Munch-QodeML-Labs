"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { MagnifyingGlass } from "@medusajs/icons"

export default function SearchBar({ className = "", inputClassName = "" }: { className?: string; inputClassName?: string }) {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { countryCode } = useParams()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${countryCode}/store?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${inputClassName}`}
      />
      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest"
      >
        Search
      </button>
    </form>
  )
}
