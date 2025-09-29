'use client'

import { Badge } from '@/components/ui/badge'
import useBinanceStream from '@/hooks/useBinanceStream'
import { useTokenStore } from '@/lib/store'
import LiveTradeDataSkeleton from '../skeletons/LiveTradeDataSkeleton'

export function LiveTradeData() {
  const { trade, isConnected } = useBinanceStream()
  const { selectedSymbol } = useTokenStore()

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatPrice = (price: string) => {
    return Number.parseFloat(price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatQuantity = (quantity: string) => {
    return Number.parseFloat(quantity).toFixed(6)
  }

  return (
    <div className="h-full flex flex-col">
      {isConnected && trade ? (
        <>
          {/* binance socket live header */}
          <div className="py-2 px-3 lg:p-4 md:border-b border-border">
            {/* mobile */}
            <div className="grid grid-cols-3 lg:hidden">
              <div className="flex items-center text-sm text-muted-foreground">
                {selectedSymbol.toUpperCase()}
              </div>
              <div
                className={`flex justify-center items-center text-lg font-bold ${
                  trade?.m ? 'text-red-400' : 'text-[#6ccca7]'
                }`}
              >
                ${formatPrice(trade?.p || '0')}
              </div>
              <div className="flex justify-end items-center">
                <Badge
                  variant={isConnected ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {isConnected ? 'LIVE' : 'OFF'}
                </Badge>
              </div>
            </div>

            {/* desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between mb-2">
                <div className="text-muted-foreground">
                  {selectedSymbol.toUpperCase()}
                </div>
                <Badge
                  variant={isConnected ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {isConnected ? 'LIVE' : 'OFF'}
                </Badge>
              </div>
              <div
                className={`text-2xl font-bold ${
                  trade?.m ? 'text-red-400' : 'text-[#6ccca7]'
                }`}
              >
                ${formatPrice(trade?.p || '0')}
              </div>
            </div>
          </div>

          {/* binance socket live detay */}
          <div className="flex-1 lg:p-4">
            {/* desktop */}
            <div className="hidden lg:block space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    LAST TRADE TIME
                  </div>
                  <div className="text-sm">{formatTime(trade.T)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    TRADE ID
                  </div>
                  <div className="text-sm">#{trade.t}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    PRICE
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      trade.m ? 'price-down' : 'price-up'
                    }`}
                  >
                    ${formatPrice(trade.p)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    QUANTITY
                  </div>
                  <div className="text-lg font-bold">
                    {formatQuantity(trade.q)}{' '}
                    {selectedSymbol.split('usdt')[0].toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LiveTradeDataSkeleton />
      )}
    </div>
  )
}
