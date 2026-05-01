import React from "react"
import Link from "next/link"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"

export default async function CustomFooter() {
  const [collectionsResponse, categories] = await Promise.all([
    listCollections({ offset: "0", limit: "5" }),
    listCategories()
  ]);

  const collections = collectionsResponse?.collections?.slice(0, 5) || [];
  const topCategories = categories ? categories.slice(0, 5) : [];

  return (
    <footer className="bg-[#EAE3DA] border-t border-accent/10 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Link className="flex flex-col items-start gap-1 group" href="/">
                <div className="flex items-center justify-center text-accent group-hover:rotate-6 transition-transform">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 18.5C14.7614 18.5 17 16.2614 17 13.5C17 10.7386 14.7614 8.5 12 8.5C9.23858 8.5 7 10.7386 7 13.5C7 16.2614 9.23858 18.5 12 18.5Z" stroke="#4A3728" strokeWidth="2"/>
                        <path d="M7.5 10C6 8 5 6 5 4C7 4 9 5 10 6.5" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.5 10C18 8 19 6 19 4C17 4 15 5 14 6.5" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="10" cy="14" r="1" fill="#4A3728"/>
                        <circle cx="14" cy="14" r="1" fill="#4A3728"/>
                        <path d="M11 16C11.5 16.5 12.5 16.5 13 16" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>
                <span className="text-2xl font-black text-accent tracking-tighter font-display">
                  MeowCrunch
                </span>
              </Link>
            </div>
            <p className="text-accent/80 text-xs leading-relaxed max-w-xs mb-8 font-medium">
              Stylish accessories for the happy, healthy cat.
            </p>
            <div className="flex gap-3">
              {['Ig', 'Fb', 'Tw', 'Pt'].map((social) => (
                <a key={social} className="size-8 rounded-full bg-accent flex items-center justify-center text-white hover:bg-primary transition-all shadow-sm" href="#">
                  <span className="text-[10px] font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-accent font-black mb-6 text-sm">Shop</h3>
            <ul className="flex flex-col gap-3 text-sm text-accent/80 font-medium">
              <li><Link className="hover:text-primary transition-colors" href="/store">All Products</Link></li>
              {topCategories.map((c) => (
                <li key={c.id}>
                  <Link className="hover:text-primary transition-colors" href={`/categories/${c.handle}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-accent font-black mb-6 text-sm">Customer Care</h3>
            <ul className="flex flex-col gap-3 text-sm text-accent/80 font-medium">
              <li><Link className="hover:text-primary transition-colors" href="#">Contact Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Shipping & Delivery</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Returns & Exchanges</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">FAQ's</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Track Your Order</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-accent font-black mb-6 text-sm">About Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-accent/80 font-medium">
              <li><Link className="hover:text-primary transition-colors" href="#">Our Story</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Sustainability</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-accent font-black mb-6 text-sm">My Account</h3>
            <ul className="flex flex-col gap-3 text-sm text-accent/80 font-medium">
              <li><Link className="hover:text-primary transition-colors" href="/account">Sign In</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/account/register">Register</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Wishlist</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/account/orders">Order History</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-accent/60">Privacy Policy | Terms & Conditions</p>
          <div className="flex items-center gap-2 border border-accent/20 rounded-md px-3 py-1 bg-white">
            <span className="text-xs font-bold text-accent">🇬🇧 United Kingdom</span>
            <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>
    </footer>
  )
}
