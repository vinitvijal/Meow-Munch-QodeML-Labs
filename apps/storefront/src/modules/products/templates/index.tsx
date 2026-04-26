import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActionsWrapper from "./product-actions-wrapper"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductTabs from "@modules/products/components/product-tabs"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <main className="flex-grow bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <LocalizedClientLink className="hover:text-primary transition-colors" href="/">Home</LocalizedClientLink>
          <span className="mx-2">/</span>
          <LocalizedClientLink className="hover:text-primary transition-colors" href="/store">Products</LocalizedClientLink>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-white font-medium">{product.title}</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-auto min-h-[500px] w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800 relative group flex items-center justify-center border border-slate-200 dark:border-slate-700">
              {images && images.length > 0 ? (
                <img 
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  src={images[0].url} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
              )}
              {product.collection && (
                <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 rounded-full px-3 py-1 text-xs font-bold text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700">
                  {product.collection.title}
                </div>
              )}
            </div>
            {images && images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1, 4).map((image, idx) => (
                  <button key={image.id || idx} className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 hover:ring-2 ring-primary transition-all border border-slate-200 dark:border-slate-700">
                    <img alt={`${product.title} image`} className="w-full h-full object-contain" src={image.url} />
                  </button>
                ))}
                {images.length > 4 && (
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-medium">+{images.length - 4} more</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 flex flex-col justify-start">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                    <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">4.8 (124 reviews)</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">In Stock</span>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <p>{product.description}</p>
              </div>

              {/* Product Specifications & Shipping (from Backend) */}
              <div className="py-4 border-y border-slate-200 dark:border-slate-800">
                <ProductTabs product={product} />
              </div>

              {/* Actions - Using Medusa Component for Logic */}
              <div className="mt-2">
                <Suspense fallback={<div className="h-24 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />}>
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="bg-surface-light dark:bg-surface-dark py-16 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why cats love it</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">Designed with feline instincts in mind, combining comfort, texture, and playability.</p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-slate-700 dark:text-slate-200">Vet recommended design</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-slate-700 dark:text-slate-200">Durable components</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-slate-700 dark:text-slate-200">Easy to clean</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-slate-700 dark:text-slate-200">Non-toxic materials</span>
                        </li>
                    </ul>
                </div>
                <div className="lg:col-span-2 mt-8 lg:mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-background-light dark:bg-slate-900/50 p-6 rounded-2xl">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm">
                                <span className="material-symbols-outlined">texture</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Premium Feel</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">We use only premium materials that satisfy your cat's natural instincts while looking beautiful in your home.</p>
                        </div>
                        <div className="bg-background-light dark:bg-slate-900/50 p-6 rounded-2xl">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm">
                                <span className="material-symbols-outlined">shield</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quality Guarantee</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Built to withstand even the most active felines. Enjoy peace of mind with our extended warranty coverage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Customers Also Bought / Related Products */}
      <section className="py-16 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customers also bought</h2>
        </div>
        <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </section>
      
      {/* Reviews Section */}
      <section className="bg-surface-light dark:bg-surface-dark py-16 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Reviews</h2>
                    <div className="flex items-end gap-3 mb-2">
                        <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">4.8</span>
                        <div className="mb-2">
                            <div className="flex text-yellow-400 text-sm">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Based on 124 reviews</span>
                        </div>
                    </div>
                    <div className="space-y-2 mt-6">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-3 text-slate-600 dark:text-slate-400">5</span>
                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900 dark:bg-slate-200 w-[80%] rounded-full"></div>
                            </div>
                            <span className="w-8 text-right text-slate-400">80%</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-3 text-slate-600 dark:text-slate-400">4</span>
                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900 dark:bg-slate-200 w-[12%] rounded-full"></div>
                            </div>
                            <span className="w-8 text-right text-slate-400">12%</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-3 text-slate-600 dark:text-slate-400">3</span>
                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900 dark:bg-slate-200 w-[5%] rounded-full"></div>
                            </div>
                            <span className="w-8 text-right text-slate-400">5%</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-8">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold">
                                    JD
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Jane Doe</h4>
                                    <div className="flex text-yellow-400 text-xs">
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">2 weeks ago</span>
                        </div>
                        <h5 className="font-bold text-slate-900 dark:text-white text-base mt-3 mb-2">Finally a stylish product!</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">My cat absolutely loves this. It's totally worth the price tag.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  )
}

export default ProductTemplate

