import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Правильный тип для listProducts — StoreProductListParams
  const queryParams: HttpTypes.StoreProductListParams = {
    region_id: region.id,
    is_giftcard: false,
  }

  // Фильтр по коллекции
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  // Фильтр по тегам
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter((id): id is string => Boolean(id))
  }

  // Делаем запрос
  const { response } = await listProducts({
    queryParams,
    countryCode,
  })

  // Убираем текущий товар из списка
  const products = response.products.filter((p) => p.id !== product.id)

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-gray-600 mb-6">
          Related products
        </span>
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
          You might also want to check out these products.
        </p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((prod) => (
          <li key={prod.id}>
            <Product region={region} product={prod} />
          </li>
        ))}
      </ul>
    </div>
  )
}
