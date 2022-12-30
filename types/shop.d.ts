import { Item, Order } from "@prisma/client"
import { ActionType } from "./action"

export interface ShopAction {
	addItemToCart: ActionType
	updateCartItem: ActionType
	deleteCartItem: ActionType
	checkOutCart: ActionType
}

export interface ShopDialog {
	addItemToCart: boolean
	updateCartItem: boolean
	deleteCartItem: boolean
	checkOutCart: boolean
}

export interface ShopContextType {
	items: Item[]
	getItems: (items: Item[]) => void
	orders: Order[]
	getOrders: (
		orders: (Order & {
			item: Item
		})[]
	) => void
	cart: (Order & {
		item: Item
	})[]
	getCart: (
		cart: (Order & {
			item: Item
		})[]
	) => void
	selectedOrderIds: string[]
	selectOrders: (orderIds: string[]) => void
	selectedCartItemIds: string[]
	selectCartItems: (orderIds: string[]) => void
	addItemToCart: (itemId: string, quantity: number, userId: string) => Promise<boolean | undefined>
	changeItemInCart: (orderId: string, quantity: number) => Promise<boolean | undefined>
	deleteItemInCart: (orderIds: string[]) => Promise<boolean | undefined>
	findItem: (itemId: string) => Item | undefined
	findOrder: (orderId: string) =>
		| (Order & {
				item: Item
		  })
		| undefined
	findCartItem: (orderId: string) =>
		| (Order & {
				item: Item
		  })
		| undefined
	checkoutCart: (cartId: string) => Promise<string | undefined>
	shopAction: ShopAction
	toggleShopAction: (shopKey: keyof ShopAction, state: ActionType) => void
	shopDialog: ShopDialog
	toggleShopDialog: (dialogKey: keyof ShopDialog) => void
}

