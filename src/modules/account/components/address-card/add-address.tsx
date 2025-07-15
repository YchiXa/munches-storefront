"use client"

import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useEffect, useState, useActionState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        className="border-2 border-[#feb9cc] rounded-lg p-5 min-h-[220px] h-full w-full flex flex-col justify-between hover:bg-[#feb9cc] hover:bg-opacity-10 transition-colors"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi text-[#feb9cc]">Новый адрес</span>
        <Plus className="text-[#feb9cc]" />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Добавить адрес</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Имя"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Фамилия"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Адрес"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Квартира, офис и т.д."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-4">
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Город</span>
                  <select
                    name="city"
                    required
                    className="input border border-gray-300 rounded focus:border-[#feb9cc]"
                    data-testid="city-input"
                  >
                    <option value="">Выбор</option>
                    <option value="Адлер">Адлер</option>
                    <option value="Сириус">Сириус</option>
                  </select>
                </label>
              </div>
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                className="rounded focus:ring-[#feb9cc]"
                data-testid="country-select"
              />
              <Input
                label="Телефон"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            <input type="hidden" name="company" value="" />
            <input type="hidden" name="province" value="" />
            <input type="hidden" name="postal_code" value="" />
            {formState.error && (
              <div
                className="text-rose-500 text-small-regular py-2"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10 border-[#feb9cc] text-[#feb9cc] hover:bg-[#feb9cc] hover:bg-opacity-10 transition-colors"
                data-testid="cancel-button"
              >
                Отмена
              </Button>
              <SubmitButton
                data-testid="save-button"
                className="h-10 bg-[#feb9cc] hover:bg-opacity-90 transition-colors"
              >
                Сохранить
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
