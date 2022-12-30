import { Item, Order } from "@prisma/client"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { ActionType } from "../types/action"
import { ShopAction, ShopContextType, ShopDialog } from "../types/shop"

type Props = {
	children: ReactNode
}

const initialShopAction: ShopAction = {
	addItemToCart: "IDLE",
	updateCartItem: "IDLE",
	deleteCartItem: "IDLE",
	checkOutCart: "IDLE",
}

const initialShopDialog: ShopDialog = {
	addItemToCart: false,
	updateCartItem: false,
	deleteCartItem: false,
	checkOutCart: false,
}

const ShopContext = createContext<ShopContextType | null>(null)

export const ShopProvider = ({ children }: Props) => {
	const [items, setItems] = useState<Item[]>([])
	const [orders, setOrders] = useState<
		(Order & {
			item: Item
		})[]
	>([])
	const [cart, setCart] = useState<
		(Order & {
			item: Item
		})[]
	>([])
	const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])
	const [selectedCartItemIds, setSelectedCartItemIds] = useState<string[]>([])
	const [shopAction, setShopAction] = useState<ShopAction>(initialShopAction)
	const [shopDialog, setShopDialog] = useState<ShopDialog>(initialShopDialog)

	const getItems = (items: Item[]) => setItems(items)

	const getOrders = (
		orders: (Order & {
			item: Item
		})[]
	) => setOrders(orders)

	const getCart = (
		cart: (Order & {
			item: Item
		})[]
	) => setCart(cart)

	const addItemToCart = async (itemId: string, quantity: number, userId: string) => {
		let completed: boolean = false
		toggleShopAction("addItemToCart", "LOADING")
		toggleShopDialog("addItemToCart")
		try {
			const result = await fetch("/api/cart/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ itemId, quantity, userId }),
			})
			const { order, newItem } = await result.json()
			if (!order) return
			const newCart = newItem
				? [...cart, order]
				: cart.map((orderItem) => (orderItem.id === order.id ? order : orderItem))
			getCart(newCart)
			completed = Boolean(order)
		} finally {
			if (!completed) return
			toggleShopAction("addItemToCart", "SUCCESS")
		}
		return completed
	}

	const changeItemInCart = async (orderId: string, quantity: number) => {
		let completed: boolean = false
		toggleShopAction("updateCartItem", "LOADING")
		try {
			const result = await fetch("/api/cart/update", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orderId, quantity }),
			})
			const { newOrder } = await result.json()
			if (!newOrder) return
			const newCart = cart.map((order) => (order.id === newOrder.id ? newOrder : order))
			completed = Boolean(newOrder)
			setCart(newCart)
		} finally {
			if (!completed) return
			toggleShopAction("updateCartItem", "SUCCESS")
		}
		return completed
	}

	const deleteItemInCart = async (orderIds: string[]) => {
		let completed: boolean = false
		toggleShopAction("deleteCartItem", "LOADING")
		try {
			const result = await fetch("/api/cart/delete", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orderIds }),
			})
			const { deleted } = await result.json()
			completed = deleted
			const newCart = cart.filter((order) => !orderIds.includes(order.id))
			setCart(newCart)
		} finally {
			if (!completed) return
			toggleShopAction("deleteCartItem", "SUCCESS")
		}
		return completed
	}

	const selectOrders = (orderIds: string[]) => setSelectedOrderIds(orderIds)

	const selectCartItems = (orderIds: string[]) => setSelectedCartItemIds(orderIds)

	const findItem = (itemId: string) => items.find((item) => item.id === itemId)

	const findOrder = (orderId: string) => orders.find((order) => order.id === orderId)

	const findCartItem = (orderId: string) => cart.find((order) => order.id === orderId)

	const checkoutCart = async (cartId: string) => {
		let newCartId: string = ""
		try {
		} finally {
		}
		return newCartId
	}

	const toggleShopAction = (shopKey: keyof ShopAction, state: ActionType) =>
		setShopAction((shopAction) => ({ ...shopAction, [shopKey]: state }))

	const toggleShopDialog = (dialogKey: keyof ShopDialog) =>
		setShopDialog((dialog) => ({ ...dialog, [dialogKey]: !dialog[dialogKey] }))

	const value: ShopContextType = {
		items,
		getItems,
		orders,
		cart,
		getCart,
		getOrders,
		selectedOrderIds,
		selectOrders,
		selectedCartItemIds,
		selectCartItems,
		addItemToCart,
		changeItemInCart,
		deleteItemInCart,
		findOrder,
		findItem,
		findCartItem,
		checkoutCart,
		shopAction,
		toggleShopAction,
		shopDialog,
		toggleShopDialog,
	}

	return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

const useShopContext = () => useContext(ShopContext) as ShopContextType

export default useShopContext

