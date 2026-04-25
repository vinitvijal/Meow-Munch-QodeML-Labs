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
            <nav className="flex items-center text-sm text-[#61896f] mb-4">
                <a className="hover:text-[#13ec5b] transition-colors" href="/">Home</a>
                <span className="mx-2">/</span>
                <span className="text-[#111813] font-medium">All</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111813]">All Products</h1>
                    <p className="mt-2 text-[#61896f]">Nourish your feline friend with our curated selection.</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 sticky top-28 self-start">
                {/* Filter Group: Sort By */}
                <div>
                    <h3 className="font-bold text-[#111813] mb-4 flex items-center justify-between">
                        Sort By
                    </h3>
                    <RefinementList sortBy={sort} />
                </div>
                <div className="h-px bg-[#f0f4f2]"></div>
                {/* Filter Group: Categories */}
                <div>
                    <h3 className="font-bold text-[#111813] mb-4 flex items-center justify-between">
                        Categories
                        <span className="material-symbols-outlined text-[#61896f] text-sm">remove</span>
                    </h3>
                    <div className="space-y-3">
                        {product_categories && product_categories.map((c) => (
                            <LocalizedClientLink key={c.id} href={`/categories/${c.handle}`} className="block text-sm text-[#61896f] hover:text-[#111813] transition-colors font-medium">
                                {c.name}
                            </LocalizedClientLink>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-[#f0f4f2]"></div>
                {/* Filter Group: Life Stage */}
                <div>
                    <h3 className="font-bold text-[#111813] mb-4 flex items-center justify-between">
                        Life Stage
                        <span className="material-symbols-outlined text-[#61896f] text-sm">remove</span>
                    </h3>
                    <div className="space-y-3">
                        {['Kitten (0-1 year)', 'Adult (1-7 years)', 'Senior (7+ years)'].map((l, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input className="h-4 w-4 border-[#dbe6df] text-[#13ec5b] focus:ring-[#13ec5b] cursor-pointer"
                                name="lifestage" type="radio" defaultChecked={i===1} />
                            <span className="text-sm text-[#61896f] group-hover:text-[#111813] transition-colors">{l}</span>
                        </label>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-[#f0f4f2]"></div>
                {/* Filter Group: Price */}
                <div>
                    <h3 className="font-bold text-[#111813] mb-4 flex items-center justify-between">
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
