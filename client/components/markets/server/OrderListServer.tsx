import { getOrders } from '@/actions/trade-actions'
import OrderList from '../OrderList'
import { Order } from '@/types/trade.types'

interface OrderListServerProps {
  isLoggedIn: boolean
}

const OrderListServer = async ({ isLoggedIn }: OrderListServerProps) => {
  const { success, orders: initialOrders } = await getOrders()
  let orders: Order[] = []
  if (success && initialOrders) {
    orders = initialOrders
  } else {
    orders = []
  }
  return <OrderList initialOrders={orders} isLoggedIn={isLoggedIn} />
}

export default OrderListServer
