import React from "react"
import Link from "next/link"
import { MagnifyingGlass, ShoppingBag, User, ArrowRight } from "@medusajs/icons"

export default function CustomNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background-light/80 backdrop-blur-md border-b border-neutral-border px-4 sm:px-8 py-5 transition-all duration-300">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto w-full gap-4">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 group" href="/">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-2xl font-bold">pets</span>
            </div>
            <span className="text-xl font-black text-accent tracking-tighter uppercase font-display">
              Meow<span className="text-primary font-medium tracking-normal lowercase italic">Munch</span>
            </span>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <label className="flex flex-col w-full relative">
            <div className="flex w-full items-center rounded-full h-11 border border-neutral-border bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all overflow-hidden pl-4 pr-2 shadow-sm">
              <MagnifyingGlass className="text-primary/40" />
              <input
                className="w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-text-main placeholder:text-primary/30 px-3 text-sm focus:outline-none"
                placeholder="Search for organic food, artisanal toys..."
              />
              <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-1.5 rounded-full transition-colors flex items-center justify-center">
                <ArrowRight />
              </button>
            </div>
          </label>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-text-main/70 hover:text-primary text-sm font-semibold transition-colors uppercase tracking-widest" href="/store">Shop</Link>
            <Link className="text-text-main/70 hover:text-primary text-sm font-semibold transition-colors uppercase tracking-widest" href="#">Stories</Link>
            <Link className="text-text-main/70 hover:text-primary text-sm font-semibold transition-colors uppercase tracking-widest" href="#">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative flex items-center justify-center size-10 rounded-full hover:bg-primary/10 text-text-main transition-colors">
              <ShoppingBag />
              <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-2 ring-background-light"></span>
            </Link>
            <Link href="/account" className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-primary/10 text-text-main transition-colors">
              <User />
            </Link>
            <button className="lg:hidden flex items-center justify-center size-10 rounded-full hover:bg-primary/10 text-text-main transition-colors">
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
