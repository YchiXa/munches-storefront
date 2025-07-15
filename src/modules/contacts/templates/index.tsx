import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"

export default function ContactsTemplate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-8">Контакты</h1>

        <div className="space-y-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Свяжитесь с нами</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Телефон:</h3>
                <p className="text-gray-600">+7 (993) 437-10-08</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Email:</h3>
                <p className="text-gray-600">munchycookies@yandex.com</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Адрес:</h3>
                <p className="text-gray-600">г. Адлер (сириус)</p>
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

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Обратная связь</h2>
            <p className="text-gray-600 mb-4">
              Если у вас есть вопросы или предложения, мы будем рады их
              услышать. Напишите нам, и мы ответим в ближайшее время.
            </p>
            <Link
              href="https://t.me/munchycookies"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block text-center"
            >
              Написать нам
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
