import { declineTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@medusajs/ui"
import TransferImage from "@modules/order/components/transfer-image"

export default async function TransferPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  const { id, token } = await params

  const { success, error } = await declineTransferRequest(id, token)

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Перенос заказа отклонён!
            </Heading>
            <Text className="text-zinc-600">
              Перенос заказа {id} успешно отклонён.
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              Произошла ошибка при отклонении переноса. Попробуйте ещё раз.
            </Text>
            {error && <Text className="text-red-500">Ошибка: {error}</Text>}
          </>
        )}
      </div>
    </div>
  )
}
