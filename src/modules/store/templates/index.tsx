// src/modules/store/templates/index.tsx
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "./paginated-products"
import CategoryNav from "@modules/store/components/category-nav"
import { listCategories } from "@lib/data/categories"

type StoreTemplateProps = {
  page?: string
  countryCode: string
  categoryId?: string
}

export default async function StoreTemplate({
  page,
  countryCode,
  categoryId,
}: StoreTemplateProps) {
  const pageNumber = page ? parseInt(page, 10) : 1

  // Серверный вызов для получения всех категорий
  const categories = await listCategories({ limit: 100 })

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      {/* Быстрая навигация по категориям вместо сортировки */}
      <CategoryNav categories={categories} />

      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">
            {categoryId ? "Все продукты" : "Все продукты"}
          </h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            page={pageNumber}
            countryCode={countryCode}
            categoryId={categoryId}
          />
        </Suspense>
      </div>
    </div>
  )
}
