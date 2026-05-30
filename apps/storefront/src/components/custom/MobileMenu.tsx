"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchBar from "./SearchBar"

export default function MobileMenu({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center size-10 rounded-full hover:bg-gray-100 text-gray-700 transition-colors relative z-[110]"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-[90]" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden flex flex-col z-[100] ${
          isOpen ? "max-h-[85vh] border-b border-gray-100" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Mobile Search Bar */}
          <SearchBar className="mb-2" inputClassName="py-3" />

          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Categories</h3>
             {categories.map((c) => (
                <LocalizedClientLink 
                  key={c.id}
                  href={`/categories/${c.handle}`}
                  className="text-sm font-black text-gray-800 hover:text-primary uppercase tracking-widest block"
                >
                  {c.name}
                </LocalizedClientLink>
             ))}
          </div>

          <div className="h-px bg-gray-100"></div>

          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Links</h3>
             <LocalizedClientLink href="/store" className="text-sm font-black text-gray-800 hover:text-primary uppercase tracking-widest block">Collections</LocalizedClientLink>
             <LocalizedClientLink href="/store" className="text-sm font-black text-gray-800 hover:text-primary uppercase tracking-widest block">Hot Deals</LocalizedClientLink>
             <LocalizedClientLink href="/blog" className="text-sm font-black text-gray-800 hover:text-primary uppercase tracking-widest block">Blogs</LocalizedClientLink>
          </div>

          <div className="h-px bg-gray-100"></div>

          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal</h3>
             <LocalizedClientLink href="/account" className="text-sm font-black text-gray-800 hover:text-primary uppercase tracking-widest block">Account</LocalizedClientLink>
             <LocalizedClientLink href="/cart" className="text-sm font-black text-gray-800 hover:text-primary uppercase tracking-widest block">Cart</LocalizedClientLink>
          </div>
        </nav>
      </div>
    </>
  )
}
