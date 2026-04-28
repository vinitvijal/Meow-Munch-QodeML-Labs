import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { listCategories } from "@lib/data/categories"
import PriceFilter from "@modules/store/components/price-filter"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  minPrice?: string
  maxPrice?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const product_categories = await listCategories()

  return (
    <div className="min-h-screen px-4 py-8 md:px-10 lg:px-14 max-w-[1440px] mx-auto w-full">
        {/* Breadcrumbs & Header */}
        <div className="mb-8">
            <nav className="flex items-center text-sm text-primary mb-4">
                <a className="hover:text-accent transition-colors font-bold uppercase tracking-widest text-[10px]" href="/">Home</a>
                <span className="mx-2 opacity-30">/</span>
                <span className="text-accent font-black uppercase tracking-widest text-[10px]">All</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-accent font-display italic">All Products</h1>
                    <p className="mt-2 text-primary font-medium">Nourish your feline friend with our curated selection.</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-10 sticky top-32 self-start bg-white/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-neutral-border">
                {/* Filter Group: Sort By */}
                <div>
                    <h3 className="font-black text-accent mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                        Sort By
                    </h3>
                    <RefinementList sortBy={sort} />
                </div>
                <div className="h-px bg-neutral-border"></div>
                {/* Filter Group: Categories */}
                <div>
                    <h3 className="font-black text-accent mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                        Categories
                        <span className="material-symbols-outlined text-primary text-sm">remove</span>
                    </h3>
                    <div className="space-y-4">
                        {product_categories && product_categories.map((c) => (
                            <LocalizedClientLink key={c.id} href={`/categories/${c.handle}`} className="block text-sm text-primary/60 hover:text-accent transition-colors font-bold uppercase tracking-widest text-[10px]">
                                {c.name}
                            </LocalizedClientLink>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-neutral-border"></div>
                {/* Filter Group: Life Stage */}
                <div>
                    <h3 className="font-black text-accent mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                        Life Stage
                        <span className="material-symbols-outlined text-primary text-sm">remove</span>
                    </h3>
                    <div className="space-y-4">
                        {['Kitten (0-1 year)', 'Adult (1-7 years)', 'Senior (7+ years)'].map((l, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input className="h-4 w-4 border-neutral-border text-primary focus:ring-primary cursor-pointer rounded-full"
                                name="lifestage" type="radio" defaultChecked={i===1} />
                            <span className="text-[10px] font-bold text-primary/60 group-hover:text-accent transition-colors uppercase tracking-widest">{l}</span>
                        </label>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-neutral-border"></div>
                {/* Filter Group: Price */}
                <div>
                    <h3 className="font-black text-accent mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                        Price Range
                    </h3>
                    <PriceFilter />
                </div>
            </aside>
            <div className="flex-1 w-full">
                <Suspense fallback={<SkeletonProductGrid />}>
                    <PaginatedProducts
                        sortBy={sort}
                        page={pageNumber}
                        countryCode={countryCode}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
                </Suspense>
            </div>
        </div>
    </div>
  )
}

export default StoreTemplate
