import React from "react"
import Link from "next/link"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"

export default async function CustomFooter() {
  const [collectionsResponse, categories] = await Promise.all([
    listCollections({ offset: 0, limit: 5 }),
    listCategories()
  ]);

  const collections = collectionsResponse?.collections?.slice(0, 5) || [];
  const topCategories = categories ? categories.slice(0, 5) : [];

  return (
    <footer className="bg-white dark:bg-neutral-surface-dark border-t border-neutral-border dark:border-neutral-border-dark pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 text-white flex items-center justify-center bg-primary rounded-xl shadow-sm">
                <span className="font-bold">P</span>
              </div>
              <h2 className="text-text-main dark:text-white text-2xl font-extrabold tracking-tight">Purrfect Finds</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
              Dedicated to providing the best for your feline companions. From premium nutrition to
              engaging toys, we have everything your cat needs to thrive.
            </p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full border border-neutral-border dark:border-neutral-border-dark flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href="#">W</a>
              <a className="size-10 rounded-full border border-neutral-border dark:border-neutral-border-dark flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href="#">C</a>
              <a className="size-10 rounded-full border border-neutral-border dark:border-neutral-border-dark flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href="#">E</a>
            </div>
          </div>
          <div>
            <h3 className="text-text-main dark:text-white font-bold mb-6 text-lg">Collections</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
              {collections.map((c) => (
                  <li key={c.id}>
                    <Link className="hover:text-primary transition-colors" href={`/collections/${c.handle}`}>{c.title}</Link>
                  </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-text-main dark:text-white font-bold mb-6 text-lg">Categories</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
              {topCategories.map((c) => (
                  <li key={c.id}>
                    <Link className="hover:text-primary transition-colors" href={`/categories/${c.handle}`}>{c.name}</Link>
                  </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-text-main dark:text-white font-bold mb-6 text-lg">Company</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-border dark:border-neutral-border-dark pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-400 text-center md:text-left">© 2023 Purrfect Finds. All rights reserved.</p>
          <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <img alt="Visa" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaJob-kkNhtkT9oVs54BYgE-lGV_yhZ5GMsY3btwXfuYAieVo6FxkQobU3vdMbd8p5G3w_99P0oRzA1prvKsu55xVfa6Ua9j0E2OfCVQiFZma4GmRxfwB0OSjfhI1Iv93Kko8Bt-_KPy7hblVykk2kiPjk9HdnaliYZ-ors9wDN3bVzu0evyoCHB5FsSFbvYitgmf6PlAN3qYewrreu7JhsLfIs4wW8qA_8ZQ2DxnR_3CA_8zUHClAQyz5tfONK3jA3Ywj64z9aUA" />
            <img alt="Mastercard" className="h-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqbdGDr7xKrDXeySE800GbIqrYEUSDAo-Bdwb3Zptb9YreRtFA-KrOkDVDiv0BvBdYp_5WxpHuZhGNzVg-B6Z6QD0RjWumYj7tbi696nDztYpqqHMb5CLAWYNnE9O8cuxqpHNdvtagzPUqPwqzMJCSXT1L2vxZ67Tscjz3U12BeLm_UOabTwJKVhY1Pxt0zIepeTfmo4AjUY1EIv48YmSBN3mnUOmW3DHm6cntJA6_78Jl2_QvjU9qUbfsjO5nbuln2TNxUxKJHkk" />
            <img alt="Paypal" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoTvrNVUb1UvMebn701INgWWHbUghNn9duzfQ5ScXczKFw-e3kDaohsZqIbOtr2IOBuX-6cynyv-ZoEi_nrQTAh5OJ20W8M22xkW0he1tag7yzKNa0c3SehBVbp7Awk1U1QZZFqAv6lKTh2IB3yL_yFrSzg5-EDbeCRqhu8S-bqyOG9JwXFDJLstzCm50fG1mns1ZqVE0LILvigZbnQaTLh9uDvtO6BwDVZRbD5AwqJ-hpKvLK62Vyu09SSrINkWC5TOsxaqKuP-s" />
          </div>
        </div>
      </div>
    </footer>
  )
}
