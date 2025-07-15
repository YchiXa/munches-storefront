// src/modules/store/templates/paginated-products.tsx
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

const PRODUCT_LIMIT = 12

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId, // <-- теперь сюда приходит выбранная категория
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string // <-- ID категории
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: HttpTypes.FindParams & HttpTypes.StoreProductListParams = {
    limit: PRODUCT_LIMIT,
    // вы можете передавать дополнительные фильтры сразу же здесь
  }

  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  if (categoryId) {
    queryParams.category_id = [categoryId]
  }

  if (productsIds) {
    queryParams.id = productsIds
  }

  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  // Передаём sortBy, если он ещё нужен,
  // listProductsWithSort подтянет товары и отсортирует в памяти
  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p} region={region} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
