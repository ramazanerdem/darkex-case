'use client'
import { useTokenStore } from '@/lib/store'
import React, { useEffect, useRef, memo } from 'react'

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  const selectedSymbol = useTokenStore((state) => state.selectedSymbol)

  const tradingViewSymbol = `BINANCE:${selectedSymbol.toUpperCase()}`

  useEffect(() => {
    const element = container.current
    if (element) {
      element.innerHTML = ''
    }
    if (element) {
      scriptLoaded.current = true
      const script = document.createElement('script')
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = JSON.stringify({
        allow_symbol_change: true,
        calendar: false,
        details: false,
        hide_side_toolbar: true,
        hide_top_toolbar: false,
        hide_legend: false,
        hide_volume: false,
        hotlist: false,
        interval: 'D',
        locale: 'en',
        save_image: true,
        style: '1',
        symbol: tradingViewSymbol,
        theme: 'dark',
        timezone: 'Etc/UTC',
        backgroundColor: '#000',
        gridColor: '#212121',
        watchlist: [],
        withdateranges: false,
        compareSymbols: [],
        studies: [],
        autosize: true,
      })
      element.appendChild(script)
      return () => {
        if (element) {
          const scripts = element.querySelectorAll('script')
          scripts.forEach((s) => s.remove())

          element.innerHTML = ''
          scriptLoaded.current = false
        }
      }
    }
  }, [selectedSymbol, tradingViewSymbol])
  return (
    <div
      className="tradingview-widget-container relative z-10"
      ref={container}
      style={{ height: '100%', width: '100%' }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      ></div>
    </div>
  )
}

export default memo(TradingViewWidget)
