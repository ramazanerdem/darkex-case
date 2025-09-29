'use client'

import { symbols } from '@/lib/constants'
import { useTokenStore } from '@/lib/store'

const MarketList = () => {
  const { selectedSymbol, setSelectedSymbol } = useTokenStore()
  return (
    <div className="flex items-center justify-between h-9 px-2 lg:px-4">
      {/* market sembol çubuğu - navbar altı */}
      <div className="flex items-center gap-2 lg:gap-4">
        {symbols.map((market) => (
          <span
            key={market.symbol}
            className={`border-r border-stone-600 pe-2 lg:pe-4 text-xs lg:text-sm select-none cursor-pointer last:border-0 transition-colors ${
              selectedSymbol === market.symbol
                ? 'text-rose-400 font-semibold'
                : 'hover:text-rose-300'
            }`}
            onClick={() => setSelectedSymbol(market.symbol)}
          >
            {market.label}
          </span>
        ))}
      </div>
      <div className="lg:hidden text-xs text-muted-foreground">Markets</div>
    </div>
  )
}

export default MarketList
