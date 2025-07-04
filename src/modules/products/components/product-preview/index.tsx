import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        data-testid="product-wrapper"
        className="bg-cream rounded-2xl shadow-md p-4 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200 mobile:w-full sm:w-auto"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          className="rounded-xl overflow-hidden"
        />

        <div className="flex flex-col mobile:gap-2 sm:flex-row sm:justify-between sm:items-center">
          <Text
            className="text-base font-semibold text-choco truncate"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          {cheapestPrice && (
            <div className="mt-2 sm:mt-0">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
