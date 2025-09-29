'use client'

import { symbols } from '@/lib/constants'
import { useTokenStore } from '@/lib/store'

const TokenList = () => {
  const { selectedSymbol, setSelectedSymbol } = useTokenStore()
  return (
    <div className="grid p-1 gap-1">
      {symbols.map((market) => (
        <div
          key={market.symbol}
          onClick={() => setSelectedSymbol(market.symbol)}
          className={`p-2 rounded-sm border border-stone-700 select-none cursor-pointer hover:bg-indigo-950/50 ${
            selectedSymbol === market.symbol
              ? 'text-rose-400'
              : 'hover:text-rose-300'
          }`}
        >
          <div className="space-y-3">
            <h3 className="font-bold text-sm">{market.label}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TokenList
