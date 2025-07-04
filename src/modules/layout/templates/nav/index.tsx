import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-[#feb9cc]">
      <header className="relative mx-auto bg-[#feb9cc]">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Side menu button */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>

            <SideMenu regions={regions} />
          </div>

          {/* Logo / Title */}
          <div>
            <LocalizedClientLink
              href="/"
              className="text-5xl font-fredoka-bold text-black hover:text-rose-800 transition"
              data-testid="nav-store-link"
            >
              munchy
            </LocalizedClientLink>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-6">
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex items-center text-lg font-semibold text-black"
                  data-testid="nav-cart-link"
                >
                  Корзина (0)
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
