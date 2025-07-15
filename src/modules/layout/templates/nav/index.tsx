import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import CartIcon from "@modules/common/icons/carticon"

export default async function Nav() {
  const regions = await listRegions().then((rs: StoreRegion[]) => rs)

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-[#feb9cc]">
      <header className="relative mx-auto bg-[#feb9cc]">
        <nav className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between">
          {/* Side menu button */}
          <div className="flex items-center">
            <SideMenu regions={regions} />
          </div>

          {/* Logo / Title */}
          <div>
            <LocalizedClientLink
              href="/"
              className="text-3xl sm:text-4xl md:text-5xl font-fredoka-bold text-black hover:text-rose-800 transition"
              data-testid="nav-store-link"
            >
              munchy
            </LocalizedClientLink>
          </div>

          {/* Иконка корзины для мобильных */}
          <div className="flex sm:hidden items-center">
            <LocalizedClientLink
              href="/cart"
              className="p-2"
              data-testid="nav-cart-link-mobile"
            >
              <CartIcon />
            </LocalizedClientLink>
          </div>

          {/* Полная кнопка «Корзина» для sm+ */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-6">
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex items-center text-base sm:text-lg font-semibold text-black"
                  data-testid="nav-cart-link"
                >
                  <CartIcon />
                  Корзина
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
