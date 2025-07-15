import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import { Telegram, Vk, Instagram, Youtube, Tiktok } from "@modules/common/icons"
import Link from "next/link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  const row1 = [
    {
      title: "Категории",
      items: productCategories?.slice(0, 6).map((c, index) => ({
        name: c.name,
        href: `/store`,
        key: `category-${index}`,
      })),
    },
  ]

  const row2 = [
    {
      title: "munchy",
      items: [
        { name: "История", href: "/", key: "history" },
        { name: "Планы", href: "/", key: "plans" },
        { name: "Есть идеи?", href: "/", key: "ideas" },
      ],
    },
  ]

  return (
    <footer className="w-full">
      {/* Верхний белый блок */}
      <div className="bg-white w-full border-t border-[#feb9cc]">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Группы ссылок в сжатом виде */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {row1.concat(row2).map((group) => (
              <div key={group.title} className="space-y-2">
                <Text className="text-sm font-semibold uppercase text-gray-700">
                  {group.title}
                </Text>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.key}>
                      <LocalizedClientLink
                        href={item.href}
                        className="text-base text-gray-600 hover:text-[#feb9cc] transition"
                      >
                        {item.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Иконки социальных сетей */}
          <div className="mt-6 flex justify-center space-x-4">
            <Link href="https://t.me/yourchannel" target="_blank">
              <Telegram className="w-5 h-5 text-gray-600 hover:text-[#feb9cc]" />
            </Link>
            <Link href="https://vk.com/yourpage" target="_blank">
              <Vk className="w-5 h-5 text-gray-600 hover:text-[#feb9cc]" />
            </Link>
            <Link href="https://instagram.com/yourprofile" target="_blank">
              <Instagram className="w-5 h-5 text-gray-600 hover:text-[#feb9cc]" />
            </Link>
            <Link href="https://youtube.com/yourchannel" target="_blank">
              <Youtube className="w-5 h-5 text-gray-600 hover:text-[#feb9cc]" />
            </Link>
            <Link href="https://tiktok.com/@yourprofile" target="_blank">
              <Tiktok className="w-5 h-5 text-gray-600 hover:text-[#feb9cc]" />
            </Link>
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
