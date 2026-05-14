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
  const topCategories = categories ? categories.filter(c => !c.parent_category_id).slice(0, 5) : [];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Link href="/" className="flex flex-col gap-4 group">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="MeowCrunch" className="h-12 w-auto invert brightness-0" />
                <span className="text-3xl font-black tracking-tighter font-display uppercase">
                  MeowCrunch
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
                Elevating the lives of happy, healthy cats through premium accessories and curated nutrition. Crafted with love, delivered with care.
              </p>
            </Link>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-primary">Join the Community</span>
              <div className="flex gap-4">
                {[
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, label: "Facebook" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>, label: "Twitter" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="size-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Shop</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-bold">
              <li><Link className="hover:text-primary transition-colors" href="/store">All Products</Link></li>
              {topCategories.map((c) => (
                <li key={c.id}>
                  <Link className="hover:text-primary transition-colors" href={`/categories/${c.handle}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Support</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-bold">
              <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/shipping">Shipping Policy</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/refund">Returns & Exchanges</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Track Your Order</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Company</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-bold">
              <li><Link className="hover:text-primary transition-colors" href="#">Our Story</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Sustainability</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/blog">Our Blog</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/terms">Terms of Service</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Account</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-bold">
              <li><Link className="hover:text-primary transition-colors" href="/account">Sign In</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/account/register">Register</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Order History</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span>© 2026 MeowCrunch Ltd.</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
              <Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gray-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Crafted with Purr-fection</span>
            <div className="h-px w-8 bg-gray-800" />
          </div>
        </div>
      </div>
    </footer>
  )
}

