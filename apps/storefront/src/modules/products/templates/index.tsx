'use client'

import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductTabs from "@modules/products/components/product-tabs"
import Modal from "@modules/common/components/modal"
import Image from "next/image"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  productActions: React.ReactNode
  relatedProducts: React.ReactNode
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  productActions,
  relatedProducts,
}) => {
  const [mainImage, setMainImage] = React.useState<string | undefined>(images?.[0]?.url || product.thumbnail || "")
  const [isZoomOpen, setIsZoomOpen] = React.useState(false)

  if (!product || !product.id) {
    return notFound()
  }

  return (
    <main className="bg-background-light min-h-screen pt-10 font-sans">

      {/* Zoom Modal */}
      <Modal isOpen={isZoomOpen} close={() => setIsZoomOpen(false)} size="large" search={true}>
        <Modal.Body>
          <div className="relative w-full max-h-screen flex items-center justify-center">
            <div className="bg-white p-2 rounded-[3.5rem] shadow-2xl overflow-hidden max-w-[90vw] max-h-[90vh] border border-neutral-border">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-contain rounded-[3rem]"
              />
            </div>
            <button
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close zoom view"
              className="fixed top-8 right-8 size-16 rounded-full bg-white flex items-center justify-center text-accent transition-all shadow-2xl hover:bg-primary hover:text-white group z-[100]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Breadcrumbs */}
      <nav className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 mb-6">
        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-primary/40">
          <LocalizedClientLink href="/" className="hover:text-primary transition-colors">Home</LocalizedClientLink>
          <span className="opacity-30">/</span>
          <LocalizedClientLink href="/store" className="hover:text-primary transition-colors">Pantry</LocalizedClientLink>
          <span className="opacity-30">/</span>
          <span className="text-accent font-black tracking-widest">{product.title}</span>
        </div>
      </nav>

      {/* Product Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20 items-start">

          {/* Image Gallery - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="aspect-square w-full rounded-[3rem] overflow-hidden bg-white relative group flex items-center justify-center border border-neutral-border shadow-soft transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10">
              {mainImage ? (
                <img
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={mainImage}
                  width={800}
                  height={800}
                  fetchPriority="high"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-primary/20 gap-4">
                  <span className="material-symbols-outlined text-5xl">image</span>
                  <span className="font-black text-[10px] uppercase tracking-[0.2em]">Image Unavailable</span>
                </div>
              )}

              {product.collection && (
                <div className="absolute top-6 left-6 bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-accent shadow-sm">
                  {product.collection.title}
                </div>
              )}

              <button
                onClick={() => setIsZoomOpen(true)}
                aria-label="Open zoom view"
                className="absolute bottom-6 right-6 size-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all duration-500 transform hover:scale-110 group border border-white/50"
              >
                <span className="material-symbols-outlined text-2xl">zoom_in</span>
              </button>
            </div>

            {images && images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {images.slice(0, 5).map((image, idx) => (
                  <button
                    key={image.id || idx}
                    onClick={() => setMainImage(image.url)}
                    aria-label={`View preview ${idx + 1}`}
                    className={`aspect-square rounded-[1.5rem] overflow-hidden bg-white transition-all border-2 ${mainImage === image.url ? 'border-primary shadow-md scale-95' : 'border-neutral-border hover:border-primary/50'}`}
                  >
                    <img src={image.url} alt={`Preview ${idx + 1}`} width={150} height={150} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details - 7 cols */}
          <div className="lg:col-span-7 mt-10 lg:mt-0">
            <div className="flex flex-col h-full">
              <div className="pb-8 border-b border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-[9px] font-black text-primary/40 tracking-[0.2em] uppercase">Verified Excellence • 124 Reviews</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-accent mb-6 leading-[1.1] tracking-tight font-display italic text-balance">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-white text-[9px] font-black uppercase tracking-[0.2em]">
                    Artisanal Selection
                  </span>
                  <span className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">{product.variants?.[0]?.sku || 'MM-PANTRY-001'}</span>
                </div>

                <p className="text-primary/70 font-medium text-base leading-relaxed max-w-2xl text-pretty">
                  {product.description || "A curated masterpiece for your cat's daily routine, combining artisanal quality with modern feline science."}
                </p>
              </div>

              <div className="py-12">
                {productActions}
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary border border-secondary shadow-sm">
                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent block mb-1">House Delivery</span>
                    <span className="text-[10px] text-primary/40 font-black uppercase tracking-tighter italic">2-4 Business Days</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary border border-secondary shadow-sm">
                    <span className="material-symbols-outlined text-2xl">verified</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent block mb-1">Ethical Sourcing</span>
                    <span className="text-[10px] text-primary/40 font-black uppercase tracking-tighter italic">100% Quality Assurance</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto bg-white/50 backdrop-blur-sm p-10 rounded-[3.5rem] border border-neutral-border shadow-soft">
                <ProductTabs product={product} region={region} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Showcase Section */}
      <section className="bg-accent py-40 relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-32 lg:items-center">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 block underline decoration-primary/30 underline-offset-8">Our Feline Manifesto</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-8 leading-[1.1] font-display italic text-balance">Crafted for <br /> <span className="text-secondary not-italic tracking-normal">Instincts.</span></h2>
              <p className="text-base lg:text-lg text-white/60 font-medium leading-relaxed mb-12 max-w-lg text-pretty">Designed after studying thousands of feline interaction patterns. We don&apos;t just create objects; we craft moments of pure feline joy.</p>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display italic">100%</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">House Grade Integrity</p>
                </div>
                <div className="space-y-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display">Elite</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Signature Profile</p>
                </div>
              </div>
            </div>

            <div className="mt-24 lg:mt-0 grid sm:grid-cols-2 gap-10">
              <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/10 hover:border-primary/30 transition-all duration-700 group shadow-2xl">
                <div className="size-20 rounded-3xl bg-primary mb-10 flex items-center justify-center text-white shadow-2xl shadow-primary/20 group-hover:rotate-6 transition-all duration-500">
                  <span className="material-symbols-outlined text-4xl">texture</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 font-display italic">Tactile Edge</h3>
                <p className="text-white/50 font-medium text-base leading-relaxed">Unique textures that stimulate feline senses and promote natural, joyful engagement.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/10 hover:border-primary/30 transition-all duration-700 group shadow-2xl sm:translate-y-20">
                <div className="size-20 rounded-3xl bg-white mb-10 flex items-center justify-center text-accent shadow-2xl group-hover:-rotate-6 transition-all duration-500">
                  <span className="material-symbols-outlined text-4xl">health_and_safety</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 font-display italic">Vetted Quality</h3>
                <p className="text-white/50 font-medium text-base leading-relaxed">Every creation is verified for safety and feline compliance by our global curators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="py-24 bg-background-light">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between mb-16 border-b border-primary/10 pb-8">
            <h2 className="text-3xl lg:text-4xl font-black text-accent font-display italic tracking-tight text-balance">You May Also Like</h2>
            <LocalizedClientLink href="/store" className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-accent transition-all flex items-center gap-3">
              View Pantry <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </LocalizedClientLink>
          </div>
          {relatedProducts}
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section className="bg-white py-40 border-t border-neutral-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-32">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Community Voices</span>
                <h2 className="text-4xl lg:text-5xl font-black text-accent tracking-tighter mb-10 font-display italic leading-none underline decoration-primary/20 decoration-8 underline-offset-8">The <br /> Purrs.</h2>
                <div className="flex items-end gap-6 mb-10">
                  <span className="text-6xl lg:text-7xl font-black text-accent tracking-tighter leading-none font-display italic">4.8</span>
                  <div className="mb-4 flex flex-col gap-3">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-primary/30 uppercase tracking-[0.2em] whitespace-nowrap italic">Global Satisfaction Score</span>
                  </div>
                </div>

                <button className="w-fit px-12 bg-accent text-white h-20 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-primary transition-all duration-500 transform hover:-translate-y-2">
                  Add Your Voice
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-12">
              {/* Review Cards */}
              {[1, 2].map((i) => (
                <div key={i} className="p-12 rounded-[4.5rem] bg-secondary/20 border border-secondary transition-all duration-700 hover:shadow-2xl hover:bg-white relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                    <span className="material-symbols-outlined text-[8rem] lg:text-[15rem] text-primary">format_quote</span>
                  </div>
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="size-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-accent font-black shadow-primary/5">
                        {i === 1 ? 'JD' : 'SM'}
                      </div>
                      <div>
                        <h4 className="font-black text-accent text-xl uppercase font-display tracking-tight italic">{i === 1 ? 'Jane Doe' : 'Sam Meow'}</h4>
                        <div className="flex text-primary text-xs mt-1">
                          {[...Array(5)].map((_, idx) => (
                            <span key={idx} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-primary/30 uppercase tracking-[0.25em] italic">{i === 1 ? 'Last Week' : 'Last Month'}</span>
                  </div>
                  <h5 className="text-3xl font-black text-accent mb-6 tracking-tight font-display italic underline decoration-primary/10 decoration-4 underline-offset-4">{i === 1 ? 'Absolutely Gourmet!' : 'The only food they eat'}</h5>
                  <p className="text-primary/60 font-medium text-xl leading-relaxed max-w-2xl relative z-10">
                    {i === 1
                      ? "I was hesitant about the price at first, but seeing the joy in my cat's eyes every morning makes it more than worth it. The packaging itself is a piece of art!"
                      : "We have tried every premium brand on the market and Meow Munch is the only one that gets them running to the kitchen. Top tier quality."
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductTemplate
