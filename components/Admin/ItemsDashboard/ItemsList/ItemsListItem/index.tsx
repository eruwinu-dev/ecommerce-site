import { Item } from "@prisma/client"
import React from "react"

type Props = {
	item: Item
}

const ItemsListItem = ({ item }: Props) => {
	return <div>{JSON.stringify(item)}</div>
}

export default ItemsListItem

