"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, PlaySolid, StarSolid, Plus, Heart, Sparkles } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const slides = [
    {
        title: "Artisanal Comfort, Pure Joy.",
        subtitle: "Handcrafted beds and organic wellness treats for the modern feline.",
        image: "/images/hero_cat_bed_themed.png",
        badge: "New Collection",
        accent: "Pure Joy."
    },
    {
        title: "The Handcrafted Feline Pantry.",
        subtitle: "Elevate your cat's play with thoughtfully designed artisanal toys.",
        image: "/images/hero_cat_toy_themed.png",
        badge: "Limited Edition",
        accent: "Modern Pantry."
    },
    {
        title: "Elegance in Every Detail.",
        subtitle: "Science-backed nutrition and accessories that make them purr.",
        image: "/images/hero_cat_collar_themed.png",
        badge: "Community Favorite",
        accent: "Every Detail."
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
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    const categoryIcons: Record<string, string> = {
        "food": "https://images.unsplash.com/photo-1589924691106-073b13f15dc7?q=80&w=800&auto=format&fit=crop",
        "toys": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800&auto=format&fit=crop",
        "grooming": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
        "litter": "https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=800&auto=format&fit=crop"
    }

    return (
        <div className="flex-1 w-full bg-background-light font-sans">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] lg:h-[850px] overflow-hidden flex items-center bg-background-light">
                {/* Background Image with Mask */}
                <div className="absolute inset-0 z-0">
                    {slides.map((slide, i) => (
                        <div 
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div 
                                className="absolute inset-0 bg-cover bg-center lg:bg-right"
                                style={{ 
                                    backgroundImage: `url(${slide.image})`,
                                    maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to left, black 50%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to left, black 50%, transparent 100%)'
                                }}
                            />
                        </div>
                    ))}
                    {/* Horizontal/Vertical Fade Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/60 lg:via-background-light/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent lg:hidden z-10"></div>
                </div>

                <div className="content-container relative z-20 w-full">
                    <div className="max-w-2xl lg:ml-0">
                        <div className="overflow-hidden mb-4 lg:mb-6">
                            <span className="inline-block px-4 py-1.5 lg:px-5 lg:py-2 bg-primary/10 text-primary rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-[0.4em] animate-in slide-in-from-bottom-full duration-700">
                                {slides[currentSlide].badge}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black leading-[1] lg:leading-[0.9] text-accent mb-6 lg:mb-8 font-display tracking-tight">
                            {slides[currentSlide].title.includes(',') ? slides[currentSlide].title.split(',')[0] : slides[currentSlide].title} <br />
                            <span className="text-primary italic font-medium">{slides[currentSlide].accent}</span>
                        </h1>
                        
                        <p className="text-base lg:text-xl text-accent/70 leading-relaxed mb-8 lg:mb-12 max-w-lg font-medium">
                            {slides[currentSlide].subtitle}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
                            <LocalizedClientLink
                                href="/store"
                                className="flex items-center justify-center rounded-2xl bg-accent hover:bg-primary text-white px-10 py-5 lg:px-12 lg:py-6 text-xs lg:text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                Shop Collection
                            </LocalizedClientLink>
                            <LocalizedClientLink
                                href="/contact"
                                className="flex items-center justify-center rounded-2xl bg-white border border-neutral-border text-accent px-10 py-5 lg:px-12 lg:py-6 text-xs lg:text-sm font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-300 hover:bg-background-light"
                            >
                                Our Philosophy
                            </LocalizedClientLink>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 lg:bottom-12 left-0 w-full z-30">
                    <div className="content-container flex gap-2 lg:gap-3">
                        {slides.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1 lg:h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-10 lg:w-16 bg-primary' : 'w-3 lg:w-4 bg-primary/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Category */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="content-container">
                    <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
                        <h2 className="text-3xl lg:text-5xl font-black text-accent tracking-tight font-display mb-4">Shop by Category</h2>
                        <div className="h-1.5 w-16 lg:w-24 bg-primary rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                        {(categories.length > 0 ? categories : ["food", "toys", "grooming", "litter"]).slice(0, 4).map((cat: any, i: number) => {
                            const name = typeof cat === 'string' ? cat : cat.name;
                            const handle = typeof cat === 'string' ? cat : cat.handle;
                            const isHighlighted = i === 2; // Mimicking the mockup's highlight

                            return (
                                <LocalizedClientLink
                                    key={handle}
                                    className={`group flex flex-col items-center gap-6 lg:gap-8 p-6 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] transition-all duration-500 ${isHighlighted ? 'bg-accent text-white shadow-2xl scale-105' : 'bg-secondary/40 text-accent hover:bg-secondary/60'}`}
                                    href={`/category/${handle}`}
                                >
                                    <div className="size-20 lg:size-32 rounded-2xl lg:rounded-3xl bg-white/50 flex items-center justify-center overflow-hidden border border-white group-hover:scale-110 transition-all duration-500">
                                        <img
                                            alt={name}
                                            className="w-full h-full object-cover"
                                            src={categoryIcons[handle] || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"}
                                        />
                                    </div>
                                    <span className="font-black text-lg lg:text-2xl uppercase tracking-widest font-display text-center">
                                        {name}
                                    </span>
                                </LocalizedClientLink>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 lg:py-32 bg-background-light">
                <div className="content-container">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-16 lg:mb-20 border-b border-primary/10 pb-10 gap-6">
                        <h2 className="text-3xl lg:text-5xl font-black text-accent tracking-tight font-display italic">Featured Products</h2>
                        <LocalizedClientLink
                            className="text-primary font-black uppercase tracking-widest text-xs lg:text-sm hover:text-accent transition-all flex items-center gap-3"
                            href="/store"
                        >
                            View All <ArrowRight />
                        </LocalizedClientLink>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {(bestSellerProducts.length > 0 ? bestSellerProducts : [1, 2, 3]).slice(0, 3).map((product: any, i: number) => {
                            const isPlaceholder = typeof product === 'number';
                            const title = isPlaceholder ? (i === 0 ? "Cozy Cat Bed" : i === 1 ? "Cat Scratching Post" : "Pet Carrier") : product.title;
                            const image = isPlaceholder ? (i === 0 ? "https://images.unsplash.com/photo-1548247416-ec66f4900b2e" : i === 1 ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" : "https://images.unsplash.com/photo-1511044568932-338cba0ad803") : product.thumbnail;
                            const handle = isPlaceholder ? "#" : product.handle;

                            return (
                                <LocalizedClientLink
                                    key={i}
                                    href={`/products/${handle}`}
                                    className="group flex flex-col bg-white rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-secondary"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-secondary/20 p-6 lg:p-8 flex items-center justify-center">
                                        <img
                                            alt={title}
                                            className="w-full h-full object-contain transition-transform duration-[1.5s] group-hover:scale-110"
                                            src={image}
                                        />
                                    </div>

                                    <div className="p-8 lg:p-10 flex flex-col items-center text-center gap-4">
                                        <h3 className="text-xl lg:text-2xl font-black text-accent font-display">{title}</h3>
                                        <p className="text-accent/50 text-xs lg:text-sm font-medium line-clamp-2">
                                            Handcrafted excellence designed for ultimate feline comfort and longevity.
                                        </p>
                                        <div className="mt-4 w-full py-3 lg:py-4 bg-accent group-hover:bg-primary text-white rounded-xl font-black uppercase tracking-[0.2em] transition-all text-[10px] lg:text-sm shadow-lg">
                                            View Details
                                        </div>
                                    </div>
                                </LocalizedClientLink>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="py-20 lg:py-32 bg-accent text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                <div className="content-container relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                        <div className="relative">
                            <img
                                alt="Community"
                                className="rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl border-4 border-white/10"
                                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop"
                            />
                            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-primary p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] shadow-2xl rotate-3 scale-75 lg:scale-100">
                                <Sparkles width={32} height={32} className="lg:w-12 lg:h-12" />
                            </div>
                        </div>
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 lg:mb-8 block underline decoration-primary/30 underline-offset-8">Our Philosophy</span>
                            <h2 className="text-4xl lg:text-6xl font-black mb-8 lg:mb-10 leading-[1] lg:leading-[0.9] font-display">Crafting <br /> <span className="italic font-medium text-secondary">Pure Joy.</span></h2>
                            <p className="text-base lg:text-xl text-white/70 font-medium leading-relaxed mb-10 lg:mb-16 max-w-lg">
                                "At Meow Munch, we believe every whisker counts. Our mission was born in a kitchen, perfected by scientists, and approved by the world's most demanding critics."
                            </p>
                            <button className="bg-white text-accent px-8 py-4 lg:px-12 lg:py-6 rounded-2xl font-black uppercase tracking-widest text-xs lg:text-base flex items-center gap-4 group hover:bg-primary hover:text-white transition-all shadow-2xl hover:gap-6">
                                Join The Pride <ArrowRight width={20} height={20} className="lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
