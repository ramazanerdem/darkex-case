import { BuyOrderForm } from '../BuyOrderForm'
import { MobileTradeSheet } from '../MobileTradeSheet'
import { UUID } from 'crypto'

interface TradeFormServerProps {
  userId: number | UUID | string
}

const TradeFormServer = async ({ userId }: TradeFormServerProps) => {
  return (
    <>
      {/* desktop - alış emir formu */}
      <div className="hidden lg:block h-full">
        <BuyOrderForm userId={userId} />
      </div>

      {/* mobile - açılır sheet alanı */}
      <div className="lg:hidden">
        <MobileTradeSheet userId={userId} />
      </div>
    </>
  )
}

export default TradeFormServer
