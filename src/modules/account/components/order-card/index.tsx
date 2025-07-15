import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div
      className="border-2 border-[#feb9cc] rounded-lg p-4 bg-white shadow-sm flex flex-col"
      data-testid="order-card"
    >
      <div className="uppercase text-large-semi mb-2 text-[#feb9cc]">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>
      <div className="flex items-center divide-x divide-[#feb9cc]/30 text-small-regular text-ui-fg-base mb-4">
        <span className="pr-3" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-3" data-testid="order-amount">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </span>
        <span className="pl-3">
          {`${numberOfLines} ${numberOfLines > 1 ? "items" : "item"}`}
        </span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 mb-4">
        {order.items?.slice(0, 3).map((i) => (
          <div
            key={i.id}
            className="flex flex-col gap-y-2"
            data-testid="order-item"
          >
            <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
            <div className="flex items-center text-small-regular text-ui-fg-base">
              <span className="font-semibold" data-testid="item-title">
                {i.title}
              </span>
              <span className="ml-1">×</span>
              <span className="ml-1" data-testid="item-quantity">
                {i.quantity}
              </span>
            </div>
          </div>
        ))}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-small-regular text-ui-fg-base">
            <span>+ {numberOfLines - 4}</span>
            <span>еще</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            className="bg-[#feb9cc] border-none hover:bg-opacity-90 text-white"
          >
            Подробнее
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
