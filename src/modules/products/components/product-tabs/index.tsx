"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import Warning from "@modules/common/icons/warning"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Информация о продукте",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Доставка и возвраты",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  // 1) Гарантируем, что metadata — это индексируемый объект
  const metadata = (product.metadata ?? {}) as Record<string, any>

  // 2) Извлекаем нужные поля, приводя к string|number
  const caloriesValue: string | number =
    metadata.calories !== undefined ? metadata.calories : "-"
  const bzhuValue: string | number =
    metadata.bzhu !== undefined ? metadata.bzhu : "-"

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        {/* Левая колонка */}
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Калории</span>
            <p>{caloriesValue}</p>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">БЖУ</span>
            <p>{bzhuValue}</p>
          </div>
          <div>
            <span className="font-semibold">Вес</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Доставка</span>
            <p className="max-w-sm">
              Заказ займет от 15 до 40 минут. Пока что не сможем гаранитровать
              более быстрой доставки и стабильности по времени.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">
              Товар может отличаться от картинки!
            </span>
            <p className="max-w-sm">
              Извините, но такое может произойти, ведь все делается руками.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Warning />
          <div>
            <span className="font-semibold">Возврат</span>
            <p className="max-w-sm">
              Мы не большая компания которая не может себе это позволить(
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
