import { Item, Order } from "@prisma/client"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { ShopContextType } from "../types/shop"

type Props = {
	children: ReactNode
}

const ShopContext = createContext<ShopContextType | null>(null)

export const ShopProvider = ({ children }: Props) => {
	const [items, setItems] = useState<Item[]>([])
	const [orders, setOrders] = useState<Order[]>([])
	const [cart, setCart] = useState<
		(Order & {
			item: Item
		})[]
	>([])

	const getItems = (items: Item[]) => setItems(items)

	const getOrders = (orders: Order[]) => setOrders(orders)

	const getCart = (
		cart: (Order & {
			item: Item
		})[]
	) => setCart(cart)

	const addItemToCart = async (itemId: string, quantity: number, userId: string) => {
		let completed: boolean = false
		try {
			const result = await fetch("/api/cart/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ itemId, quantity, userId }),
			})
			const { order } = await result.json()
			if (!order) return
			const newCart = [...cart, order]
			getCart(newCart)
			completed = Boolean(order)
		} finally {
			if (!completed) return
		}
		return completed
	}

	const changeItemInCart = async (orderId: string, quantity: number) => {
		let completed: boolean = false
		try {
		} finally {
		}
		return completed
	}

	const findItem = (itemId: string) => items.find((item) => item.id === itemId)

	const checkoutCart = async (cartId: string) => {
		let newCartId: string = ""
		try {
		} finally {
		}
		return newCartId
	}

	const value: ShopContextType = {
		items,
		getItems,
		orders,
		cart,
		getCart,
		getOrders,
		addItemToCart,
		changeItemInCart,
		findItem,
		checkoutCart,
	}

	return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

const useShopContext = () => useContext(ShopContext) as ShopContextType

export default useShopContext

