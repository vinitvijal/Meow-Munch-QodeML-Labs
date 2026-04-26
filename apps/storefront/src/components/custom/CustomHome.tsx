"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, PlaySolid, StarSolid, Plus, Heart, Sparkles } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const slides = [
    {
        title: "Gourmet Bites, Pure Joy.",
        subtitle: "High-protein feasts and organic wellness treats for the modern feline.",
        image: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=1920&auto=format&fit=crop",
        badge: "New Collection",
        accent: "Pure Joy."
    },
    {
        title: "The Modern Feline Pantry.",
        subtitle: "Elevate your cat's everyday with thoughtfully designed essentials.",
        image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1920&auto=format&fit=crop",
        badge: "Limited Edition",
        accent: "Modern Pantry."
    },
    {
        title: "Wellness in Every Whiskers.",
        subtitle: "Science-backed nutrition that makes them purr with vitality.",
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1920&auto=format&fit=crop",
        badge: "Community Favorite",
        accent: "Every Whiskers."
    }
]

export default function CustomHome({
    categories = [],
    collections,
    region,
    lifeStageCollections = [],
    bestSellerProducts = []
}: any) {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

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

    const categoryIcons: Record<string, string> = {
        "food": "https://lh3.googleusercontent.com/aida-public/AB6AXuABe__KgLVm8O6gRMKSwq0pdWxbLNCN2M1-WX5ATgY6FUsISOoL2UIKVJpQfVqBIa1WljHP0DAB9Vu_tjWqtkGKy8HpdLSPt4-zdavF8xfNO52LFx4krzDF63ufFCabqJquoSpFhoRqJl17Qnwyn2mGJjhVBYdu_b0_HduZznQQtWuDuPA-qW5vldoHh0Yk25zsGzvo2_Eq4f9ZTAY77_h4h6UU8KWQCHWTPSrSyijCkSQl_cPqgClXinhBmNHrS96S-Gt2St2djFI",
        "toys": "https://lh3.googleusercontent.com/aida-public/AB6AXuAfKU_xtmrTGigUwTlQi-dwd9QN1Ruvdahvi5fpka0r94mV8ztaNBqwI9YBCDFZXnUEB4wWMbInk8ha1tCDcE8hXxhTDmS2ETt6j2CDu31ICVNrLaprsdXnuECuLCBbdBC-t7CzR_wIbM2lMsX16NOnetzTTzBZcDqIzs896tw-LOJHfpdz57h_4oOkvN9TsWYVacwzObfAYZmMuGotjD1RGM-GChAhRWjo2ZCIXASIFKDD2Kzscfxwk6DItcjO3vXhfWgnHoMF9aY",
        "grooming": "https://lh3.googleusercontent.com/aida-public/AB6AXuAuXh_0SqywLeJPI1AzELapaVHiI6TsErjOJBbZ_jhXS801QscnnbPt_FR6_11A1yESFGfzrZD22Du6K841iGqlrrLZanW9lmpxr_uyzXTZcox61FrWofaHJktnowpKlUPTuBKHOCp36lOwz6IPQ473_tgsMTLLQ231yXWfS9yeYbmEQJ2gtQQRk_-5y9J1CEzfjJD5iCWvXd6p17_csFLpb_f4AurYU5ogDT6WiF8LuqKY3OnFvDeROKijTiA7AlIRanZPJjgtfbw",
        "litter": "https://lh3.googleusercontent.com/aida-public/AB6AXuDEFT3JddQxaHkV7tAk3jVGbPNSj2JAli9W0xpmUxgsBbZPC7VowsrDiqkugiX4CouaasJ3BIsZZlRlW7Mn6Q8oSP9JtTvBbws1NKvoHkQNZDFbmedzfS0AsSXRDM8q62xiRce9V2ydTnO1oMvV4asDRrZ0aSvmJoo9_AxAcXGcdfgMxXmMKjwiwoUtOH-Bm-LRondwlvaaJFiZ1NnJauLfg8P42-zdW9JqjC5_OaiG3APVO5mpgDy8dWMLXXYp7liq_xwKHXRAgwU"
    }

    return (
        <div className="flex-1 w-full bg-[#FAFAFA] font-sans">
            {/* Hero Carousel Section */}
            <section className="relative w-full h-[650px] lg:h-[850px] overflow-hidden flex items-center">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                alt={slide.title}
                                className={`w-full h-full object-cover brightness-95 transform transition-transform duration-[10s] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                                src={slide.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10"></div>
                        </div>

                        <div className="relative z-20 content-container h-full flex items-center">
                            <div className={`max-w-2xl transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2.5 text-[11px] font-black text-orange-600 tracking-[0.2em] uppercase mb-8 shadow-sm border border-orange-200">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
                                    {slide.badge}
                                </div>
                                <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 mb-8 font-display">
                                    {slide.title.split(slide.accent)[0]}
                                    <br />
                                    <span className="text-orange-500">{slide.accent}</span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg font-medium">
                                    {slide.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <LocalizedClientLink
                                        href="/store"
                                        className="flex items-center justify-center rounded-2xl bg-slate-900 hover:bg-orange-600 text-white px-10 py-5 text-lg font-bold shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Explore Pantry
                                    </LocalizedClientLink>
                                    <button className="flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md hover:bg-white text-slate-800 px-10 py-5 text-lg font-bold shadow-xl border border-white/50 transition-all duration-300 hover:-translate-y-1">
                                        <PlaySolid className="mr-3 text-xl text-orange-500" /> Watch Film
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Controls */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-10 bg-orange-500' : 'w-4 bg-slate-300 hover:bg-slate-400'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Shop by Category - Dynamic from Medusa Categories */}
            <div className="content-container -mt-24 relative z-30">
                <div className="bg-white rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-12 lg:p-16 border border-gray-100">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex flex-col">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight italic font-display">Discover Categories</h2>
                            <div className="h-1.5 w-24 bg-orange-500 rounded-full mt-3"></div>
                        </div>
                        <LocalizedClientLink
                            className="bg-orange-50 text-orange-600 px-8 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
                            href="/store"
                        >
                            Full Pantry <ArrowRight width={18} height={18} />
                        </LocalizedClientLink>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                        {categories.length > 0 ? (
                            categories.slice(0, 4).map((category: any) => (
                                <LocalizedClientLink
                                    key={category.id}
                                    className="group flex flex-col items-center gap-6"
                                    href={`/category/${category.handle}`}
                                >
                                    <div className="relative size-36 rounded-[3rem] bg-neutral-50 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-all duration-500 shadow-inner">
                                        <img
                                            alt={category.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-105"
                                            src={categoryIcons[category.handle] || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"}
                                        />
                                        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors"></div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <span className="font-black text-slate-900 group-hover:text-orange-500 transition-colors text-xl uppercase tracking-widest italic font-display">
                                            {category.name}
                                        </span>
                                        <span className="text-[11px] font-black text-gray-300 tracking-[0.2em] uppercase">Selection</span>
                                    </div>
                                </LocalizedClientLink>
                            ))
                        ) : (
                            ["food", "toys", "grooming", "litter"].map((cat) => (
                                <LocalizedClientLink
                                    key={cat}
                                    className="group flex flex-col items-center gap-6"
                                    href={`/store?category=${cat}`}
                                >
                                    <div className="relative size-36 rounded-[3rem] bg-neutral-50 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-all duration-500">
                                        <img
                                            alt={cat}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            src={categoryIcons[cat]}
                                        />
                                    </div>
                                    <span className="font-black text-slate-900 group-hover:text-orange-500 transition-colors text-xl uppercase italic font-display">
                                        {cat}
                                    </span>
                                </LocalizedClientLink>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="content-container py-32 space-y-40">
                {/* Shop by Life Stage - Collections from Medusa */}
                {lifeStageCollections.length > 0 && (
                    <section>
                        <div className="flex flex-col items-center text-center mb-20 px-4">
                            <span className="text-orange-400 font-black uppercase tracking-[0.3em] text-[11px] mb-4">Milestone Nutrition</span>
                            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter font-display">Shop by Life Stage</h2>
                            <p className="text-gray-500 mt-6 max-w-lg font-medium text-lg leading-relaxed">Curated collections designed to support your feline friend through every stage of growth.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {lifeStageCollections.map((collection: any) => (
                                <LocalizedClientLink
                                    key={collection.id}
                                    className="group relative overflow-hidden rounded-[4rem] h-[450px] cursor-pointer shadow-2xl hover:shadow-orange-200/50 transition-all duration-700"
                                    href={`/collections/${collection.handle}`}
                                >
                                    <div className={`absolute inset-0 ${lifeStageColors[collection.title] || 'bg-orange-50'} transition-colors`}></div>
                                    <img
                                        alt={collection.title}
                                        className="absolute right-[-10%] bottom-[-5%] w-[90%] opacity-100 group-hover:scale-105 transition-all duration-1000 rotate-1 group-hover:rotate-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                                        src={lifeStageImages[collection.title] || lifeStageImages["Adult"]}
                                    />
                                    <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                                        <div className="max-w-[200px]">
                                            <h3 className="text-5xl font-black text-slate-900 leading-none italic font-display">{collection.title}</h3>
                                            <div className="h-2 w-16 bg-orange-500 mt-6 rounded-full opacity-60"></div>
                                            <p className="text-xs font-black text-slate-700/50 mt-6 uppercase tracking-[0.2em]">
                                                {collection.title === 'Kitten' ? 'Pure Curiosity' : collection.title === 'Adult' ? 'Bold Adventure' : 'Ultimate Comfort'}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Start Exploring</span>
                                            <span className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-700 transform group-hover:rotate-6">
                                                <ArrowRight width={24} height={24} />
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
                        <div className="flex items-end justify-between mb-20 border-b border-gray-100 pb-10">
                            <div>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic font-display">Meow<span className="text-orange-500 font-medium">Munch</span> Elite</h2>
                                <p className="text-gray-400 mt-3 font-black tracking-[0.25em] uppercase text-[11px]">The Gold Standard of Feline Flavor</p>
                            </div>
                            <LocalizedClientLink
                                className="hidden md:flex items-center gap-4 font-black text-slate-900 hover:text-orange-500 transition-all group text-lg"
                                href="/store"
                            >
                                Browse All <ArrowRight width={24} height={24} className="group-hover:translate-x-3 transition-transform" />
                            </LocalizedClientLink>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {bestSellerProducts.map((product: any) => (
                                <div key={product.id} className="group flex flex-col relative">
                                    <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden bg-[#F7F7F7] mb-10 shadow-sm group-hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 translate-y-0 group-hover:-translate-y-2">
                                        <div className="absolute top-8 left-8 z-20 flex flex-col gap-2.5">
                                            <span className="bg-orange-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Top Choice</span>
                                            <span className="bg-white/90 backdrop-blur-md text-slate-900 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">Popular</span>
                                        </div>

                                        <LocalizedClientLink href={`/products/${product.handle}`} className="block h-full">
                                            <img
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                                                src={product.thumbnail || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"}
                                            />
                                        </LocalizedClientLink>

                                        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                            <LocalizedClientLink
                                                href={`/products/${product.handle}`}
                                                className="w-full bg-slate-900 text-white h-16 rounded-[1.5rem] flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-2xl hover:bg-orange-600 transition-all"
                                            >
                                                <Plus width={20} height={20} /> Preview
                                            </LocalizedClientLink>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    </div>

                                    <div className="flex flex-col items-center text-center gap-3 px-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex text-orange-400">
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-300 mt-1 tracking-widest">1,420 REVIEWS</span>
                                        </div>
                                        <LocalizedClientLink href={`/products/${product.handle}`}>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-orange-500 transition-colors uppercase italic font-display">{product.title}</h3>
                                        </LocalizedClientLink>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">{product.product_category?.name || 'Exclusive Feast'}</p>

                                        <div className="mt-6 flex items-center gap-3">
                                            <span className="text-3xl font-black text-slate-900 tracking-tighter">
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

                {/* Community Section */}
                <section className="bg-slate-950 rounded-[5rem] overflow-hidden shadow-2xl relative text-white border border-white/5">
                    <div className="absolute top-0 right-0 w-2/5 h-full bg-orange-600/5 skew-x-12 translate-x-1/3 blur-3xl"></div>
                    <div className="grid lg:grid-cols-2 lg:min-h-[700px]">
                        <div className="relative h-[500px] lg:h-auto overflow-hidden">
                            <img
                                alt="Community"
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-[1.5s] hover:scale-105"
                                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
                                <div className="flex items-center gap-6 bg-white/5 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 shadow-2xl">
                                    <div className="size-20 rounded-[1.5rem] bg-orange-500 flex items-center justify-center text-white shadow-orange-500/50 shadow-2xl rotate-6 animate-pulse">
                                        <Sparkles width={40} height={40} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400 mb-2 underline decoration-2 underline-offset-4">Winner Circles</p>
                                        <p className="font-black text-3xl italic uppercase font-display tracking-tight leading-none">The Night Prowler</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-16 lg:p-28 flex flex-col justify-center items-start">
                            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-orange-500/10 text-orange-500 text-[11px] font-black uppercase tracking-[0.25em] mb-12 border border-orange-500/20">
                                <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_white]"></span>
                                Joined The Elite Pantry
                            </div>
                            <h2 className="text-6xl lg:text-8xl font-black mb-12 tracking-tighter leading-[0.85] italic font-display">Crafting <br /> <span className="text-orange-500 tracking-normal not-italic underline decoration-8 decoration-orange-500/30 underline-offset-[12px]">Prowess.</span></h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed mb-16 max-w-lg">
                                "At Meow Munch, we believe every whisker counts. Our mission was born in a kitchen, perfected by scientists, and approved by the world&apos;s most demanding critics."
                            </p>
                            <button className="bg-white text-slate-950 px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center gap-4 group hover:bg-orange-600 hover:text-white transition-all shadow-white/5 shadow-2xl hover:gap-6">
                                Join The Pride <ArrowRight width={24} height={24} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
