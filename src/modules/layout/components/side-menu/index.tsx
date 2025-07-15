// src/app/[countryCode]/(main)/layout/side-menu/index.tsx
"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
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

const SideMenu = ({ regions }: SideMenuProps) => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <Popover.Button
                aria-label="Навигационное меню"
                data-testid="nav-menu-button"
                className="nav-btn px-2 py-1 sm:px-4 sm:py-2 rounded-full"
              >
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
                {/* Скрываем текст на мобилках */}
                <span className="hidden sm:inline">Меню</span>
              </Popover.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <PopoverPanel
                  className="absolute inset-x-0 m-2 max-h-[calc(100vh-1rem)] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-2xl shadow-xl p-8 pt-safe-top pb-safe-bottom flex flex-col justify-between gap-6 z-30 overflow-y-auto"
                  data-testid="nav-menu-popup"
                >
                  {/* Close button */}
                  <div className="flex justify-between items-center">
                    <a href="/" className="text-3xl font-bold">
                      Войти
                    </a>
                    <button
                      onClick={close}
                      className="p-2 rounded-full bg-white transition ease-out duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                      data-testid="close-menu-button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Menu links */}
                  <ul className="flex flex-col gap-6">
                    {Object.entries(SideMenuItems).map(([name, href]) => (
                      <li key={name}>
                        <LocalizedClientLink
                          href={href}
                          onClick={close}
                          data-testid={`${name.toLowerCase()}-link`}
                          className="nav-btn font-bold text-gray-800 hover:text-[#feb9cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
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
    </div>
  )
}

export default SideMenu
