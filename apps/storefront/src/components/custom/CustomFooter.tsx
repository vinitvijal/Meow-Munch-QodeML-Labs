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
    <footer className="bg-background-light border-t border-neutral-border pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Link className="flex items-center gap-3 group" href="/">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined text-3xl font-bold">pets</span>
                </div>
                <span className="text-2xl font-black text-accent tracking-tighter uppercase font-display">
                  Meow<span className="text-primary font-medium tracking-normal lowercase italic">Munch</span>
                </span>
              </Link>
            </div>
            <p className="text-primary/70 text-base leading-relaxed max-w-sm mb-10 font-medium">
              Curating the finest essentials for the modern feline. From artisanal nutrition to
              thoughtfully designed play, we celebrate the bond between cat and human.
            </p>
            <div className="flex gap-5">
              {['Instagram', 'Pinterest', 'Twitter'].map((social) => (
                <a key={social} className="size-12 rounded-2xl border border-neutral-border flex items-center justify-center text-primary/40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-sm" href="#">
                  <span className="text-[10px] font-black uppercase tracking-tighter">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-accent font-black mb-8 text-xs uppercase tracking-[0.2em]">Collections</h3>
            <ul className="flex flex-col gap-5 text-sm text-primary/60 font-medium">
              {collections.map((c) => (
                <li key={c.id}>
                  <Link className="hover:text-primary transition-colors" href={`/collections/${c.handle}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-accent font-black mb-8 text-xs uppercase tracking-[0.2em]">Boutique</h3>
            <ul className="flex flex-col gap-5 text-sm text-primary/60 font-medium">
              {topCategories.map((c) => (
                <li key={c.id}>
                  <Link className="hover:text-primary transition-colors" href={`/categories/${c.handle}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-accent font-black mb-8 text-xs uppercase tracking-[0.2em]">House</h3>
            <ul className="flex flex-col gap-5 text-sm text-primary/60 font-medium">
              <li><Link className="hover:text-primary transition-colors" href="#">Our Story</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Journal</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Ethics</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-border pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">© 2026 Meow Munch House. Crafted with love.</p>
          <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <img alt="Visa" className="h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaJob-kkNhtkT9oVs54BYgE-lGV_yhZ5GMsY3btwXfuYAieVo6FxkQobU3vdMbd8p5G3w_99P0oRzA1prvKsu55xVfa6Ua9j0E2OfCVQiFZma4GmRxfwB0OSjfhI1Iv93Kko8Bt-_KPy7hblVykk2kiPjk9HdnaliYZ-ors9wDN3bVzu0evyoCHB5FsSFbvYitgmf6PlAN3qYewrreu7JhsLfIs4wW8qA_8ZQ2DxnR_3CA_8zUHClAQyz5tfONK3jA3Ywj64z9aUA" />
            <img alt="Mastercard" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqbdGDr7xKrDXeySE800GbIqrYEUSDAo-Bdwb3Zptb9YreRtFA-KrOkDVDiv0BvBdYp_5WxpHuZhGNzVg-B6Z6QD0RjWumYj7tbi696nDztYpqqHMb5CLAWYNnE9O8cuxqpHNdvtagzPUqPwqzMJCSXT1L2vxZ67Tscjz3U12BeLm_UOabTwJKVhY1Pxt0zIepeTfmo4AjUY1EIv48YmSBN3mnUOmW3DHm6cntJA6_78Jl2_QvjU9qUbfsjO5nbuln2TNxUxKJHkk" />
            <img alt="Paypal" className="h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoTvrNVUb1UvMebn701INgWWHbUghNn9duzfQ5ScXczKFw-e3kDaohsZqIbOtr2IOBuX-6cynyv-ZoEi_nrQTAh5OJ20W8M22xkW0he1tag7yzKNa0c3SehBVbp7Awk1U1QZZFqAv6lKTh2IB3yL_yFrSzg5-EDbeCRqhu8S-bqyOG9JwXFDJLstzCm50fG1mns1ZqVE0LILvigZbnQaTLh9uDvtO6BwDVZRbD5AwqJ-hpKvLK62Vyu09SSrINkWC5TOsxaqKuP-s" />
          </div>
        </div>
      </div>
    </footer>
  )
}
