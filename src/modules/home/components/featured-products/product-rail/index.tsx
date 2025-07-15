import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import BannerPreview from "@modules/products/components/banner-preview"
import ProductPreview from "@modules/products/components/product-preview"

/**
 * Доработан дизайн баннеров (цвет по ховеру, адаптив), типы TS учтены.
 * `InteractiveLink` не принимает `className`, поэтому вся стилизация перенесена на внутренний div.
 */

// Цвета для эффекта наведения (по индексу коллекции)
const bgClasses = [
  "bg-white group-hover:bg-yellow-200",
  "bg-white group-hover:bg-pink-200",
  "bg-white group-hover:bg-green-200",
  "bg-white group-hover:bg-blue-200",
  "bg-white group-hover:bg-purple-200",
  "bg-white group-hover:bg-red-200",
]

type ProductRailProps = {
  region: HttpTypes.StoreRegion
}

export default async function ProductRail({ region }: ProductRailProps) {
  const { collections } = await listCollections({
    fields: "id,title,handle,metadata",
  })

  if (!collections.length) return null

  const rails = await Promise.all(
    collections.map(async (collection) => {
      const {
        response: { products },
      } = await listProducts({
        regionId: region.id,
        queryParams: {
          collection_id: collection.id,
          fields: "*variants.calculated_price",
        },
      })
      return { collection, featured: products[0] }
    })
  )

  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
        {rails.map(({ collection, featured }, idx) => {
          const hoverBg = bgClasses[idx % bgClasses.length]
          const bannerSrc = collection.metadata?.banner as string | undefined
          const description = collection.metadata?.description as
            | string
            | undefined

          return (
            <InteractiveLink
              key={collection.id}
              href={`/store/c/${collection.handle}`}
            >
              {/* Обёртка с группой для :hover и декоративными эффектами */}
              <div
                className={`group block rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md`}
              >
                {/* CARD — flex: текст + картинка */}
                <div
                  className={`flex flex-col md:flex-row items-stretch ${hoverBg} transition-colors duration-300`}
                >
                  {/* Текстовый блок */}
                  <div className="flex-1 p-8 sm:p-10 md:p-12 flex flex-col gap-6 justify-center max-w-full md:max-w-lg">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                      {collection.title}
                    </h3>

                    {description && (
                      <div className="text-base sm:text-lg opacity-80">
                        {description}
                      </div>
                    )}

                    <button
                      type="button"
                      className="mt-2 w-max rounded-full border-2 border-gray-900 px-6 py-2 text-sm font-semibold transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white"
                    >
                      Посмотреть все →
                    </button>

                    {featured && (
                      <div className="hidden xl:block mt-6">
                        <BannerPreview
                          product={featured}
                          region={region}
                          isFeatured
                        />
                      </div>
                    )}
                  </div>

                  {/* Изображение */}
                  {(bannerSrc || featured?.thumbnail) && (
                    <div className="md:w-2/5 overflow-hidden flex items-center justify-center p-6 md:p-0">
                      <img
                        src={bannerSrc || (featured!.thumbnail as string)}
                        alt={collection.title}
                        className="object-contain w-full h-48 md:h-full transition-transform duration-300 ease-out group-hover:scale-105 drop-shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </InteractiveLink>
          )
        })}
      </div>
    </div>
  )
}
