'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useTokenStore, useUserStore, useOrderStore } from '@/lib/store'
import { UUID } from 'crypto'
import { BuyOrderPayload } from '@/types/trade.types'
import { buyOrder } from '@/actions/trade-actions'

interface BuyOrderFormProps {
  userId: number | UUID | string
}

export function BuyOrderForm({ userId }: BuyOrderFormProps) {
  const { userBalance, decreaseUserBalance } = useUserStore()
  const { selectedSymbol, tokenPrice } = useTokenStore()
  const { addOrder } = useOrderStore()
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit')
  const [amount, setAmount] = useState<string>('')
  const [price, setPrice] = useState<string>(tokenPrice?.toString() || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const quickAmounts = [25, 50, 75, 100]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount greater than 0')
      return
    }

    // Price validation for limit orders
    if (orderType === 'limit') {
      if (!price || Number(price) <= 0) {
        toast.error('Please enter a valid price greater than 0')
        return
      }
    }

    // Calculate total cost based on order type
    const effectivePrice =
      orderType === 'limit' ? Number(price) : tokenPrice || 0
    const totalCost = Number(amount) * effectivePrice

    // Balance validation
    if (totalCost > userBalance.usdt) {
      toast.error('Insufficient USDT balance')
      return
    }

    if (effectivePrice <= 0) {
      toast.error('Invalid price data')
      return
    }

    setIsSubmitting(true)

    const payload: BuyOrderPayload = {
      userId: userId,
      amount: Number(amount),
      price: orderType === 'limit' ? Number(price) : tokenPrice || 0,
    }

    try {
      const res = await buyOrder(payload)
      if (!res.success) {
        throw new Error(res.error || 'Failed to place buy order')
      }

      // Add the new order to the store for immediate UI update
      if (res.order) {
        addOrder(res.order)
      }

      // Deduct balance after successful order
      decreaseUserBalance('usdt', totalCost)

      toast.success(
        `${orderType.toUpperCase()} buy order for ${amount} ${selectedSymbol
          .split('usdt')[0]
          .toUpperCase()} has been placed`
      )

      // Reset form
      setAmount('')
      if (orderType === 'limit') {
        setPrice('')
      }
    } catch (error) {
      console.error('Error placing buy order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateTotal = () => {
    const amountNum = amount ? Number(amount) : 0
    if (amountNum <= 0) return '0.00'

    let effectivePrice = 0
    if (orderType === 'limit') {
      effectivePrice = price ? Number(price) : 0
    } else {
      effectivePrice = tokenPrice || 0
    }

    if (effectivePrice <= 0) return '0.00'
    return (amountNum * effectivePrice).toFixed(2)
  }

  const handlePercentageChange = (percent: number) => {
    let effectivePrice = 0

    if (orderType === 'market') {
      effectivePrice = tokenPrice || 0
    } else {
      effectivePrice = Number(price) || 0
    }

    if (effectivePrice <= 0) {
      toast.error('Invalid price data for calculation')
      return
    }

    const maxAmount = userBalance.usdt / effectivePrice
    const calculatedAmount = (maxAmount * percent) / 100
    setAmount(calculatedAmount.toFixed(6))
  }

  return (
    <div className="h-full flex flex-col">
      {/* demo usdt bakiye */}
      <div className="p-3 lg:p-4 border-b border-border">
        <div className="space-y-2">
          <div className="flex justify-between text-sm lg:text-xs">
            <span className="text-muted-foreground">Available USDT</span>
            <span className="font-medium">
              {userBalance.usdt.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* emir formu */}
      <div className="flex-1">
        <Tabs
          value={orderType}
          onValueChange={(value: 'limit' | 'market') => setOrderType(value)}
          className="h-full flex flex-col"
        >
          <div className="border-b border-border">
            <TabsList className="p-0 grid w-full grid-cols-2 bg-stone-950 rounded-none">
              <TabsTrigger
                value="limit"
                className="text-sm lg:text-xs py-2 rounded-none"
              >
                LIMIT
              </TabsTrigger>
              <TabsTrigger
                value="market"
                className="text-sm lg:text-xs py-2 rounded-none"
              >
                MARKET
              </TabsTrigger>
            </TabsList>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* limit emir tabı */}
            <TabsContent
              value="limit"
              className="flex-1 p-3 lg:p-4 gap-3 lg:gap-4 m-0 flex flex-col"
            >
              {/* price input */}
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm lg:text-xs text-muted-foreground font-medium"
                >
                  {`PRICE (USDT)`}
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="text-base lg:text-sm h-12 lg:h-10"
                />
              </div>

              {/* amount input */}
              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm lg:text-xs text-muted-foreground font-medium"
                >
                  {`AMOUNT (${selectedSymbol.split('usdt')[0].toUpperCase()})`}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.000001"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.000000"
                  className="text-base lg:text-sm h-12 lg:h-10"
                />
              </div>

              {/* quick amount */}
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((percent) => (
                    <Button
                      key={percent}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 lg:h-6 text-sm lg:text-xs bg-transparent font-medium"
                      onClick={() => handlePercentageChange(percent)}
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>
              </div>

              {/* toplam tutar */}
              <div className="flex-1">
                <div className="p-4 lg:p-3 bg-accent/50 rounded border">
                  <div className="flex justify-between text-sm lg:text-xs">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold">
                      ${calculateTotal()} USDT
                    </span>
                  </div>
                </div>
              </div>
              {/* alış emir butonu */}
              <Button
                type="submit"
                className="w-full h-12 lg:h-10 rounded-sm bg-[#428068] hover:bg-[#428068]/90 text-white cursor-pointer text-base lg:text-sm font-semibold"
                disabled={isSubmitting || !amount || !price}
              >
                {isSubmitting
                  ? 'PLACING ORDER...'
                  : `${`BUY ${selectedSymbol.split('usdt')[0].toUpperCase()}`}`}
              </Button>
            </TabsContent>

            {/* market emir tabı */}
            <TabsContent
              value="market"
              className="flex-1 p-3 lg:p-4 space-y-3 lg:space-y-4 m-0 flex flex-col"
            >
              {/* amount input */}
              <div className="space-y-2">
                <Label
                  htmlFor="market-amount"
                  className="text-sm lg:text-xs text-muted-foreground font-medium"
                >
                  {`AMOUNT (${selectedSymbol.split('usdt')[0].toUpperCase()})`}
                </Label>
                <Input
                  id="market-amount"
                  type="number"
                  step="0.000001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.000000"
                  className="text-base lg:text-sm h-12 lg:h-10"
                />
              </div>

              {/* quick amount */}
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((percent) => (
                    <Button
                      key={percent}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 lg:h-6 text-sm lg:text-xs bg-transparent font-medium"
                      onClick={() => handlePercentageChange(percent)}
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>
              </div>

              {/* token market price */}
              <div className="flex-1">
                <div className="p-4 lg:p-3 bg-accent/50 rounded border">
                  <div className="flex justify-between text-sm lg:text-xs mb-2">
                    <span className="text-muted-foreground">Market Price</span>
                    <span className="font-semibold">
                      ${tokenPrice || '0.00'} USDT
                    </span>
                  </div>
                  <div className="flex justify-between text-sm lg:text-xs">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold">
                      ${calculateTotal()} USDT
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 lg:h-10 rounded-sm bg-[#428068] hover:bg-[#428068]/90 text-white cursor-pointer text-base lg:text-sm font-semibold"
                disabled={isSubmitting || !amount}
              >
                {isSubmitting
                  ? 'PLACING ORDER...'
                  : `BUY ${selectedSymbol.split('usdt')[0].toUpperCase()}`}
              </Button>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  )
}
