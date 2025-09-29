'use client'

import useBinanceStream from '@/hooks/useBinanceStream'
import { useTokenStore } from '@/lib/store'
import BinanceStreamDisplaySkeleton from '../skeletons/BinanceStreamDisplaySkeleton'

const BinanceStreamDisplay = () => {
  const { trade, isLoading, isError, error } = useBinanceStream()
  const { selectedSymbol } = useTokenStore()
  const price = trade?.p || null

  if (isLoading) {
    return <BinanceStreamDisplaySkeleton />
  }

  if (isError) {
    return (
      <div className="text-red-500 h-full flex items-center justify-center px-3 text-center">
        Error: {error?.message || 'Connection failed'}
      </div>
    )
  }

  if (!price) {
    return <BinanceStreamDisplaySkeleton />
  }

  return (
    <div className="flex items-center justify-between h-full px-3">
      <div>
        <h3 className="font-semibold text-2xl flex items-center">
          {selectedSymbol.split('usdt')[0].toUpperCase()}
          <span className="text-lg">/</span>
          USDT
        </h3>
        <p className="text-sm text-muted-foreground">Market Pair</p>
      </div>
      <p className="flex flex-col justify-end text-end">
        <span className="text-sm text-muted-foreground">Current Price</span>
        <span
          className={`text-2xl font-bold ${
            trade?.m ? 'text-red-400' : 'text-[#6ccca7]'
          }`}
        >
          $
          {parseFloat(price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}
        </span>
      </p>
    </div>
  )
}

export default BinanceStreamDisplay
