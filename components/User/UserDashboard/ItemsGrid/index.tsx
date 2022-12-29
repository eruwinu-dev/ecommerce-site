import React from "react"
import useShopContext from "../../../../context/ShopState"
import ItemsGridItem from "./ItemsGridItem"

type Props = {}

const ItemsGrid = (props: Props) => {
	const { items } = useShopContext()
	return (
		<>
			<div className="w-full p-4 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-8">
				{items.map((item) => (
					<ItemsGridItem item={item} key={item.id} />
				))}
			</div>
		</>
	)
}

export default ItemsGrid

