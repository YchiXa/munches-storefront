import { HttpTypes } from "@medusajs/types"
import Input from "@modules/common/components/input"
import React, { useState } from "react"
import CountrySelect from "../country-select"

const BillingAddress = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  const [formData, setFormData] = useState<any>({
    "billing_address.first_name": cart?.billing_address?.first_name || "",
    "billing_address.last_name": cart?.billing_address?.last_name || "",
    "billing_address.address_1": cart?.billing_address?.address_1 || "",
    "billing_address.city": cart?.billing_address?.city || "",
    "billing_address.country_code": cart?.billing_address?.country_code || "",
    "billing_address.phone": cart?.billing_address?.phone || "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Имя"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={formData["billing_address.first_name"]}
          onChange={handleChange}
          required
          data-testid="billing-first-name-input"
        />
        <Input
          label="Фамилия"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={formData["billing_address.last_name"]}
          onChange={handleChange}
          required
          data-testid="billing-last-name-input"
        />
        <Input
          label="Адрес"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={formData["billing_address.address_1"]}
          onChange={handleChange}
          required
          data-testid="billing-address-input"
        />
        <label className="flex flex-col gap-1">
          <span className="text-sm">Город</span>
          <select
            name="billing_address.city"
            value={formData["billing_address.city"]}
            onChange={handleChange}
            required
            className="input"
            data-testid="billing-city-input"
          >
            <option value="">Выберите город</option>
            <option value="Адлер">Адлер</option>
            <option value="Сириус">Сириус</option>
          </select>
        </label>
        <CountrySelect
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["billing_address.country_code"]}
          onChange={handleChange}
          required
          data-testid="billing-country-select"
        />
        <Input
          label="Телефон"
          name="billing_address.phone"
          autoComplete="tel"
          value={formData["billing_address.phone"]}
          onChange={handleChange}
          data-testid="billing-phone-input"
        />
      </div>
      <input
        type="hidden"
        name="first_name"
        value={formData["billing_address.first_name"] || ""}
      />
      <input
        type="hidden"
        name="last_name"
        value={formData["billing_address.last_name"] || ""}
      />
      <input
        type="hidden"
        name="address_1"
        value={formData["billing_address.address_1"] || ""}
      />
      <input
        type="hidden"
        name="city"
        value={formData["billing_address.city"] || ""}
      />
      <input
        type="hidden"
        name="country_code"
        value={formData["billing_address.country_code"] || ""}
      />
      <input
        type="hidden"
        name="phone"
        value={formData["billing_address.phone"] || ""}
      />
      <input type="hidden" name="billing_address.company" value="" />
      <input type="hidden" name="billing_address.province" value="" />
      <input type="hidden" name="billing_address.postal_code" value="" />
    </>
  )
}

export default BillingAddress
