import { Item, Order } from "@prisma/client"
import React, { ChangeEvent, MouseEvent } from "react"
import useShopContext from "../../../../context/ShopState"
import getTotalPrice from "../../../../utils/getTotalPrice"
import CartListItem from "./CartListItem"

type Props = {}

const CartList = (props: Props) => {
	const { cart, selectedCartItemIds, selectCartItems, toggleShopDialog, findCartItem } = useShopContext()

	const selectedAllInCart = cart.length === selectedCartItemIds.length

	const selectAllInCartHandler = (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) => {
		if (selectedAllInCart) selectCartItems([])
		else {
			const cartIds: string[] = cart.map((order) => order.id)
			selectCartItems(cartIds)
		}
	}

	let cartItems: (Order & {
		item: Item
	})[] = []
	selectedCartItemIds.forEach((cartItemId) => {
		const cartItem = findCartItem(cartItemId)
		if (!cartItem) return
		cartItems.push(cartItem)
	})

	const openDeleteCartItemDialogHandler = (event: MouseEvent<HTMLButtonElement>) => toggleShopDialog("deleteCartItem")

	if (!cart.length)
		return (
			<div>
				<h3>You have no items in your cart.</h3>
			</div>
		)

	return (
		<table className="w-11/12 mt-4 min-h-[calc(93vh-1rem)] max-h-[calc(93vh-1rem)] overflow-y-auto">
			<thead>
				<tr className="flex">
					<th className="flex-[0.25]"></th>
					<th className="flex-[2]">Name</th>
					<th className="flex-1">Price</th>
					<th className="flex-1">Quantity</th>
					<th className="flex-1">Total Price</th>
					<th className="flex-1 inline-flex items-center justify-end">Actions</th>
				</tr>
			</thead>
			<tbody>
				{cart.map((order) => (
					<CartListItem order={order} key={order.itemId} />
				))}
			</tbody>
			<tfoot className="w-full sticky bottom-0 left-0">
				<tr className="bg-white py-8">
					<td className="flex-[0.25] inline-flex items-center justify-center">
						<input type="checkbox" checked={selectedAllInCart} onChange={selectAllInCartHandler} />
					</td>
					<td colSpan={5} className="flex-[6] w-full grid grid-cols-2 grid-flow-row p-2">
						<div className="w-full inline-flex items-center justify-start space-x-4">
							<div className="inline-flex items-center justify-center space-x-2">
								<div className="cursor-pointer" onClick={selectAllInCartHandler}>
									{selectedAllInCart ? `${cart.length} selected` : `Select All (${cart.length})`}
								</div>
							</div>
							{selectedCartItemIds.length ? (
								<button
									type="button"
									className="border-red-500 text-red-500"
									onClick={openDeleteCartItemDialogHandler}
								>
									Delete Selected
								</button>
							) : null}
						</div>
						<div className="inline-flex items-center justify-end space-x-8">
							<div>
								<span className="text-lg">Total Price: </span>
								<span className="text-lg font-semibold">{getTotalPrice(cartItems)}</span>
							</div>
							<button type="button" className="border-2 border-teal-500 text-teal-500">
								Check Out
							</button>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default CartList

