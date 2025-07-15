import { Heading, Text } from "@medusajs/ui"
import TransferActions from "@modules/order/components/transfer-actions"
import TransferImage from "@modules/order/components/transfer-image"

export default async function TransferPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  const { id, token } = await params

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          Запрос на перенос заказа {id}
        </Heading>
        <Text className="text-zinc-600">
          Вы получили запрос на перенос права владения заказом ({id}). Если вы
          согласны, подтвердите перенос, нажав кнопку ниже.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <Text className="text-zinc-600">
          После подтверждения новый владелец получит все права и обязанности по
          этому заказу.
        </Text>
        <Text className="text-zinc-600">
          Если вы не запрашивали перенос или хотите сохранить заказ за собой,
          никаких действий не требуется.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  )
}
