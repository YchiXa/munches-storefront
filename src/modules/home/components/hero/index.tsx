import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="h-[70vh] w-full bg-primary flex flex-col justify-center items-center text-center gap-6 px-4">
      <Heading
        level="h1"
        className="text-5xl sm:text-7xl font-fredoka-bold text-choco drop-shadow"
      >
        munchy
      </Heading>
      <p className="text-lg sm:text-2xl text-choco max-w-md">
        Самые вкусные десерты рядом с вами
      </p>
      <LocalizedClientLink
        href="/store"
        className="px-6 py-3 rounded-2xl bg-choco text-white text-xl hover:bg-opacity-80 transition"
      >
        Смотреть меню
      </LocalizedClientLink>
    </section>
  )
}

export default Hero
