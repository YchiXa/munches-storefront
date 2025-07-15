"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

type CategoryNavProps = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const router = useRouter()
  const params = useSearchParams()
  const selected = params.get("category") ?? ""

  /** Устанавливает или сбрасывает фильтр по категории */
  const handleFilter = (value?: string) => {
    const qp = new URLSearchParams(params)
    if (value) {
      qp.set("category", value)
    } else {
      qp.delete("category")
    }
    // Сбрасываем пагинацию при изменении фильтра
    qp.delete("page")
    router.push(`?${qp.toString()}`)
  }

  return (
    <aside className="w-full self-start px-4 small:w-64 small:sticky small:top-6">
      <h2 className="mb-4 text-lg-semi">Категории</h2>
      <ul className="flex flex-col gap-2 mb-4">
        {categories.map((c) => {
          const isActive = c.id === selected
          return (
            <li key={c.id}>
              <button
                onClick={() => handleFilter(c.id)}
                className={
                  `w-full text-left px-3 py-2 rounded transition ` +
                  (isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100")
                }
              >
                {c.name}
              </button>
            </li>
          )
        })}
      </ul>
      <button
        onClick={() => handleFilter(undefined)}
        disabled={!selected}
        className="w-full px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50"
      >
        Сбросить фильтры
      </button>
    </aside>
  )
}
