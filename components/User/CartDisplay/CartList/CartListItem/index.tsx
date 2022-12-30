import { Item, Order } from "@prisma/client"
import Link from "next/link"
import React, { ChangeEvent, MouseEvent } from "react"
import useShopContext from "../../../../../context/ShopState"
import { ShopDialog } from "../../../../../types/shop"
import CloudinaryImage from "../../../../CloudinaryImage"

type Props = {
	order: Order & {
		item: Item
	}
}

const CartListItem = ({ order }: Props) => {
	const { toggleShopDialog, selectCartItems, selectedCartItemIds, shopDialog } = useShopContext()

	const openShopDialogHandler = (dialogKey: keyof ShopDialog) => (event: MouseEvent<HTMLButtonElement>) => {
		selectCartItems([order.id])
		toggleShopDialog(dialogKey)
	}

	const toggleSelectCartItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (selectedCartItemIds.includes(order.id))
			selectCartItems(selectedCartItemIds.filter((itemId) => itemId !== order.id))
		else selectCartItems([...selectedCartItemIds, order.id])
	}

	return (
		<tr className="flex p-4">
			<td className="flex-[0.25] inline-flex items-center justify-center">
				<input
					type="checkbox"
					checked={selectedCartItemIds.includes(order.id)}
					onChange={toggleSelectCartItemHandler}
				/>
			</td>
			<td className="flex-[2]">
				<Link href={`../item/${order.itemId}`} className="grid grid-cols-4 grid-flow-row">
					<div>
						<div className="w-10/12 h-auto aspect-square relative">
							{order.item && order.item.images.length ? (
								<CloudinaryImage src={order.item.images[0]} alt={order.item.name} />
							) : null}
						</div>
					</div>
					<div className="col-span-3 flex flex-col items-start justify-center space-y-2">
						<h6>{order.item ? order.item.name : ""}</h6>
					</div>
				</Link>
			</td>
			<td className="flex-1 inline-flex items-center justify-center">{order.item ? order.item.price : 0}</td>
			<td className="flex-1 inline-flex items-center justify-center space-x-2">
				<div>{order.quantity}</div>
				<button
					type="button"
					className="border-blue-500 text-blue-500"
					onClick={openShopDialogHandler("updateCartItem")}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
						<path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
					</svg>
				</button>
			</td>
			<td className="flex-1 inline-flex items-center justify-center space-x-2">
				{order.item ? order.item.price * order.quantity : 0}
			</td>
			<td className="flex-1 inline-flex items-center justify-end">
				<button
					type="button"
					className="border-red-500 text-red-500"
					onClick={openShopDialogHandler("deleteCartItem")}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
						<path
							fillRule="evenodd"
							d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</td>
		</tr>
	)
}

export default CartListItem

