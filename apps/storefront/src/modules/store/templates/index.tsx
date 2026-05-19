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
        <div className="min-h-screen px-4 py-8 md:px-10 lg:px-14 max-w-[1440px] mx-auto w-full bg-background-light">
            {/* Breadcrumbs & Header */}
            <div className="mb-10">
                <nav className="flex items-center text-sm text-primary mb-6">
                    <LocalizedClientLink className="hover:text-accent transition-colors font-black uppercase tracking-[0.3em] text-[8px] lg:text-[10px]" href="/">Home</LocalizedClientLink>
                    <span className="mx-3 opacity-30 text-[8px]">/</span>
                    <span className="text-accent font-black uppercase tracking-[0.3em] text-[8px] lg:text-[10px]">All Products</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-accent font-display italic leading-[1.1]">All Products</h1>
                        <p className="mt-4 text-base lg:text-lg text-primary/70 font-medium leading-relaxed max-w-xl">
                            Nourish your feline friend with our curated selection of artisanal essentials and gourmet treats.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 lg:space-y-10 lg:sticky lg:top-32 self-start bg-white/40 lg:bg-white/50 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-border">
                    {/* Filter Group: Sort By */}
                    <div>
                        <h3 className="font-black text-accent mb-5 lg:mb-6 flex items-center justify-between text-[10px] lg:text-xs uppercase tracking-[0.3em]">
                            Sort By
                        </h3>
                        <RefinementList sortBy={sort} />
                    </div>

                    <div className="h-px bg-neutral-border/50"></div>

                    {/* Filter Group: Categories */}
                    <div>
                        <h3 className="font-black text-accent mb-5 lg:mb-6 flex items-center justify-between text-[10px] lg:text-xs uppercase tracking-[0.3em]">
                            Categories
                        </h3>
                        <div className="flex lg:flex-col flex-wrap gap-2 lg:gap-4">
                            {product_categories && product_categories.map((c) => (
                                <LocalizedClientLink
                                    key={c.id}
                                    href={`/categories/${c.handle}`}
                                    className="block text-[9px] lg:text-[10px] text-primary/60 hover:text-accent transition-colors font-black uppercase tracking-[0.2em] bg-white lg:bg-transparent px-3 py-1.5 lg:p-0 rounded-full border border-neutral-border lg:border-0"
                                >
                                    {c.name}
                                </LocalizedClientLink>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-neutral-border/50"></div>

                    {/* Filter Group: Price */}
                    <div>
                        <h3 className="font-black text-accent mb-5 lg:mb-6 flex items-center justify-between text-[10px] lg:text-xs uppercase tracking-[0.3em]">
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
