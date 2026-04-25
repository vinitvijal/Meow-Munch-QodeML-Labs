import React from "react"
import Link from "next/link"
import { MagnifyingGlass, ShoppingBag, User, ArrowRight } from "@medusajs/icons"

export default function CustomNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto w-full gap-4">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 group" href="/">
            <div className="size-10 text-white flex items-center justify-center bg-primary rounded-2xl shadow-sm rotate-3 group-hover:rotate-0 transition-transform">
               {/* Note: Medusa icons might not have a 'pet', use something else or just text */}
               <span className="font-bold text-xl">P</span>
            </div>
            <h2 className="text-text-main dark:text-white text-xl font-extrabold tracking-tight">
              Purrfect Finds
            </h2>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <label className="flex flex-col w-full relative">
            <div className="flex w-full items-center rounded-full h-11 border border-neutral-border dark:border-neutral-border-dark bg-white dark:bg-neutral-surface-dark focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all overflow-hidden pl-4 pr-2 shadow-sm">
              <MagnifyingGlass className="text-slate-400" />
              <input
                className="w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-slate-100 placeholder:text-slate-400 px-3 text-sm focus:outline-none"
                placeholder="Search for food, toys, beds..."
              />
              <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-1.5 rounded-full transition-colors flex items-center justify-center">
                <ArrowRight />
              </button>
            </div>
          </label>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-text-main/80 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="/store">Shop</Link>
            <Link className="text-text-main/80 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="#">Stories</Link>
            <Link className="text-text-main/80 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="#">Blog</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative flex items-center justify-center size-10 rounded-full hover:bg-secondary/50 dark:hover:bg-neutral-700 text-text-main dark:text-slate-200 transition-colors">
              <ShoppingBag />
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent ring-2 ring-white dark:ring-neutral-surface-dark"></span>
            </Link>
            <Link href="/account" className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-secondary/50 dark:hover:bg-neutral-700 text-text-main dark:text-slate-200 transition-colors">
              <User />
            </Link>
            <button className="lg:hidden flex items-center justify-center size-10 rounded-full hover:bg-secondary/50 dark:hover:bg-neutral-700 text-text-main dark:text-slate-200 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
