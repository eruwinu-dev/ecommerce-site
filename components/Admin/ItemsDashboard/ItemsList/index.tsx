import React from "react"
import useAdminContext from "../../../../context/AdminState"
import ItemsListItem from "./ItemsListItem"

type Props = {}

const ItemsList = (props: Props) => {
	const { items } = useAdminContext()
	return (
		<div>
			{items.map((item) => (
				<ItemsListItem item={item} key={item.id} />
			))}
		</div>
	)
}

export default ItemsList

