import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"

/**
 * ProductRail теперь умеет работать в двух режимах:
 * 1. Если проп `collection` передан — показывает баннер только для этой коллекции.
 * 2. Если пропа нет — сам запрашивает все коллекции и выводит их.
 */

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
  collection?: HttpTypes.StoreCollection
}

export default async function ProductRail({
  region,
  collection,
}: ProductRailProps) {
  // Получаем массив коллекций: либо 1 переданную, либо все
  const collections = collection
    ? [collection]
    : (
        await listCollections({
          fields: "id,title,handle,metadata",
        })
      ).collections

  if (!collections.length) return null

  // Берём первый товар каждой коллекции — нужен только thumbnail/images
  const rails = await Promise.all(
    collections.map(async (col) => {
      const {
        response: { products },
      } = await listProducts({
        regionId: region.id,
        queryParams: {
          collection_id: col.id,
          fields: "thumbnail,images",
          limit: 1,
        },
      })
      const first = products[0]
      const fallbackImg =
        (first?.thumbnail as string | undefined) ||
        (first?.images?.[0]?.url as string | undefined)
      return { collection: col, fallbackImg }
    })
  )

  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
        {rails.map(({ collection: col, fallbackImg }, idx) => {
          const hoverBg = bgClasses[idx % bgClasses.length]
          const bannerSrc = col.metadata?.banner as string | undefined
          const description = col.metadata?.description as string | undefined
          const imgSrc = bannerSrc || fallbackImg

          return (
            <InteractiveLink key={col.id} href={`/store/c/${col.handle}`}>
              <div className="group block rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <div
                  className={`flex flex-col md:flex-row items-stretch ${hoverBg} transition-colors duration-300`}
                >
                  <div className="flex-1 p-8 sm:p-10 md:p-12 flex flex-col gap-6 justify-center max-w-full md:max-w-lg">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                      {col.title}
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
                      Посмотреть что есть →
                    </button>
                  </div>

                  {imgSrc && (
                    <div className="md:w-2/5 overflow-hidden flex items-center justify-center p-6 md:p-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={col.title}
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
