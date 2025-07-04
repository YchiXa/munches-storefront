import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  // сформируем группы ссылок
  const row1 = [
    {
      title: "Категории",
      items: productCategories
        ?.slice(0, 6)
        .map((c) => ({ name: c.name, href: `/categories/${c.handle}` })),
    },
    {
      title: "Коллекции",
      items: collections
        ?.slice(0, 6)
        .map((c) => ({ name: c.title, href: `/collections/${c.handle}` })),
    },
  ]

  const row2 = [
    {
      title: "munchy",
      items: [
        { name: "История", href: "/" },
        { name: "Планы", href: "/" },
        { name: "Есть идеи?", href: "/" },
      ],
    },
  ]

  return (
    <footer className="w-full">
      {/* Верхний белый блок */}
      <div className="bg-white w-full border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {row1.concat(row2).map((group) => (
              <div key={group.title} className="space-y-4">
                <Text className="block text-sm font-semibold uppercase tracking-wider text-gray-700">
                  {group.title}
                </Text>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <LocalizedClientLink
                        href={item.href}
                        className="text-base text-gray-600 hover:text-[#feb9cc] transition-colors duration-200"
                      >
                        {item.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Нижний розовый блок */}
      <div className="bg-[#feb9cc] w-full">
        <div className="content-container py-16 flex flex-col items-center gap-y-4">
          <h1 className="text-[5rem] font-black leading-none">munchy</h1>
          <div className="flex items-center gap-x-4 text-gray-800 text-sm">
            <span>
              © {new Date().getFullYear()} munchy. Все права защищены.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
