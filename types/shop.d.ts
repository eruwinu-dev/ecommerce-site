import { Item, Order } from "@prisma/client"

export interface ShopContextType {
	items: Item[]
	getItems: (items: Item[]) => void
	orders: Order[]
	getOrders: (orders: Order[]) => void
	cart: (Order & {
		item: Item
	})[]
	getCart: (
		cart: (Order & {
			item: Item
		})[]
	) => void
	addItemToCart: (itemId: string, quantity: number, userId: string) => Promise<boolean | undefined>
	changeItemInCart: (orderId: string, quantity: number) => Promise<boolean | undefined>
	findItem: (itemId: string) => Item | undefined
	checkoutCart: (cartId: string) => Promise<string | undefined>
}

