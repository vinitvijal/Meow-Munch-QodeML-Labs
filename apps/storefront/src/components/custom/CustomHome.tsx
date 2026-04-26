import React from "react"
import { ArrowRight, PlaySolid, StarSolid, Plus, Heart, Sparkles } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CustomHome({ 
  categories = [], 
  collections, 
  region, 
  lifeStageCollections = [], 
  bestSellerProducts = [] 
}: any) {
    // Mapping for Life Stage images
    const lifeStageImages: Record<string, string> = {
        "Kitten": "https://lh3.googleusercontent.com/aida-public/AB6AXuBc2wIRnEZrUl7NvqMcN7HNQmXeBj3Cjw6e1d6XH_d3ughsox7Pms9wLBO0pkUSOl7RT5cQLfHAhgQC9sapZ6crKBUtVxbpHl3Jm2UJJFYCHcpYdufTuoodxykQeTrKfow48uFZeDaOlpBCcvh64UN4axH9QGApRJMHrRvujV1TffPo5ijQ-sECy4BcD_gxnLOE-ehB8wgZiGsBBXhFAxk3djhsUOWm3sekeZQf8ZcNWZqKNV3N_n4sY2jRduwuKRAxYt9wc_mcLQo",
        "Adult": "https://lh3.googleusercontent.com/aida-public/AB6AXuBzDb23gAY4kjqSdodjFrN-TPUvd86hZ-MekhyW9o3Akf_rtEaifjIxuuy3KxNsqfDhVEQKT5Wc8O2HRc39MheFOMZPguXP-dMbyjtTnUQ2OCatM4amQHj8vBRpscqL4tHmzOCfHy8iqsm3sT8H5sO-KaaAgo1pR3QTHaHva1zKL3O6twtv6e-ZFpfIvehvp9E4jgpVcynA-bikMl-EPmQ1RzXK6IvhwTnpuoPuV7KT8BNqV_kZzvFS1nUNDVTxFKYM4N_jpN9y8fk",
        "Senior": "https://lh3.googleusercontent.com/aida-public/AB6AXuCY20LjjwhDHhN2frvlXw_qxFO55BlQYvGJhY1dNmNHRGjtaAliyu9gFrj62zmoDL2faRzAjy_VhmqXvWBu28p0P27nPssLUSMB2CSEqL92yGq_nWZ5PRV30rAJw6YaODRp9-O-iVDp5UDI5OT6-nXZw9mqCEiHc_4NXLbxc3hGp_8VoHG3-KyYBv90R-Pw2m9l-fq_aFPqVR4x6TJBQ0RodC_RQYUd2yHgqA2RQZK1MQON3ETsjWrngZKtnRCoSWFlTBjtRLZRKy0"
    }

    const lifeStageColors: Record<string, string> = {
        "Kitten": "bg-amber-100/50 dark:bg-amber-900/20",
        "Adult": "bg-orange-100/50 dark:bg-orange-900/20",
        "Senior": "bg-rose-100/50 dark:bg-rose-900/20"
    }

    // Default icons/images for categories if none provided
    const categoryIcons: Record<string, string> = {
       "food": "https://lh3.googleusercontent.com/aida-public/AB6AXuABe__KgLVm8O6gRMKSwq0pdWxbLNCN2M1-WX5ATgY6FUsISOoL2UIKVJpQfVqBIa1WljHP0DAB9Vu_tjWqtkGKy8HpdLSPt4-zdavF8xfNO52LFx4krzDF63ufFCabqJquoSpFhoRqJl17Qnwyn2mGJjhVBYdu_b0_HduZznQQtWuDuPA-qW5vldoHh0Yk25zsGzvo2_Eq4f9ZTAY77_h4h6UU8KWQCHWTPSrSyijCkSQl_cPqgClXinhBmNHrS96S-Gt2St2djFI",
       "toys": "https://lh3.googleusercontent.com/aida-public/AB6AXuAfKU_xtmrTGigUwTlQi-dwd9QN1Ruvdahvi5fpka0r94mV8ztaNBqwI9YBCDFZXnUEB4wWMbInk8ha1tCDcE8hXxhTDmS2ETt6j2CDu31ICVNrLaprsdXnuECuLCBbdBC-t7CzR_wIbM2lMsX16NOnetzTTzBZcDqIzs896tw-LOJHfpdz57h_4oOkvN9TsWYVacwzObfAYZmMuGotjD1RGM-GChAhRXjo2ZCIXASIFKDD2Kzscfxwk6DItcjO3vXhfWgnHoMF9aY",
       "grooming": "https://lh3.googleusercontent.com/aida-public/AB6AXuAuXh_0SqywLeJPI1AzELapaVHiI6TsErjOJBbZ_jhXS801QscnnbPt_FR6_11A1yESFGfzrZD22Du6K841iGqlrrLZanW9lmpxr_uyzXTZcox61FrWofaHJktnowpKlUPTuBKHOCp36lOwz6IPQ473_tgsMTLLQ231yXWfS9yeYbmEQJ2gtQQRk_-5y9J1CEzfjJD5iCWvXd6p17_csFLpb_f4AurYU5ogDT6WiF8LuqKY3OnFvDeROKijTiA7AlIRanZPJjgtfbw",
       "litter": "https://lh3.googleusercontent.com/aida-public/AB6AXuDEFT3JddQxaHkV7tAk3jVGbPNSj2JAli9W0xpmUxgsBbZPC7VowsrDiqkugiX4CouaasJ3BIsZZlRlW7Mn6Q8oSP9JtTvBbws1NKvoHkQNZDFbmedzfS0AsSXRDM8q62xiRce9V2ydTnO1oMvV4asDRrZ0aSvmJoo9_AxAcXGcdfgMxXmMKjwiwoUtOH-Bm-LRondwlvaaJFiZ1NnJauLfg8P42-zdW9JqjC5_OaiG3APVO5mpgDy8dWMLXXYp7liq_xwKHXRAgwU"
    }

    return (
        <div className="flex-1 w-full bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] lg:h-[800px] overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0">
                    <img 
                      alt="Hero cat" 
                      className="w-full h-full object-cover brightness-95 transform scale-105 animate-slow-zoom"
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10"></div>
                </div>
                
                <div className="relative z-20 content-container">
                    <div className="max-w-2xl animate-fade-in-up">
                        <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-xs font-black text-orange-600 tracking-widest uppercase mb-8 shadow-sm border border-orange-200">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span> 
                            Premium Feline Nutrition
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 mb-8">
                            Gourmet Bites,<br />
                            <span className="text-orange-500">Pure Joy.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg font-medium">
                            Elevate your cat&apos;s everyday with our curated selection of high-protein feasts and organic wellness treats.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <LocalizedClientLink 
                                href="/store"
                                className="flex items-center justify-center rounded-2xl bg-slate-900 hover:bg-orange-500 text-white px-10 py-5 text-lg font-bold shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                Shop All Meals
                            </LocalizedClientLink>
                            <button className="flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md hover:bg-white text-slate-800 px-10 py-5 text-lg font-bold shadow-xl border border-white/50 transition-all duration-300 hover:-translate-y-1">
                                <PlaySolid className="mr-3 text-xl text-orange-500" /> Our Story
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop by Category - Dynamic from Medusa Categories */}
            <div className="content-container -mt-20 relative z-30">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-10 lg:p-14 border border-gray-50">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex flex-col">
                           <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">The Pantry Categories</h2>
                           <div className="h-1.5 w-20 bg-orange-500 rounded-full mt-2"></div>
                        </div>
                        <LocalizedClientLink 
                            className="bg-orange-50 text-orange-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
                            href="/store"
                        >
                           Explore Full Store <ArrowRight size={16} />
                        </LocalizedClientLink>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.length > 0 ? (
                            categories.slice(0, 4).map((category: any) => (
                                <LocalizedClientLink 
                                    key={category.id}
                                    className="group flex flex-col items-center gap-6" 
                                    href={`/category/${category.handle}`}
                                >
                                    <div className="relative size-32 rounded-[2.5rem] bg-neutral-50 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-all duration-500 shadow-inner">
                                        <img 
                                            alt={category.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-110"
                                            src={categoryIcons[category.handle] || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"} 
                                        />
                                        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors"></div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-black text-slate-900 group-hover:text-orange-500 transition-colors text-lg uppercase tracking-wider italic">
                                            {category.name}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Premium Selection</span>
                                    </div>
                                </LocalizedClientLink>
                            ))
                        ) : (
                            // Fallback if no categories in backend
                            ["food", "toys", "grooming", "litter"].map((cat) => (
                                <LocalizedClientLink 
                                    key={cat}
                                    className="group flex flex-col items-center gap-6" 
                                    href={`/store?category=${cat}`}
                                >
                                    <div className="relative size-32 rounded-[2.5rem] bg-neutral-50 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-all duration-500">
                                        <img 
                                            alt={cat}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            src={categoryIcons[cat]} 
                                        />
                                    </div>
                                    <span className="font-black text-slate-900 group-hover:text-orange-500 transition-colors text-lg uppercase italic">
                                        {cat}
                                    </span>
                                </LocalizedClientLink>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="content-container py-24 space-y-32">
                {/* Shop by Life Stage - Collections from Medusa */}
                {lifeStageCollections.length > 0 && (
                    <section>
                        <div className="flex flex-col items-center text-center mb-16 px-4">
                            <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-[10px] mb-3">Tailored Experience</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Shop by Life Stage</h2>
                            <p className="text-gray-500 mt-4 max-w-md font-medium leading-relaxed">Specific nutrition for every milestone in your cat&apos;s journey.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {lifeStageCollections.map((collection: any) => (
                                <LocalizedClientLink 
                                    key={collection.id} 
                                    className="group relative overflow-hidden rounded-[3rem] h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700" 
                                    href={`/collections/${collection.handle}`}
                                >
                                    <div className={`absolute inset-0 ${lifeStageColors[collection.title] || 'bg-orange-50'} transition-colors`}></div>
                                    <img 
                                        alt={collection.title}
                                        className="absolute right-[-10%] bottom-[-5%] w-[85%] opacity-90 group-hover:scale-110 transition-all duration-1000 rotate-2 group-hover:rotate-0 drop-shadow-2xl"
                                        src={lifeStageImages[collection.title] || lifeStageImages["Adult"]} 
                                    />
                                    <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                                        <div className="max-w-[150px]">
                                            <h3 className="text-4xl font-black text-slate-900 leading-none italic">{collection.title}</h3>
                                            <div className="h-1 w-12 bg-orange-500 mt-4 opacity-50"></div>
                                            <p className="text-sm font-bold text-slate-700/60 mt-4 uppercase tracking-widest">
                                                {collection.title === 'Kitten' ? 'Curiosity' : collection.title === 'Adult' ? 'Adventure' : 'Comfort'}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Explore Collection</span>
                                            <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                                                <ArrowRight />
                                            </span>
                                        </div>
                                    </div>
                                </LocalizedClientLink>
                            ))}
                        </div>
                    </section>
                )}

                {/* Best Sellers - Products from Medusa */}
                {bestSellerProducts.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between mb-16 border-b border-gray-100 pb-8">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Meow<span className="text-orange-500 font-medium">Munch</span> Favorites</h2>
                                <p className="text-gray-400 mt-2 font-bold tracking-widest uppercase text-[10px]">The treats they purr for most</p>
                            </div>
                            <LocalizedClientLink 
                                className="hidden md:flex items-center gap-3 font-black text-slate-900 hover:text-orange-500 transition-all group"
                                href="/store"
                            >
                                View Full Pantry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </LocalizedClientLink>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {bestSellerProducts.map((product: any) => (
                                <div key={product.id} className="group flex flex-col relative">
                                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#F3F3F3] mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                                           <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">New In</span>
                                           <span className="bg-white/80 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Popular</span>
                                        </div>
                                        
                                        <LocalizedClientLink href={`/products/${product.handle}`} className="block h-full">
                                            <img 
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                                src={product.thumbnail || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"} 
                                            />
                                        </LocalizedClientLink>
                                        
                                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                           <LocalizedClientLink 
                                              href={`/products/${product.handle}`}
                                              className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-2xl hover:bg-orange-500 transition-all"
                                           >
                                              <Plus size={18} /> Quick View
                                           </LocalizedClientLink>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    
                                    <div className="flex flex-col items-center text-center gap-2 px-1">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="flex text-orange-400">
                                                <StarSolid className="size-3.5" />
                                                <StarSolid className="size-3.5" />
                                                <StarSolid className="size-3.5" />
                                                <StarSolid className="size-3.5" />
                                                <StarSolid className="size-3.5" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-300 mt-0.5 tracking-tighter">1.2K HAPPY CATS</span>
                                        </div>
                                        <LocalizedClientLink href={`/products/${product.handle}`}>
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-orange-500 transition-colors uppercase italic">{product.title}</h3>
                                        </LocalizedClientLink>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px]">{product.product_category?.name || 'Organic Feast'}</p>
                                        
                                        <div className="mt-4 pb-2">
                                            <span className="text-2xl font-black text-slate-900">
                                                {product.variants?.[0]?.calculated_price?.calculated_amount ? 
                                                    new Intl.NumberFormat(undefined, { 
                                                        style: 'currency', 
                                                        currency: product.variants[0].calculated_price.currency_code 
                                                    }).format(product.variants[0].calculated_price.calculated_amount)
                                                    : '$19.99'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Brand Story Widget */}
                <section className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative text-white">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/10 skew-x-12 translate-x-1/2"></div>
                    <div className="grid lg:grid-cols-2 lg:min-h-[600px]">
                        <div className="relative h-96 lg:h-auto overflow-hidden">
                            <img 
                                alt="Community" 
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-1000"
                                src="https://images.unsplash.com/photo-1574158622672-b6903518046d?q=80&w=2080&auto=format&fit=crop" 
                            />
                            <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
                               <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10">
                                  <div className="size-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl rotate-3">
                                     <Sparkles size={32} />
                                  </div>
                                  <div>
                                     <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-1">Weekly Winner</p>
                                     <p className="font-black text-xl italic uppercase">Gourmet of the week</p>
                                  </div>
                               </div>
                            </div>
                        </div>
                        <div className="p-12 lg:p-24 flex flex-col justify-center items-start">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                Meow Munch Community
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter leading-[0.9] italic">The Secret <br /> <span className="text-orange-500 tracking-normal not-italic">Ingredient.</span></h2>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed mb-12 max-w-md">
                                "Our mission is simple: To provide nutrition so good, it makes every morning a celebration. We don&apos;t just sell food; we sell happiness in a bowl."
                            </p>
                            <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black flex items-center gap-3 group hover:bg-orange-500 hover:text-white transition-all shadow-xl">
                                Join The Club <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
