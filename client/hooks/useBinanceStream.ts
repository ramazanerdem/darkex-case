// hooks/useBinanceStream.ts
import { useTokenStore } from '@/lib/store'
import { BinanceTradeData } from '@/types/trade.types'
import { useState, useEffect, useRef, useCallback } from 'react'

const useBinanceStream = () => {
  const { selectedSymbol, setTokenPrice } = useTokenStore()
  const THROTTLE_TIME = 3000 // 3 saniye

  // WebSocket objesini tutmak için useRef kullanıyoruz.
  const wsRef = useRef<WebSocket | null>(null)
  const lastUpdateRef = useRef(0)
  const currentSymbolRef = useRef<string>(selectedSymbol) // Güncel symbol'ı takip et
  const isConnectingRef = useRef<boolean>(false) // Bağlantı kurma durumunu takip et

  const [trade, setTrade] = useState<BinanceTradeData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  )

  // WebSocket bağlantısını güvenli şekilde kapat
  const closeConnection = useCallback((reason = 'Symbol değişimi') => {
    if (wsRef.current) {
      const ws = wsRef.current

      // Event handler'ları temizle (gereksiz state güncellemelerini önle)
      ws.onopen = null
      ws.onmessage = null
      ws.onerror = null
      ws.onclose = null

      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close(1000, reason) // Normal kapatma kodu
        console.log(`WebSocket bağlantısı kapatıldı: ${reason}`)
      }

      wsRef.current = null
    }

    // Bağlantı durumunu sıfırla
    setIsConnected(false)
    isConnectingRef.current = false
  }, [])

  // WebSocket bağlantısı kur
  const connectWebSocket = useCallback(
    async (symbol: string) => {
      // Eğer zaten bağlantı kuruluyorsa, bekle
      if (isConnectingRef.current) {
        console.log('Bağlantı zaten kuruluyor, bekleniyor...')
        return
      }

      // Güncel symbol referansını güncelle
      currentSymbolRef.current = symbol

      // State'leri sıfırla
      setIsLoading(true)
      setIsError(false)
      setError(null)
      setTrade(null)

      // Bağlantı kurma işlemini başlat
      isConnectingRef.current = true

      try {
        const newWsUrl = `wss://stream.binance.com:9443/ws/${symbol}@trade`
        console.log(`Yeni WebSocket bağlantısı kuruluyor: ${symbol}`)

        const ws = new WebSocket(newWsUrl)
        wsRef.current = ws

        ws.onopen = () => {
          // Sembol değişmişse bu bağlantıyı iptal et
          if (currentSymbolRef.current !== symbol) {
            console.log(`Sembol değişti, bağlantı iptal ediliyor: ${symbol}`)
            ws.close()
            return
          }

          console.log(`Binance WebSocket bağlantısı başarılı: ${symbol}`)
          setIsLoading(false)
          setIsConnected(true)
          isConnectingRef.current = false
        }

        ws.onmessage = (event) => {
          // Symbol değişmişse mesajları işleme
          if (currentSymbolRef.current !== symbol) {
            return
          }

          try {
            const data: BinanceTradeData = JSON.parse(event.data)

            if (data && data.p) {
              setTrade(data)

              const currentTime = Date.now()

              if (currentTime - lastUpdateRef.current > THROTTLE_TIME) {
                setTokenPrice?.(parseFloat(data.p))
                lastUpdateRef.current = currentTime
              }
            }
          } catch (e: unknown) {
            console.error('Veri ayrıştırılırken hata:', e)
            setIsError(true)
            const message =
              e instanceof Error ? e.message : 'Bilinmeyen bir hata oluştu.'
            setError({ type: 'Parsing Error', message })
          }
        }

        ws.onerror = (e) => {
          console.error('Binance WebSocket hatası:', e)
          setIsError(true)
          setError({
            type: 'Connection Error',
            message: 'WebSocket bağlantısında hata oluştu.',
          })
          setIsLoading(false)
          setIsConnected(false)
          isConnectingRef.current = false
        }

        ws.onclose = (event) => {
          console.log(
            `WebSocket bağlantısı kapandı: ${symbol}, Code: ${event.code}`
          )
          setIsConnected(false)
          isConnectingRef.current = false

          // Eğer beklenmeyen bir kapatma ise ve güncel symbol hala aynıysa
          if (event.code !== 1000 && currentSymbolRef.current === symbol) {
            setIsError(true)
            setError({
              type: 'Connection Closed',
              message: `Bağlantı beklenmedik şekilde kapandı. Code: ${event.code}`,
            })
          }
        }
      } catch (error) {
        console.error('WebSocket bağlantısı kurulurken hata:', error)
        setIsError(true)
        setError({
          type: 'Connection Error',
          message: 'WebSocket bağlantısı kurulamadı.',
        })
        setIsLoading(false)
        isConnectingRef.current = false
      }
    },
    [setTokenPrice]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Önce mevcut bağlantıyı kapat
    closeConnection('Symbol değişimi')

    // Kısa bir delay ile yeni bağlantıyı kur
    const timeoutId = setTimeout(() => {
      connectWebSocket(selectedSymbol)
    }, 100) // 100ms delay

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      closeConnection('Component unmount veya symbol değişimi')
    }
  }, [selectedSymbol, closeConnection, connectWebSocket])

  return { trade, isLoading, isError, error, isConnected }
}

export default useBinanceStream
