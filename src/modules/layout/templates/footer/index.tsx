import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

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
      title: "Munchy",
      items: [
        { name: "История", href: "/" },
        { name: "Планы", href: "/" },
        { name: "Есть идеи?", href: "/" },
      ],
    },
  ]

  return (
    <footer className="w-full bg-cream">
      {/* Верхний блок */}
      <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {row1.concat(row2).map((group) => (
            <div key={group.title} className="space-y-3">
              <Text className="block text-sm font-semibold uppercase tracking-wider text-choco">
                {group.title}
              </Text>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <LocalizedClientLink
                      href={item.href}
                      className="block text-base text-choco/80 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
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

      {/* Нижний блок */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl font-black text-choco leading-none">Munchy</h2>
          <div className="text-sm text-choco">
            © {new Date().getFullYear()} Munchy. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
}
