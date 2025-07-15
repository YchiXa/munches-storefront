import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const { addresses } = customer
  return (
    <div className="w-full">
      {/* Акцентная линия сверху */}
      <div className="border-t-2 border-[#feb9cc] mt-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          <AddAddress region={region} addresses={addresses} />
          {addresses.map((address) => (
            <EditAddress region={region} address={address} key={address.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressBook
