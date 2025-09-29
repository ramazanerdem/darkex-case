'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Order } from '@/types/trade.types'
import { UUID } from 'crypto'
import { cancelOrder } from '@/actions/trade-actions'
import { toast } from 'sonner'
import { useUserStore, useOrderStore } from '@/lib/store'
import { useEffect } from 'react'

interface OrderListProps {
  initialOrders?: Order[]
  isLoggedIn: boolean
}

const OrderList = ({ initialOrders = [], isLoggedIn }: OrderListProps) => {
  const { increaseUserBalance } = useUserStore()
  const { orders, setOrders, removeOrder } = useOrderStore()

  useEffect(() => {
    if (initialOrders.length > 0 && orders.length === 0) {
      setOrders(initialOrders)
    }
  }, [initialOrders, orders.length, setOrders])

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatAmount = (amount: number) => {
    return amount.toFixed(6)
  }

  const calculateTotal = (amount: number, price: number) => {
    return (amount * price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // bekleyen emir iptal etme
  const handleCancelOrder = async (orderId: number | UUID) => {
    const res = await cancelOrder(orderId)
    if (!res.success) {
      toast.error('Failed to cancel order')
      console.error(res.error)
      return
    }
    toast.success('Order cancelled successfully')

    removeOrder(orderId)

    // demo bakiye güncelleme
    increaseUserBalance('usdt', res.order.price * res.order.amount)
  }
  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col m-0">
          {/* Table Header - Desktop */}
          <div className="hidden lg:block px-4 py-2 border-b border-border">
            <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground font-semibold">
              <div className="col-span-2">TYPE</div>
              <div className="col-span-2 text-right">AMOUNT</div>
              <div className="col-span-2 text-right">PRICE</div>
              <div className="col-span-3 text-right">TOTAL</div>
              <div
                className={`${
                  isLoggedIn ? 'col-span-2' : 'col-span-3'
                }  text-right`}
              >
                STATUS
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* header - mobile */}
          <div className="lg:hidden px-3 py-3 border-b border-border">
            <h3 className="text-sm font-semibold">Open Orders</h3>
          </div>

          {/* orders */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {orders.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <div className="text-sm">No open orders</div>
                  <div className="text-xs mt-1">
                    Your orders will appear here
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {orders.map((order) => (
                  <div key={order.id}>
                    {/* desktop layout */}
                    <div className="hidden lg:block px-4 py-2 hover:bg-accent/50 transition-colors border-b border-border">
                      <div className="grid grid-cols-12 gap-2 text-xs items-center">
                        <div className="col-span-2">
                          <Badge
                            variant="outline"
                            className="text-xs price-up border-success"
                          >
                            BUY
                          </Badge>
                        </div>
                        <div className="col-span-2 text-right monospace-data">
                          {formatAmount(order.amount)} BTC
                        </div>
                        <div className="col-span-2 text-right monospace-data font-semibold">
                          ${formatPrice(order.price)}
                        </div>
                        <div className="col-span-3 text-right monospace-data">
                          ${calculateTotal(order.amount, order.price)}
                        </div>
                        <div
                          className={`${
                            isLoggedIn ? 'col-span-2' : 'col-span-3'
                          }  text-right`}
                        >
                          <Badge variant="secondary" className="text-xs">
                            PENDING
                          </Badge>
                        </div>
                        {isLoggedIn ? (
                          <div className="col-span-1 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/20 cursor-pointer"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              <X className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* mobile layout */}
                    <div className="lg:hidden px-3 py-3 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs price-up border-success bg-[#6ccca7]/30"
                          >
                            BUY
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            PENDING
                          </Badge>
                        </div>
                        {isLoggedIn && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 bg-destructive/10 hover:bg-destructive/20"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            <X className="h-3 w-3 text-destructive" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Amount
                          </div>
                          <div className="monospace-data">
                            {formatAmount(order.amount)} BTC
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            Price
                          </div>
                          <div className="monospace-data font-semibold">
                            ${formatPrice(order.price)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total:</span>
                          <span className="monospace-data font-semibold">
                            ${calculateTotal(order.amount, order.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* footer */}
          <div className="p-3 lg:p-4 border-t border-border">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between text-xs text-muted-foreground">
              <div className="font-medium">Total Orders: {orders.length}</div>
              <div className="font-medium">
                Total Value: $
                {orders
                  .reduce((sum, order) => sum + order.amount * order.price, 0)
                  .toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
