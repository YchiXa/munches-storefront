import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  // Наш форматтер, локаль — ru-RU
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: selectedPrice.currency_code, // например "RUB"
    // currencyDisplay: "symbol",                // по умолчанию; даст "₽"
    // или currencyDisplay: "name" — даст "российский рубль"
  })

  const formattedPrice = formatter.format(selectedPrice.calculated_price_number)
  const formattedOriginal =
    selectedPrice.price_type === "sale"
      ? formatter.format(selectedPrice.original_price_number)
      : undefined

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx("text-xl-semi", {
          "text-ui-fg-interactive": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && "От "}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {formattedPrice}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && formattedOriginal && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {formattedOriginal}
            </span>
          </p>
          <span className="text-ui-fg-interactive">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
