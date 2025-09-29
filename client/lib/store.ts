import { create } from 'zustand'
import { Order } from '@/types/trade.types'

interface TokenState {
  selectedSymbol: string
  tokenPrice: number | null
  setSelectedSymbol: (symbol: string) => void
  setTokenPrice?: (price: number) => void
}

interface UserState {
  userBalance: {
    usdt: number
  }
  decreaseUserBalance: (
    currency: keyof UserState['userBalance'],
    amount: number
  ) => void
  increaseUserBalance: (
    currency: keyof UserState['userBalance'],
    amount: number
  ) => void
}

interface OrderState {
  orders: Order[]
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  removeOrder: (orderId: string | number) => void
}

export const useTokenStore = create<TokenState>((set) => ({
  selectedSymbol: 'btcusdt',
  tokenPrice: null,
  setSelectedSymbol: (symbol: string) => {
    console.log('setSelectedSymbol called with:', symbol)
    set({ selectedSymbol: symbol })
  },
  setTokenPrice: (price: number) => set({ tokenPrice: price }),
}))

export const useUserStore = create<UserState>((set) => ({
  userBalance: {
    usdt: 10000,
  },
  decreaseUserBalance: (
    currency: keyof UserState['userBalance'],
    amount: number
  ) =>
    set((state) => ({
      userBalance: {
        ...state.userBalance,
        [currency]: state.userBalance[currency] - amount,
      },
    })),
  increaseUserBalance: (
    currency: keyof UserState['userBalance'],
    amount: number
  ) =>
    set((state) => ({
      userBalance: {
        ...state.userBalance,
        [currency]: state.userBalance[currency] + amount,
      },
    })),
}))

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders: Order[]) => set({ orders }),
  addOrder: (order: Order) =>
    set((state) => ({ orders: [...state.orders, order] })),
  removeOrder: (orderId: string | number) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
    })),
}))
