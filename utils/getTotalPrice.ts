import { Item, Order } from "@prisma/client"

const getTotalPrice = (
	cart: (Order & {
		item: Item
	})[]
) => {
	if (!cart.length) return 0
	const cartItemTotalPrice = cart.map((cartItem) => (cartItem.item ? cartItem.item.price * cartItem.quantity : 0))
	const totalPrice = cartItemTotalPrice.reduce((acc, cartItem) => acc + cartItem)
	return totalPrice
}

export default getTotalPrice

