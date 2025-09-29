import { UUID } from 'crypto'

export interface BinanceTradeData {
  e: 'trade'
  E: number
  s: string
  t: number
  p: string
  q: string
  T: number
  m: boolean
  M: boolean
}

export interface BuyOrderPayload {
  userId: UUID | number | string
  amount: number
  price: number
}

export interface Order extends BuyOrderPayload {
  id: UUID | number
}
