import React from "react"
import Link from "next/link"
import { MagnifyingGlass, ShoppingBag, User } from "@medusajs/icons"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import MobileMenu from "./MobileMenu"
import SearchBar from "./SearchBar"

export default async function CustomNav() {
  const [collectionsResponse, categories] = await Promise.all([
    listCollections({ offset: "0", limit: "10" }),
    listCategories()
  ]);

  const collections = collectionsResponse?.collections || [];
  // Filter top-level categories (no parent)
  const topLevelCategories = categories ? categories.filter(c => !c.parent_category_id) : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm relative">
      {/* Top Row: Logo, Search, Actions */}
      <div className="bg-white px-4 sm:px-8 py-4 border-b border-gray-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <LocalizedClientLink href="/" className="flex items-center gap-2 group shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
            <span className="text-2xl font-black text-[#1a1a1a] tracking-tight font-display hidden sm:block">
              MeowCrunch
            </span>
          </LocalizedClientLink>

          {/* Search Bar */}
          <SearchBar className="flex-1 max-w-2xl group hidden md:block" />

          {/* Actions */}
          <div className="flex items-center gap-6 shrink-0">
            <LocalizedClientLink href="/support" className="hidden lg:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wider">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Support
            </LocalizedClientLink>
            <LocalizedClientLink href="/account" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wider">
              <User className="size-5" />
              <span className="hidden sm:inline">Account</span>
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wider relative group">
              <div className="relative">
                <ShoppingBag className="size-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold size-4 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  1
                </span>
              </div>
              <span className="hidden sm:inline">Cart</span>
            </LocalizedClientLink>
            <MobileMenu categories={topLevelCategories} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Navigation Links */}
      <nav className="bg-white px-4 sm:px-8 hidden md:block border-b border-gray-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-10 relative">
          {topLevelCategories.map((category) => (
            <div key={category.id} className="group py-4">
              <LocalizedClientLink
                href={`/categories/${category.handle}`}
                className="text-[13px] font-black text-gray-800 hover:text-primary transition-colors uppercase tracking-[0.15em] border-b-2 border-transparent group-hover:border-primary pb-1"
              >
                {category.name}
              </LocalizedClientLink>

              {/* Mega Menu Dropdown */}
              {((category.category_children && category.category_children.length > 0) || true) && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 z-[100]">
                  <div className="max-w-[1440px] mx-auto grid grid-cols-5 min-h-[350px]">
                    {/* Categories Columns (4/5 width) */}
                    <div className="col-span-4 p-12 grid grid-cols-4 gap-12">
                      {category.category_children && category.category_children.length > 0 ? (
                        category.category_children.map((child) => (
                          <div key={child.id} className="flex flex-col gap-5">
                            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-3">
                              {child.name}
                            </h3>
                            <div className="flex flex-col gap-3">
                              {child.category_children && child.category_children.length > 0 ? (
                                child.category_children.map((subChild) => (
                                  <LocalizedClientLink
                                    key={subChild.id}
                                    href={`/categories/${subChild.handle}`}
                                    className="text-xs font-bold text-gray-500 hover:text-primary transition-colors"
                                  >
                                    {subChild.name}
                                  </LocalizedClientLink>
                                ))
                              ) : (
                                <LocalizedClientLink
                                  href={`/categories/${child.handle}`}
                                  className="text-xs font-bold text-gray-500 hover:text-primary transition-colors italic"
                                >
                                  Explore {child.name}
                                </LocalizedClientLink>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 flex items-center justify-center text-gray-300 italic font-medium">
                          Discover our exclusive {category.name} collection
                        </div>
                      )}
                    </div>

                    {/* Featured/Banner Column (1/5 width) */}
                    <div className="col-span-1 bg-[#FAF8F3] p-10 flex flex-col justify-between relative overflow-hidden group/banner border-l border-gray-100">
                      <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3 block">Premium Picks</span>
                        <h4 className="text-2xl font-black text-gray-900 leading-[1.1] mb-6 font-display">
                          New Arrivals for {category.name}
                        </h4>
                        <LocalizedClientLink
                          href={`/categories/${category.handle}`}
                          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 group-hover/banner:text-primary transition-colors"
                        >
                          <span className="border-b-2 border-primary pb-0.5">Shop Collection</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </LocalizedClientLink>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-transform duration-1000 group-hover/banner:scale-150" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 blur-2xl" />

                      <div className="relative z-10 mt-12">
                        <img
                          src="/logo.png"
                          alt=""
                          className="h-16 w-auto opacity-10 grayscale brightness-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Additional static links */}
          <LocalizedClientLink href="/store" className="text-[13px] font-black text-gray-800 hover:text-primary transition-colors uppercase tracking-[0.15em] py-4 border-b-2 border-transparent hover:border-primary">
            Collections
          </LocalizedClientLink>
          <LocalizedClientLink href="/store" className="text-[13px] font-black text-gray-800 hover:text-primary transition-colors uppercase tracking-[0.15em] py-4 border-b-2 border-transparent hover:border-primary">
            Hot Deals
          </LocalizedClientLink>
          <LocalizedClientLink href="/blog" className="text-[13px] font-black text-gray-800 hover:text-primary transition-colors uppercase tracking-[0.15em] py-4 border-b-2 border-transparent hover:border-primary">
            Blogs
          </LocalizedClientLink>
        </div>
      </nav>

    </header>
  )
}

