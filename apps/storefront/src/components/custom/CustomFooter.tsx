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
                  { link: "https://www.instagram.com/meowcrunch.official", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram" },
                  { link: "https://www.snapchat.com/add/meowcrunch.7?share_id=UIPFU3_-UYY&locale=en-IN", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.008 1.8c1.393 0 2.768.423 3.96 1.215.347.234.673.5.973.791.737.74 1.173 1.58 1.306 2.502.131.897-.008 1.776-.411 2.61a5.617 5.617 0 0 1-.689 1.054c-.18.218-.387.417-.611.597l-.025.021a1.002 1.002 0 0 0 .15.011 3.25 3.25 0 0 0 1.714-.543 3.275 3.275 0 0 0 1.207-1.42 1.332 1.332 0 0 1 1.205-.785 1.328 1.328 0 0 1 .902.348 1.322 1.322 0 0 1 .436.963c.01.207-.027.41-.11.603-.187.426-.475.795-.845 1.082-.368.283-.787.5-1.233.636-.59.18-1.199.308-1.815.378a9.418 9.418 0 0 0-.423.063c-.113.023-.217.06-.312.11-.112.062-.206.143-.277.24a.591.591 0 0 0-.094.341c0 .125.023.245.068.356.126.3.364.512.673.6l.044.01a14.75 14.75 0 0 0 2.607.382c.904.062 1.8.216 2.674.46a2.001 2.001 0 0 1 1.267.925 1.996 1.996 0 0 1 .15 1.503 1.992 1.992 0 0 1-1.042 1.155 12.03 12.03 0 0 1-3.693.878c-.282.028-.564.048-.848.058a5.138 5.138 0 0 1-.954 1.262 5.093 5.093 0 0 1-1.472.937 5.08 5.08 0 0 1-1.802.33 5.1 5.1 0 0 1-1.812-.33 5.088 5.088 0 0 1-1.474-.937 5.127 5.127 0 0 1-.952-1.262c-.283-.01-.565-.03-.847-.058a12.03 12.03 0 0 1-3.693-.878 1.992 1.992 0 0 1-1.042-1.155 1.996 1.996 0 0 1 .15-1.503 2.001 2.001 0 0 1 1.267-.925c.875-.244 1.77-.398 2.674-.46a14.75 14.75 0 0 0 2.607-.382l.044-.01c.31-.088.547-.3.673-.6a.589.589 0 0 0 .068-.356.59.59 0 0 0-.094-.341.597.597 0 0 0-.277-.24c-.095-.05-.199-.087-.312-.11a9.418 9.418 0 0 0-.423-.063c-.616-.07-1.225-.198-1.815-.378-.446-.136-.865-.353-1.233-.636a2.004 2.004 0 0 1-.845-1.082 1.998 1.998 0 0 1 .326-1.566 1.99 1.99 0 0 1 1.205-.785 3.275 3.275 0 0 0 1.207 1.42 3.25 3.25 0 0 0 1.714.543 1.002 1.002 0 0 0 .15-.011l-.025-.021c-.224-.18-.431-.379-.611-.597a5.617 5.617 0 0 1-.689-1.054c-.403-.834-.542-1.713-.411-2.61.133-.922.569-1.762 1.306-2.502.3-.291.626-.557.973-.791 1.192-.792 2.567-1.215 3.96-1.215z" /></svg>, label: "Snapchat" },
                  { link: "https://pin.it/1TZAcRHNV", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.163 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" /></svg>, label: "Pinterest" },
                  { link: "https://www.reddit.com/u/meowcrunch/s/g1AZt0LypA", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249c0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249c0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>, label: "Reddit" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
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

