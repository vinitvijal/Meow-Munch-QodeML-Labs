import React from "react"
import { ArrowRight, PlaySolid, StarSolid, Plus, Heart, Sparkles, Star } from "@medusajs/icons"
import Link from "next/link"

export default function CustomHome({ collections, region, lifeStageCollections = [], bestSellerProducts = [] }: any) {
    // Mapping for Life Stage images from design.html
    const lifeStageImages: Record<string, string> = {
        "Kitten": "https://lh3.googleusercontent.com/aida-public/AB6AXuBc2wIRnEZrUl7NvqMcN7HNQmXeBj3Cjw6e1d6XH_d3ughsox7Pms9wLBO0pkUSOl7RT5cQLfHAhgQC9sapZ6crKBUtVxbpHl3Jm2UJJFYCHcpYdufTuoodxykQeTrKfow48uFZeDaOlpBCcvh64UN4axH9QGApRJMHrRvujV1TffPo5ijQ-sECy4BcD_gxnLOE-ehB8wgZiGsBBXhFAxk3djhsUOWm3sekeZQf8ZcNWZqKNV3N_n4sY2jRduwuKRAxYt9wc_mcLQo",
        "Adult": "https://lh3.googleusercontent.com/aida-public/AB6AXuBzDb23gAY4kjqSdodjFrN-TPUvd86hZ-MekhyW9o3Akf_rtEaifjIxuuy3KxNsqfDhVEQKT5Wc8O2HRc39MheFOMZPguXP-dMbyjtTnUQ2OCatM4amQHj8vBRpscqL4tHmzOCfHy8iqsm3sT8H5sO-KaaAgo1pR3QTHaHva1zKL3O6twtv6e-ZFpfIvehvp9E4jgpVcynA-bikMl-EPmQ1RzXK6IvhwTnpuoPuV7KT8BNqV_kZzvFS1nUNDVTxFKYM4N_jpN9y8fk",
        "Senior": "https://lh3.googleusercontent.com/aida-public/AB6AXuCY20LjjwhDHhN2frvlXw_qxFO55BlQYvGJhY1dNmNHRGjtaAliyu9gFrj62zmoDL2faRzAjy_VhmqXvWBu28p0P27nPssLUSMB2CSEqL92yGq_nWZ5PRV30rAJw6YaODRp9-O-iVDp5UDI5OT6-nXZw9mqCEiHc_4NXLbxc3hGp_8VoHG3-KyYBv90R-Pw2m9l-fq_aFPqVR4x6TJBQ0RodC_RQYUd2yHgqA2RQZK1MQON3ETsjWrngZKtnRCoSWFlTBjtRLZRKy0"
    }

    const lifeStageColors: Record<string, string> = {
        "Kitten": "bg-secondary/50 dark:bg-neutral-800",
        "Adult": "bg-primary/20 dark:bg-primary/10",
        "Senior": "bg-accent/20 dark:bg-accent/10"
    }

    return (
        <div className="flex-1 w-full">
            <section className="relative w-full h-[600px] lg:h-[750px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img alt="Cinematic cat video background" className="w-full h-full object-cover brightness-[0.85]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz17RZYyvgFwLmYERe_ds0m8vPGzMTIiMNd6RKeYuYZ57xfSXhh1TvTPMMbZbINa9eySs5nLmr729GLENOpFnZtBy2t0abJ7Aerfhb6anDU0U0hpK-4lkdrqXgtfA6SkTjrgOzT6Bq6kYYyYqlsXt30txyIoV0D9Fz_64hFKsPaqhaBVmzTs5h5AXMDv1L9UgTlK4JHVqJUn4_ia1k8GtvzN11vmB3DxjA3QkdwBKOIfZMGtDljWNzicr4J07cr5_TLqhzsWpwriY" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-0"></div>
                <div
                    className="relative z-10 w-full max-w-[1440px] px-4 sm:px-10 flex flex-col items-start justify-center h-full pt-20">
                    <div className="glass-panel p-8 md:p-12 rounded-[2rem] max-w-2xl shadow-glass animate-fade-in-up dark:bg-[#1c1c1e]/65 bg-white/75 backdrop-blur-[12px] border border-white/30 dark:border-white/5">
                        <span
                            className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-primary tracking-wide uppercase mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span> New Collection
                        </span>
                        <h1
                            className="text-slate-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                            Elevate Their <br /> Everyday Life.
                        </h1>
                        <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed mb-8 max-w-lg font-medium">
                            Thoughtfully designed essentials for the modern cat. From organic treats to architectural
                            furniture.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/store"
                                className="flex items-center justify-center rounded-2xl bg-primary hover:bg-primary/90 text-white px-8 py-4 text-base font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
                                Shop The Collection
                            </Link>
                            <button
                                className="flex items-center justify-center rounded-2xl bg-white hover:bg-gray-50 text-slate-800 px-8 py-4 text-base font-bold shadow-md hover:-translate-y-1 transition-all duration-300">
                                <PlaySolid className="mr-2 text-xl" /> Watch Film
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10 -mt-16 relative z-20">
                <div
                    className="bg-white dark:bg-neutral-surface-dark rounded-[2.5rem] shadow-soft p-8 md:p-10 border border-neutral-border dark:border-neutral-border-dark">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-text-main dark:text-white">Shop by Category</h2>
                        <Link className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
                            href="/store">View All <ArrowRight className="text-sm" /></Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                        <Link className="group flex flex-col items-center gap-4 text-center" href="/store?category=food">
                            <div
                                className="size-28 rounded-full bg-secondary/30 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-primary transition-all duration-300 relative">
                                <img alt="Food"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABe__KgLVm8O6gRMKSwq0pdWxbLNCN2M1-WX5ATgY6FUsISOoL2UIKVJpQfVqBIa1WljHP0DAB9Vu_tjWqtkGKy8HpdLSPt4-zdavF8xfNO52LFx4krzDF63ufFCabqJquoSpFhoRqJl17Qnwyn2mGJjhVBYdu_b0_HduZznQQtWuDuPA-qW5vldoHh0Yk25zsGzvo2_Eq4f9ZTAY77_h4h6UU8KWQCHWTPSrSyijCkSQl_cPqgClXinhBmNHrS96S-Gt2St2djFI" />
                            </div>
                            <span
                                className="font-bold text-text-main dark:text-slate-200 group-hover:text-primary transition-colors">Food</span>
                        </Link>
                        <Link className="group flex flex-col items-center gap-4 text-center" href="/store?category=toys">
                            <div
                                className="size-28 rounded-full bg-secondary/30 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-primary transition-all duration-300 relative">
                                <img alt="Toys"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfKU_xtmrTGigUwTlQi-dwd9QN1Ruvdahvi5fpka0r94mV8ztaNBqwI9YBCDFZXnUEB4wWMbInk8ha1tCDcE8hXxhTDmS2ETt6j2CDu31ICVNrLaprsdXnuECuLCBbdBC-t7CzR_wIbM2lMsX16NOnetzTTzBZcDqIzs896tw-LOJHfpdz57h_4oOkvN9TsWYVacwzObfAYZmMuGotjD1RGM-GChAhRXjo2ZCIXASIFKDD2Kzscfxwk6DItcjO3vXhfWgnHoMF9aY" />
                            </div>
                            <span
                                className="font-bold text-text-main dark:text-slate-200 group-hover:text-primary transition-colors">Toys</span>
                        </Link>
                        <Link className="group flex flex-col items-center gap-4 text-center" href="/store?category=grooming">
                            <div
                                className="size-28 rounded-full bg-secondary/30 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-primary transition-all duration-300 relative">
                                <img alt="Grooming"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuXh_0SqywLeJPI1AzELapaVHiI6TsErjOJBbZ_jhXS801QscnnbPt_FR6_11A1yESFGfzrZD22Du6K841iGqlrrLZanW9lmpxr_uyzXTZcox61FrWofaHJktnowpKlUPTuBKHOCp36lOwz6IPQ473_tgsMTLLQ231yXWfS9yeYbmEQJ2gtQQRk_-5y9J1CEzfjJD5iCWvXd6p17_csFLpb_f4AurYU5ogDT6WiF8LuqKY3OnFvDeROKijTiA7AlIRanZPJjgtfbw" />
                            </div>
                            <span
                                className="font-bold text-text-main dark:text-slate-200 group-hover:text-primary transition-colors">Grooming</span>
                        </Link>
                        <Link className="group flex flex-col items-center gap-4 text-center" href="/store?category=litter">
                            <div
                                className="size-28 rounded-full bg-secondary/30 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-primary transition-all duration-300 relative">
                                <img alt="Litter"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEFT3JddQxaHkV7tAk3jVGbPNSj2JAli9W0xpmUxgsBbZPC7VowsrDiqkugiX4CouaasJ3BIsZZlRlW7Mn6Q8oSP9JtTvBbws1NKvoHkQNZDFbmedzfS0AsSXRDM8q62xiRce9V2ydTnO1oMvV4asDRrZ0aSvmJoo9_AxAcXGcdfgMxXmMKjwiwoUtOH-Bm-LRondwlvaaJFiZ1NnJauLfg8P42-zdW9JqjC5_OaiG3APVO5mpgDy8dWMLXXYp7liq_xwKHXRAgwU" />
                            </div>
                            <span
                                className="font-bold text-text-main dark:text-slate-200 group-hover:text-primary transition-colors">Litter</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-10 py-16 space-y-24">
                {/* Shop by Life Stage */}
                {lifeStageCollections.length > 0 && (
                    <section>
                        <div className="text-center mb-12">
                            <span className="text-primary font-bold uppercase tracking-wider text-xs mb-2 block">Curated Collections</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white">Shop by Life Stage</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {lifeStageCollections.map((collection: any) => (
                                <Link key={collection.id} className="group relative overflow-hidden rounded-[2.5rem] h-72 cursor-pointer shadow-soft hover:shadow-xl transition-all duration-500" href={`/collections/${collection.handle}`}>
                                    <div className={`absolute inset-0 ${lifeStageColors[collection.title] || 'bg-secondary/30'} transition-colors`}></div>
                                    <img alt={collection.title}
                                        className="absolute right-[-15%] bottom-[-15%] w-3/4 opacity-40 group-hover:opacity-70 transition-all duration-700 rotate-6 group-hover:rotate-0 group-hover:scale-110"
                                        src={lifeStageImages[collection.title] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc2wIRnEZrUl7NvqMcN7HNQmXeBj3Cjw6e1d6XH_d3ughsox7Pms9wLBO0pkUSOl7RT5cQLfHAhgQC9sapZ6crKBUtVxbpHl3Jm2UJJFYCHcpYdufTuoodxykQeTrKfow48uFZeDaOlpBCcvh64UN4axH9QGApRJMHrRvujV1TffPo5ijQ-sECy4BcD_gxnLOE-ehB8wgZiGsBBXhFAxk3djhsUOWm3sekeZQf8ZcNWZqKNV3N_n4sY2jRduwuKRAxYt9wc_mcLQo'} />
                                    <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black text-text-main dark:text-white">{collection.title}</h3>
                                            <p className="text-sm font-semibold text-text-main/70 dark:text-slate-300 mt-2">
                                                {collection.title === 'Kitten' ? '0 - 12 Months' : collection.title === 'Adult' ? '1 - 7 Years' : '7+ Years'}
                                            </p>
                                        </div>
                                        <span
                                            className="w-12 h-12 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-3">
                                            <ArrowRight />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Best Sellers */}
                {bestSellerProducts.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white">Best Sellers</h2>
                                <p className="text-text-main/60 dark:text-slate-400 mt-2 font-medium">Community favorites loved by cats everywhere.</p>
                            </div>
                            <Link className="hidden md:flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-all hover:gap-3"
                                href="/store">
                                View All Products <ArrowRight />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {bestSellerProducts.map((product: any) => (
                                <div key={product.id} className="group relative flex flex-col">
                                    <div
                                        className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-secondary/30 dark:bg-neutral-800 mb-6 shadow-soft group-hover:shadow-lg transition-all duration-500">
                                        <span
                                            className="absolute top-5 left-5 z-20 bg-white/90 dark:bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">Top Rated</span>
                                        <button
                                            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/60 hover:bg-white text-slate-500 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 backdrop-blur-sm">
                                            <Heart className="size-5" />
                                        </button>
                                        <Link href={`/products/${product.handle}`}>
                                            <img alt={product.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                                src={product.thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhYmTdiGfrCvDcofxOpSfwbrArmK8IRHqSbAZ-AuThDXdSSxgdUZ_n-g8sJ6-nxIXXd55tm8C4J1PPeG9iDWmzhdMpyFGZyJJ0Q083MiMNS1Z_sFjRROdaspJJzHoQVTnPzM-_jcQCwbwRTMBevIykcICS12WFtPyoC-6dIvssyNq1JLuEkk2F3i91MH0ZcGxnGRDv-MCbE3UbznGTXj-weKOLBxILtUmY3mAJlFCtM4_ysyU5dXhcY3E_KvsPuCwqwRI5DuaAOC4'} />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col gap-2 px-1">
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex text-accent">
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                                <StarSolid className="size-4" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 mt-0.5">(1.2k)</span>
                                        </div>
                                        <Link href={`/products/${product.handle}`}>
                                            <h3 className="text-xl font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.title}</h3>
                                        </Link>
                                        <p className="text-sm font-semibold text-slate-500">{product.subtitle || 'Premium Category'}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-2xl font-black text-text-main dark:text-white">
                                                {product.variants?.[0]?.calculated_price?.calculated_amount ?
                                                    new Intl.NumberFormat(undefined, {
                                                        style: 'currency',
                                                        currency: product.variants[0].calculated_price.currency_code
                                                    }).format(product.variants[0].calculated_price.calculated_amount)
                                                    : '$24.99'
                                                }
                                            </span>
                                            <button
                                                className="size-10 rounded-full bg-text-main dark:bg-primary text-white flex items-center justify-center hover:bg-primary dark:hover:bg-primary/80 transition-all duration-300 shadow-md hover:shadow-primary/30 hover:-translate-y-1">
                                                <Plus className="size-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link className="flex md:hidden items-center justify-center gap-2 font-bold bg-primary text-white p-4 rounded-2xl mt-8 shadow-lg shadow-primary/20"
                            href="/store">
                            View All Products <ArrowRight />
                        </Link>
                    </section>
                )}

                <section className="bg-secondary/20 dark:bg-neutral-surface-dark rounded-[3.5rem] overflow-hidden shadow-soft border border-neutral-border/30 dark:border-neutral-border-dark/30">
                    <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-96 lg:h-auto min-h-[500px]">
                            <img alt="Pet of the month owner" className="absolute inset-0 w-full h-full object-cover brightness-95"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWRJCanj0JoaI7JVm9XEYTW5MNGsBmrRJRS-1OSPWJohYiFpD2lMDse8hLfNuyAGlnhAFhF6kWcO2_79FUSC3dRecEXc9LU92c5Qzpo_hiKyO6GWl1i8jB_g4XBsULlhPg8NBc-8vGRwlAyR9OplftaGTcENxRPOGNYZnmLsCvk5YUTVG9jXx6syKhIrt248lW1K-DzgEwHS1SOfwFOz9z8OCXaHaafburJPOgk7W13nA3g7xCDKODY9RqX50VtruZtQQdDq9_pXE" />
                            <div
                                className="absolute bottom-8 left-8 bg-white/90 dark:bg-black/70 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs border border-white/20">
                                <div className="size-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 shadow-inner">
                                    <img alt="Product" className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhYmTdiGfrCvDcofxOpSfwbrArmK8IRHqSbAZ-AuThDXdSSxgdUZ_n-g8sJ6-nxIXXd55tm8C4J1PPeG9iDWmzhdMpyFGZyJJ0Q083MiMNS1Z_sFjRROdaspJJzHoQVTnPzM-_jcQCwbwRTMBevIykcICS12WFtPyoC-6dIvssyNq1JLuEkk2F3i91MH0ZcGxnGRDv-MCbE3UbznGTXj-weKOLBxILtUmY3mAJlFCtM4_ysyU5dXhcY3E_KvsPuCwqwRI5DuaAOC4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">Favorite Pick</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Premium Salmon Feast</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 lg:p-20 flex flex-col justify-center items-start">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-8 border border-accent/10">
                                <Sparkles className="size-4" />
                                Pet of the Month
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-text-main dark:text-white mb-8 tracking-tight">Meet Luna
                                &amp; Sarah</h2>
                            <div className="prose prose-slate dark:prose-invert">
                                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic mb-8 font-medium">
                                    "Luna used to be such a picky eater until we discovered Meow Munch. The Premium Salmon Feast is literally the only thing she'll purr for now. It's changed our mornings completely!"
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">
                                    Sarah has been a community member since 2021. Luna is a 4-year-old rescue who loves sunny spots and her salmon treats.
                                </p>
                            </div>
                            <button className="text-primary font-black hover:text-primary/80 flex items-center gap-3 group text-lg transition-all">
                                Read Full Story <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
