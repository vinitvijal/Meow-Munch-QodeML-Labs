"use client"

import React, { useState, useRef, useEffect } from "react"
import { ArrowRight, Heart } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CustomHome({
    categories = [],
    collections,
    region,
    newArrivalsProducts = [],
    popularProducts = [],
    blogPosts: serverBlogPosts = []
}: any) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const testimonialsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (testimonialsRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = testimonialsRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    testimonialsRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    testimonialsRef.current.scrollBy({ left: 300, behavior: "smooth" });
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Using dummy slides to match the slider behavior from before, but styled according to new mockup
    const slides = [
        {
            title: "Stylish essentials for every cat",
            subtitle: "Thoughtfully designed accessories for comfort, play and every little meow.",
            image: "/images/hero_1.png", // placeholder
        },
        {
            title: "Play. Pounce. Repeat.",
            subtitle: "Engaging toys and accessories to spark every adventure.",
            image: "/images/hero_2.png", // placeholder
        },
        {
            title: "Stylish beds & furniture for happy cats",
            subtitle: "Beautifully crafted pieces that blend comfort, function and modern style.",
            image: "/images/hero_3.png", // placeholder
        },
        {
            title: "Travel Together",
            subtitle: "Stylish and safe travel solutions for cats on the go.",
            image: "/images/hero_4.png", // placeholder
        },
        {
            title: "Groomed to Perfection",
            subtitle: "Premium grooming essentials for healthy, happy cats.",
            image: "/images/hero_5.png", // placeholder
        },
    ]

    const categoryIcons: Record<string, string> = {
        "grooming": "/images/shopbycategory/grooming.png",
        "cat-toys": "/images/shopbycategory/cat-toys.png",
        "clothing-&-wear": "/images/shopbycategory/clothing-and-wear.png",
        "cats-bed-&-furniture": "/images/shopbycategory/cats-beds.png"
    }

    const formatPrice = (product: any) => {
        return product?.formattedPrice || "£14.99";
    };

    const renderProductCard = (product: any, i: number) => {
        const title = product?.title || "Product Title";
        const image = product?.thumbnail || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop";
        const handle = product?.handle || "#";

        return (
            <LocalizedClientLink
                key={i}
                href={`/products/${handle}`}
                className="group flex flex-col bg-white rounded-2xl border border-accent/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="relative aspect-square overflow-hidden bg-[#FAF8F3] p-6 flex items-center justify-center">
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-background-light transition-colors border border-accent/10">
                        <Heart className="w-4 h-4 text-accent" />
                    </button>
                    <img
                        alt={title}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        src={image}
                    />
                </div>
                <div className="flex justify-between items-end p-5">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-display font-black text-accent text-sm sm:text-base leading-tight group-hover:text-primary transition-colors">{title}</h3>
                        <div className="font-bold text-accent text-sm sm:text-base">{formatPrice(product)}</div>
                    </div>
                </div>
            </LocalizedClientLink>
        )
    };

    const testimonials = [
        {
            rating: 5,
            text: "The quality is seriously impressive! My cat is picky with toys, but she has not stopped playing with the fish toy since it arrived.",
            author: "Ashley R.",
            image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=200&auto=format&fit=crop"
        },
        {
            rating: 5,
            text: "Super cute products and fast shipping. The ceramic bowl is sturdy, easy to clean, and looks amazing in my kitchen.",
            author: "Michael T.",
            image: "https://images.unsplash.com/photo-1529778458726-36f1c4e7fb2d?q=80&w=200&auto=format&fit=crop"
        },
        {
            rating: 5,
            text: "I’ve ordered from a lot of pet stores, but this is by far my favorite. Great quality, adorable designs, and fair prices.",
            author: "Jessica L.",
            image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=200&auto=format&fit=crop"
        },
        {
            rating: 5,
            text: "The sweater fits my kitten perfectly and feels really soft. You can tell these products are made with care",
            author: "Brandon C.",
            image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200&auto=format&fit=crop"
        },
        {
            rating: 5,
            text: "My cat loves the scratching post and I love how it actually matches my apartment decor. Will definitely order again!",
            author: "Lauren M.",
            image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=200&auto=format&fit=crop"
        }
    ];

    const blogPosts = serverBlogPosts.length > 0 ? serverBlogPosts : [
        {
            title: "How to Choose the Right Collar for Your Cat",
            date: "May 10, 2024",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
            slug: "#"
        },
        {
            title: "5 Fun Toys to Keep Your Cat Active Indoors",
            date: "May 5, 2024",
            image: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=600&auto=format&fit=crop",
            slug: "#"
        },
        {
            title: "Creating the Purr-fect Cozy Space",
            date: "April 28, 2024",
            image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=600&auto=format&fit=crop",
            slug: "#"
        }
    ];

    const instagramImages = [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=400&auto=format&fit=crop"
    ];

    return (
        <div className="flex-1 w-full bg-[#FAF8F3] font-sans">
            {/* Hero Section */}
            <section className="relative w-full h-[70vh] min-h-[600px] lg:mt-10 overflow-hidden ">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="absolute inset-0 overflow-hidden  bg-[#eadeca] border-black md:rounded-3xl flex flex-col lg:flex-row h-full w-full max-w-[1600px] mx-auto">
                            <div className="w-full lg:w-1/2 pt-32 lg:pt-0 relative z-20 flex flex-col justify-center pl-8 sm:pl-16 lg:pl-32 pr-8">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-accent mb-6 leading-[1.1] tracking-tight text-balance">
                                    {slide.title}
                                </h1>
                                <p className="text-lg lg:text-xl text-accent/80 mb-10 max-w-sm font-medium">
                                    {slide.subtitle}
                                </p>
                                <div>
                                    <LocalizedClientLink
                                        href="/store"
                                        className="inline-flex items-center justify-center rounded-2xl bg-accent text-white px-12 py-5 text-sm font-black transition-all hover:bg-primary"
                                    >
                                        Shop Now
                                    </LocalizedClientLink>
                                </div>
                            </div>
                            <div className="w-full lg:w-2/3 h-full absolute lg:relative top-0 right-0 z-10">
                                {/* Gradient to fade the image into the background color smoothly */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#eadeca] via-[#EFEAE2]/5 to-transparent z-10 hidden lg:block" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#eadeca] via-[#EFEAE2]/5 to-transparent z-10 lg:hidden" />
                                <img src={slide.image} alt="Cat Hero" className="w-full h-full object-cover object-center lg:object-right mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Controls */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-30 text-accent hover:bg-background-light transition-colors"
                >
                    &larr;
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-30 text-accent hover:bg-background-light transition-colors"
                >
                    &rarr;
                </button>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'bg-accent scale-110' : 'bg-accent/20'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Shop by Category */}
            <section className="py-20 bg-background-light">
                <div className="content-container">
                    <h2 className="text-3xl font-display font-black text-center text-accent mb-12">Shop by Category</h2>
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
                        {[
                            { name: "Grooming", handle: "grooming" },
                            { name: "Cat Toys", handle: "cat-toys" },
                            { name: "Clothing & Wear", handle: "clothing-&-wear" },
                            { name: "Cats Beds & Furniture", handle: "cats-bed-&-furniture" }
                        ].map((cat) => (
                            <LocalizedClientLink key={cat.handle} href={`/categories/${cat.handle}`} className="flex flex-col items-center gap-4 group">
                                <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-secondary/50 p-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-transparent group-hover:border-primary/20">
                                    <img src={categoryIcons[cat.handle]} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <span className="font-bold text-accent font-display">{cat.name}</span>
                            </LocalizedClientLink>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="py-16 bg-background-light">
                <div className="content-container">
                    <div className="flex justify-between items-end mb-8 border-b border-accent/10 pb-4">
                        <h2 className="text-3xl font-display font-black text-accent">New Arrivals</h2>
                        <LocalizedClientLink href="/collections/new-arrivals" className="text-sm font-bold text-accent hover:text-primary flex items-center gap-2">
                            View all &rarr;
                        </LocalizedClientLink>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {newArrivalsProducts.length > 0 ? newArrivalsProducts.slice(0, 4).map(renderProductCard) : [1, 2, 3, 4].map((_, i) => renderProductCard(null, i))}
                    </div>
                </div>
            </section>

            {/* What Cat Parents Say */}
            <section className="py-16 bg-[#FAF8F3]">
                <div className="content-container overflow-hidden">
                    <h2 className="text-3xl font-display font-black text-center text-accent mb-10">What Cat Parents Say</h2>

                    {/* Auto-scrolling Slider Container */}
                    <div ref={testimonialsRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
                        {testimonials.map((t, i) => (
                            <div key={i} className="flex-none w-[85vw] md:w-[calc(33.333%-1rem)] snap-start bg-[#F5EADF] p-8 rounded-2xl flex items-start gap-4 shadow-sm border border-accent/5">
                                <img src={t.image} alt={t.author} className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-sm" />
                                <div>
                                    <div className="flex text-accent mb-3">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-accent/90 text-sm font-medium mb-4 leading-relaxed">"{t.text}"</p>
                                    <span className="font-bold text-accent text-sm">– {t.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .hide-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}} />
                </div>
            </section>

            {/* Most Popular Products */}
            <section className="py-16 bg-background-light">
                <div className="content-container">
                    <div className="flex justify-between items-end mb-8 border-b border-accent/10 pb-4">
                        <h2 className="text-3xl font-display font-black text-accent">Most Popular Products</h2>
                        <LocalizedClientLink href="/collections/popular" className="text-sm font-bold text-accent hover:text-primary flex items-center gap-2">
                            View all &rarr;
                        </LocalizedClientLink>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularProducts.length > 0 ? popularProducts.slice(0, 4).map(renderProductCard) : [1, 2, 3, 4].map((_, i) => renderProductCard(null, i))}
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className="py-16 bg-background-light">
                <div className="content-container">
                    <div className="bg-[#F5EADF] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 aspect-video md:aspect-auto h-full">
                            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop" alt="Cat with tag" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 p-10 lg:p-16 relative">
                            <span className="text-xs font-bold text-accent/60 uppercase tracking-widest mb-4 block">ABOUT US</span>
                            <h2 className="text-3xl lg:text-4xl font-display font-black text-accent mb-6">Made for cats. Loved by cat parents.</h2>
                            <p className="text-accent/80 font-medium mb-8 leading-relaxed">
                                A brand built on the belief that cats are family, Meow Crunch was created to bring better standards to everyday pet care. With a focus on quality, reliability, and thoughtful design, it offers products that are simple, effective, and made to truly support your cat’s comfort and well-being.                            </p>
                            <LocalizedClientLink href="/about" className="inline-block bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors">
                                Learn Our Story
                            </LocalizedClientLink>
                            <Heart className="absolute bottom-8 right-8 w-24 h-24 text-primary/10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest from our blog */}
            <section className="py-16 bg-background-light">
                <div className="content-container">
                    <div className="flex justify-between items-end mb-8 border-b border-accent/10 pb-4">
                        <h2 className="text-3xl font-display font-black text-accent">Latest from our blog</h2>
                        <LocalizedClientLink href="/blog" className="text-sm font-bold text-accent hover:text-primary flex items-center gap-2">
                            View all &rarr;
                        </LocalizedClientLink>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {blogPosts.map((post, i) => (
                            <LocalizedClientLink key={i} href={post.slug === "#" ? "#" : `/blog/${post.slug}`} className="group flex flex-col">
                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-background-light transition-colors">
                                        <Heart className="w-4 h-4 text-accent" />
                                    </button>
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="font-display font-black text-accent text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                <span className="text-xs font-bold text-accent/60">{post.date}</span>
                            </LocalizedClientLink>
                        ))}
                    </div>
                </div>
            </section>

            {/* Follow us on instagram */}
            <section className="py-16 bg-background-light border-b border-accent/10">
                <div className="content-container">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-3xl font-display font-black text-accent">Follow us on<br />instagram</h2>
                        <a href="#" className="inline-block border border-accent/20 px-6 py-2 rounded-full text-sm font-bold text-accent hover:bg-accent hover:text-white transition-colors">
                            Follow @meowcrunch
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {instagramImages.map((img, i) => (
                            <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                                <img src={img} alt="Instagram" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 bg-background-light">
                <div className="content-container max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-display font-black text-accent text-xl mb-1">Join our MeowCrunch community!</h3>
                                <p className="text-sm font-medium text-accent/80">Sign up for meow-some deals, new arrivals & cat care tips.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-auto">
                            <form className="flex w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="bg-white border-none rounded-l-xl px-6 py-4 outline-none w-full md:w-64 text-sm shadow-sm"
                                />
                                <button type="submit" className="bg-accent text-white px-8 py-4 rounded-r-xl font-bold text-sm shadow-sm hover:bg-primary transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
