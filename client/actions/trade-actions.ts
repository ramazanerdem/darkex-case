'use server'

import { Order } from '@/types/trade.types'
import axios from 'axios'
import { UUID } from 'crypto'

export const getOrders = async () => {
  try {
    const { data, status } = await axios.get('http://localhost:3001/orders')
    if (status !== 200) {
      throw new Error('Network response was not ok')
    }
    const orders: Order[] = data
    return { success: true, orders }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return { success: false, error: 'Failed to fetch orders' }
  }
}

export const buyOrder = async (order: {
  userId: UUID | number | string
  amount: number
  price: number
}) => {
  try {
    const uuid = crypto.randomUUID()
    const { data, status } = await axios.post('http://localhost:3001/orders', {
      ...order,
      id: uuid,
    })
    if (status !== 201) {
      throw new Error('Network response was not ok')
    }
    // revalidatePath('/markets')
    // zustandle clientte çözdük
    return { success: true, order: data }
  } catch (error) {
    console.error('Error placing buy order:', error)
    return { success: false, error: 'Failed to place buy order' }
  }
}

export const cancelOrder = async (orderId: number | UUID) => {
  try {
    const { data, status } = await axios.delete(
      `http://localhost:3001/orders/${orderId}`
    )
    if (status !== 200) {
      throw new Error('Network response was not ok')
    }
    // revalidatePath('/markets')
    return { success: true, order: data }
  } catch (error) {
    console.error('Error cancelling order:', error)
    return { success: false, error: 'Failed to cancel order' }
  }
}
