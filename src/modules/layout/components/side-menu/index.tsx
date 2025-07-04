import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Главная: "/",
  Продукты: "/store",
  Корзина: "/cart",
  Локации: "/locations",
  Аккаунт: "/account",
  Контакты: "/contacts",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
}

export default function SideMenu({ regions }: SideMenuProps) {
  return (
    <div className="h-full">
      <Popover className="h-full flex">
        {({ open, close }) => (
          <>
            <Popover.Button
              aria-label="Открыть меню"
              data-testid="nav-menu-button"
              className="px-3 py-2 rounded-2xl text-choco font-semibold text-lg transition-transform transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
            >
              Меню
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition-opacity ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <PopoverPanel
                className="absolute inset-0 bg-white p-6 pt-safe-top pb-safe-bottom overflow-y-auto shadow-2xl rounded-b-2xl mobile:w-full sm:w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 z-40"
                data-testid="nav-menu-popup"
              >
                {/* Close & Login */}
                <div className="flex items-center justify-between mb-8">
                  <LocalizedClientLink
                    href="/account/login"
                    className="text-base font-medium text-choco hover:text-primary"
                    onClick={close}
                  >
                    Войти
                  </LocalizedClientLink>
                  <button
                    onClick={close}
                    aria-label="Закрыть меню"
                    className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition-colors hover:bg-pink-50"
                    data-testid="close-menu-button"
                  >
                    <XMark className="w-6 h-6 text-choco" />
                  </button>
                </div>

                {/* Menu Links */}
                <ul className="flex flex-col gap-6">
                  {Object.entries(SideMenuItems).map(([name, href]) => (
                    <li key={name}>
                      <LocalizedClientLink
                        href={href}
                        onClick={close}
                        data-testid={`${name.toLowerCase()}-link`}
                        className="block text-lg font-bold text-choco hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition-colors"
                      >
                        {name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
