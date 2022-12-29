import { Item, Order } from "@prisma/client"
import Link from "next/link"
import React from "react"
import CloudinaryImage from "../../../../CloudinaryImage"

type Props = {
	order: Order & {
		item: Item
	}
}

const CartListItem = ({ order }: Props) => {
	return (
		<tr className="flex p-2">
			<td className="flex-[0.5]"></td>
			<td className="flex-[3]">
				<Link href={`../item/${order.itemId}`} className="grid grid-cols-4 grid-flow-row">
					<div>
						<div className="w-10/12 h-auto aspect-square relative">
							{order.item.images.length ? (
								<CloudinaryImage src={order.item.images[0]} alt={order.item.name} />
							) : null}
						</div>
					</div>
					<div className="col-span-3 flex flex-col items-start justify-center space-y-2">
						<h6>{order.item.name}</h6>
					</div>
				</Link>
			</td>
			<td className="flex-1 inline-flex items-center justify-center">{order.item.price}</td>
			<td className="flex-1 inline-flex items-center justify-center">{order.quantity}</td>
			<td className="flex-1 inline-flex items-center justify-center">{order.item.price * order.quantity}</td>
			<td className="flex-1 flex flex-col items-center justify-center">Actions</td>
		</tr>
	)
}

export default CartListItem

