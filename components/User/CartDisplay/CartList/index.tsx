import React from "react"
import useShopContext from "../../../../context/ShopState"
import CartListItem from "./CartListItem"

type Props = {}

const CartList = (props: Props) => {
	const { cart } = useShopContext()

	if (!cart.length)
		return (
			<div>
				<h3>You have no items in your cart.</h3>
			</div>
		)

	return (
		<table className="w-full mt-4">
			<thead>
				<tr className="flex">
					<th className="flex-[0.5]"></th>
					<th className="flex-[2]">Name</th>
					<th className="flex-1">Price</th>
					<th className="flex-1">Quantity</th>
					<th className="flex-1">Total Price</th>
					<th className="flex-1">Actions</th>
				</tr>
			</thead>
			<tbody>
				{cart.map((order) => (
					<CartListItem order={order} key={order.itemId} />
				))}
			</tbody>
		</table>
	)
}

export default CartList

