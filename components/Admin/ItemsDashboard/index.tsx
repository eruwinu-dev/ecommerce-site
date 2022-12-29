import React, { MouseEvent } from "react"
import useAdminContext from "../../../context/AdminState"
import AddItemDialog from "../AddItemDialog"
import ItemsList from "./ItemsList"

type Props = {}

const ItemsDashboard = (props: Props) => {
	const { toggleAdminDialog } = useAdminContext()

	const openAddItemDialogHandler = (event: MouseEvent<HTMLButtonElement>) => toggleAdminDialog("addItem")

	return (
		<>
			<div className="grid grid-cols-1 grid-flow-row gap-4 p-4">
				<div className="flex flex-row items-center justify-between">
					<h5>Items</h5>
					<button type="button" onClick={openAddItemDialogHandler}>
						Add Item
					</button>
				</div>
				<div>
					<ItemsList />
				</div>
			</div>
			<AddItemDialog />
		</>
	)
}

export default ItemsDashboard

