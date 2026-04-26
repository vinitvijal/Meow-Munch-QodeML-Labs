'use client'

import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductTabs from "@modules/products/components/product-tabs"
import Modal from "@modules/common/components/modal"

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
    <main className="bg-white dark:bg-slate-950 min-h-screen pt-10">

      {/* Zoom Modal */}
      <Modal isOpen={isZoomOpen} close={() => setIsZoomOpen(false)} size="large" search={true}>
        <Modal.Body>
          <div className="relative w-full max-h-screen flex items-center justify-center">
            <div className="bg-white p-2 rounded-[3.5rem] shadow-2xl overflow-hidden max-w-[90vw] max-h-[90vh] border border-slate-100">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-contain rounded-[3rem]"
              />
            </div>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="fixed top-8 right-8 size-16 rounded-full bg-white flex items-center justify-center text-slate-900 transition-all shadow-2xl hover:bg-orange-500 hover:text-white group z-[100]"
            >
              <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">close</span>
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Breadcrumbs */}
      <nav className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 mb-6">
        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
          <LocalizedClientLink href="/" className="hover:text-orange-500 transition-colors">Home</LocalizedClientLink>
          <span className="opacity-30">/</span>
          <LocalizedClientLink href="/store" className="hover:text-orange-500 transition-colors">Pantry</LocalizedClientLink>
          <span className="opacity-30">/</span>
          <span className="text-slate-900 dark:text-white font-extrabold">{product.title}</span>
        </div>
      </nav>

      {/* Product Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">

          {/* Image Gallery - 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="aspect-square w-full rounded-[4rem] overflow-hidden bg-white dark:bg-slate-900 relative group flex items-center justify-center border border-slate-50 dark:border-slate-800 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-orange-100/30">
              {mainImage ? (
                <img
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={mainImage}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                  <span className="material-symbols-outlined text-6xl opacity-20">image</span>
                  <span className="font-bold text-xs uppercase tracking-widest">Image Unavailable</span>
                </div>
              )}

              {product.collection && (
                <div className="absolute top-10 left-10 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                  {product.collection.title}
                </div>
              )}

              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-10 right-10 size-16 rounded-3xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl hover:bg-orange-500 hover:text-white transition-all duration-500 transform hover:scale-110 group"
              >
                <span className="material-symbols-outlined text-3xl">zoom_in</span>
              </button>
            </div>

            {images && images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {images.slice(0, 6).map((image, idx) => (
                  <button
                    key={image.id || idx}
                    onClick={() => setMainImage(image.url)}
                    className={`aspect-square rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 transition-all border-2 ${mainImage === image.url ? 'border-orange-500 shadow-lg scale-95' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <img src={image.url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details - 5 cols */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="sticky top-32 flex flex-col h-full">
              <div className="pb-10 border-b border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">Verified Perfection • 124 Purrs</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight font-display">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em]">
                    Freshly Stocked
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{product.variants?.[0]?.sku || 'MM-ELITE-001'}</span>
                </div>

                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
                  {product.description || "A curated masterpiece for your cat's daily routine, combining artisanal quality with modern nutritional science."}
                </p>
              </div>

              <div className="py-10">
                {productActions}
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <span className="material-symbols-outlined text-xl">local_shipping</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white block">Speedy Delivery</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Arrives in 2-3 Days</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600">
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white block">Secure Vault</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">100% Protection</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto bg-[#F8F9FA] dark:bg-slate-900/50 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800">
                <ProductTabs product={product} region={region} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Showcase Section */}
      <section className="bg-slate-950 py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.05),transparent_50%)]"></div>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-32 lg:items-center">
            <div>
              <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">The Gourmet Philosophy</span>
              <h2 className="text-6xl lg:text-7xl font-black text-white tracking-tighter mb-10 leading-[0.95] font-display">Crafted for <br /> <span className="text-orange-500 decoration-8 decoration-orange-500/20 underline-offset-8">Instincts.</span></h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed mb-16 max-w-lg">Designed after studying thousands of feline interaction patterns. We don&apos;t just make food and toys; we craft moments of pure feline joy.</p>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3">
                  <span className="text-5xl font-black text-white font-display">100%</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Pure Grade Integrity</p>
                </div>
                <div className="space-y-3">
                  <span className="text-5xl font-black text-white font-display">Elite</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Nutritional Profile</p>
                </div>
              </div>
            </div>

            <div className="mt-24 lg:mt-0 grid sm:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/10 hover:border-orange-500/30 transition-all duration-700 group">
                <div className="size-20 rounded-3xl bg-orange-500 mb-10 flex items-center justify-center text-white shadow-3xl shadow-orange-500/30 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-4xl">texture</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 font-display">Tactile Edge</h3>
                <p className="text-slate-400 font-medium text-base leading-relaxed">Unique textures that stimulate feline senses and promote natural engagement.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/10 hover:border-orange-500/30 transition-all duration-700 group sm:translate-y-20">
                <div className="size-20 rounded-3xl bg-white mb-10 flex items-center justify-center text-slate-900 shadow-3xl group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-4xl">health_and_safety</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 font-display">Expertly Vetted</h3>
                <p className="text-slate-400 font-medium text-base leading-relaxed">Every batch is verified for safety and nutritional compliance by world experts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="py-0 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {relatedProducts}
      </section>

      {/* Enhanced Reviews Section */}
      <section className="bg-white py-40 border-t border-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-32">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-12 font-display uppercase leading-none">The <br /> <span className="text-orange-500">Purrs.</span></h2>
                <div className="flex items-end gap-6 mb-12">
                  <span className="text-9xl font-black text-slate-900 tracking-tighter leading-none font-display">4.8</span>
                  <div className="mb-4 flex flex-col gap-3">
                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Global Satisfaction Score</span>
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white h-24 rounded-[3rem] font-black uppercase tracking-[0.25em] shadow-3xl hover:bg-orange-600 transition-all duration-500 transform hover:-translate-y-2">
                  Add Your Voice
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-12">
              {/* Review Cards */}
              {[1, 2].map((i) => (
                <div key={i} className="p-16 rounded-[4.5rem] bg-[#F9FAFB] border border-slate-50 transition-all duration-700 hover:shadow-2xl hover:bg-white relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                    <span className="material-symbols-outlined text-[15rem]">format_quote</span>
                  </div>
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="size-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-slate-900 font-black shadow-orange-100/50">
                        {i === 1 ? 'JD' : 'SM'}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-xl uppercase font-display tracking-tight">{i === 1 ? 'Jane Doe' : 'Sam Meow'}</h4>
                        <div className="flex text-orange-400 text-xs mt-1">
                          {[...Array(5)].map((_, idx) => (
                            <span key={idx} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">{i === 1 ? 'Last Week' : 'Last Month'}</span>
                  </div>
                  <h5 className="text-3xl font-black text-slate-900 mb-6 tracking-tight font-display uppercase">{i === 1 ? 'Absolutely Gourmet!' : 'The only food they eat'}</h5>
                  <p className="text-slate-500 font-medium text-xl leading-relaxed max-w-2xl relative z-10">
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

