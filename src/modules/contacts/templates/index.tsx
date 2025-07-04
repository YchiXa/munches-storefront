import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function ContactsTemplate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 bg-beige rounded-2xl shadow-lg">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-8 text-choco">Контакты</h1>

        <div className="space-y-6 text-left">
          <div className="bg-cream p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-choco">Свяжитесь с нами</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Телефон:</h3>
                <p className="text-gray-600">+7 (930) 817-00-07</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Email:</h3>
                <p className="text-gray-600">info@munches.com</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Адрес:</h3>
                <p className="text-gray-600">г. Сочи, ул. Перелетная, д. 32А</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Время работы:</h3>
                <p className="text-gray-600">
                  Пн-Пт: 9:00 - 18:00
                  <br />
                  Сб-Вс: 10:00 - 16:00
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cream p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-choco">Обратная связь</h2>
            <p className="text-gray-600 mb-4">
              Если у вас есть вопросы или предложения, мы будем рады их
              услышать. Напишите нам, и мы ответим в ближайшее время.
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition-colors">
              Написать нам
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
