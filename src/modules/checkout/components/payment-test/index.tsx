import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-bold">Только</span> перевод на карту
    </Badge>
  )
}

export default PaymentTest
