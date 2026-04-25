import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import PriceFilter from "@modules/store/components/price-filter"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  minPrice,
  maxPrice,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  minPrice?: string
  maxPrice?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const product_categories = await listCategories()

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="min-h-screen px-4 py-8 md:px-10 lg:px-14 max-w-[1440px] mx-auto w-full">
        {/* Breadcrumbs & Header */}
        <div className="mb-8">
            <nav className="flex items-center text-sm text-[#61896f] mb-4">
                <LocalizedClientLink className="hover:text-[#13ec5b] transition-colors" href="/">Home</LocalizedClientLink>
                <span className="mx-2">/</span>
                {parents && parents.map((parent) => (
                    <span key={parent.id} className="flex flex-row items-center">
                        <LocalizedClientLink className="hover:text-[#13ec5b] transition-colors" href={`/categories/${parent.handle}`}>
                            {parent.name}
                        </LocalizedClientLink>
                        <span className="mx-2">/</span>
                    </span>
                ))}
                <span className="text-[#111813] font-medium">{category.name}</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111813]">{category.name}</h1>
                    {category.description && (
                        <p className="mt-2 text-[#61896f]">{category.description}</p>
                    )}
                </div>
            </div>
        </div>
        
        {category.category_children && category.category_children.length > 0 && (
            <div className="mb-8 text-sm text-[#111813] flex gap-2 flex-wrap">
                {category.category_children.map((c) => (
                    <LocalizedClientLink key={c.id} className="px-3 py-1 bg-[#f0f4f2] hover:bg-[#dbe6df] rounded-full transition-colors" href={`/categories/${c.handle}`}>
                        {c.name}
                    </LocalizedClientLink>
                ))}
            </div>
        )}

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
                <Suspense fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />}>
                    <PaginatedProducts
                        sortBy={sort}
                        page={pageNumber}
                        categoryId={category.id}
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
