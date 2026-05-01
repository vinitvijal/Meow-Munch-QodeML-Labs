import React from "react"
import Link from "next/link"
import { MagnifyingGlass, ShoppingBag, User } from "@medusajs/icons"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"

export default async function CustomNav() {
  const [collectionsResponse, categories] = await Promise.all([
    listCollections({ offset: "0", limit: "5" }),
    listCategories()
  ]);

  const collections = collectionsResponse?.collections?.slice(0, 5) || [];
  const topCategories = categories ? categories.slice(0, 5) : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F3]/90 backdrop-blur-md border-b border-accent/10 px-4 sm:px-8 py-5 transition-all duration-300">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto w-full gap-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 group" href="/">
            <div className="w-10 h-10 flex items-center justify-center text-accent group-hover:rotate-6 transition-transform">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18.5C14.7614 18.5 17 16.2614 17 13.5C17 10.7386 14.7614 8.5 12 8.5C9.23858 8.5 7 10.7386 7 13.5C7 16.2614 9.23858 18.5 12 18.5Z" stroke="#4A3728" strokeWidth="2"/>
                <path d="M7.5 10C6 8 5 6 5 4C7 4 9 5 10 6.5" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 10C18 8 19 6 19 4C17 4 15 5 14 6.5" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="14" r="1" fill="#4A3728"/>
                <circle cx="14" cy="14" r="1" fill="#4A3728"/>
                <path d="M11 16C11.5 16.5 12.5 16.5 13 16" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-black text-accent tracking-tighter font-display">
              MeowCrunch
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <Link className="text-accent hover:text-primary text-sm font-bold transition-colors flex items-center gap-1" href="/store">
              Shop
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-accent/10 rounded-xl shadow-lg p-4 w-48 flex flex-col gap-2">
                {topCategories.map(c => (
                  <Link key={c.id} href={`/categories/${c.handle}`} className="text-sm font-medium text-accent hover:text-primary">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link className="text-accent hover:text-primary text-sm font-bold transition-colors flex items-center gap-1" href="/store">
              Collection
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-accent/10 rounded-xl shadow-lg p-4 w-48 flex flex-col gap-2">
                {collections.map(c => (
                  <Link key={c.id} href={`/collections/${c.handle}`} className="text-sm font-medium text-accent hover:text-primary">
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link className="text-accent hover:text-primary text-sm font-bold transition-colors flex items-center gap-1" href="/store">
              Hot Deals
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
          </div>

          <Link className="text-accent hover:text-primary text-sm font-bold transition-colors" href="/about">About Us</Link>
          <Link className="text-accent hover:text-primary text-sm font-bold transition-colors" href="/blog">Blogs</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 border border-accent/20 rounded-full px-3 py-1">
            <span className="text-xs font-bold text-accent">GBP £</span>
          </div>
          
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-accent/5 text-accent transition-colors">
            <MagnifyingGlass />
          </button>
          
          <Link href="/account" className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-accent/5 text-accent transition-colors">
            <User />
          </Link>
          
          <Link href="/cart" className="relative flex items-center justify-center size-10 rounded-full hover:bg-accent/5 text-accent transition-colors">
            <ShoppingBag />
            {/* The cart count will be handled by cart-button in standard Medusa store, but for now we link to /cart which works */}
          </Link>

          <button className="lg:hidden flex items-center justify-center size-10 rounded-full hover:bg-accent/5 text-accent transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
