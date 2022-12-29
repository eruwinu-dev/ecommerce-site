import { Item } from "@prisma/client"
import Link from "next/link"
import React from "react"
import CloudinaryImage from "../../../../CloudinaryImage"

type Props = {
	item: Item
}

const ItemsGridItem = ({ item }: Props) => {
	return (
		<div className="w-full flex flex-col items-center justify-start">
			<Link href={`../item/${item.id}`} className="w-full h-auto aspect-square relative bg-gray-100">
				{item.images.length ? <CloudinaryImage src={item.images[0]} alt={item.name} /> : null}
			</Link>
			<div className="w-full mt-4 space-y-2 flex flex-col items-start justify-center">
				<h5>{item.name}</h5>
				<p>{item.description}</p>
			</div>
		</div>
	)
}

export default ItemsGridItem

