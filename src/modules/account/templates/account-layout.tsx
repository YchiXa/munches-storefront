import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col shadow-sm">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12 gap-x-8">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between py-12 gap-8 small:border-t-2 border-[#feb9cc]">
          <div>
            <h3 className="text-xl-semi mb-4 text-[#feb9cc]">Есть вопросы?</h3>
            <span className="txt-medium text-ui-fg-base font-semibold ">
              Вы можете обратиться в поддержку ТГ.
            </span>
          </div>
          <div>
            <UnderlineLink href="/contacts">Контакты</UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
