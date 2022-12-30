import { Item, Order } from "@prisma/client"
import React, { MouseEvent, useEffect, useState } from "react"
import useShopContext from "../../../context/ShopState"
import BaseDialog from "../../BaseDialog"
import BaseDialogSpinner from "../../BaseDialog/BaseDialogSpinner"

type Props = {}

const DeleteCartItemDialog = (props: Props) => {
	const {
		selectedCartItemIds,
		selectCartItems,
		findCartItem,
		shopDialog: { deleteCartItem: deleteCartItemDialog },
		toggleShopDialog,
		shopAction: { deleteCartItem: deleteCartItemAction },
		toggleShopAction,
		deleteItemInCart,
	} = useShopContext()

	const [cartItemsToDelete, setCartItemsToDelete] = useState<
		(Order & {
			item: Item
		})[]
	>([])

	useEffect(() => {
		let cartItems: (Order & {
			item: Item
		})[] = []
		selectedCartItemIds.forEach((cartItemId) => {
			const cartItem = findCartItem(cartItemId)
			if (!cartItem) return
			cartItems.push(cartItem)
		})
		setCartItemsToDelete(cartItems)
		return () => {}
	}, [selectedCartItemIds])

	const toggleDeleteCartItemDialogHandler = () => {
		toggleShopDialog("deleteCartItem")
		setTimeout(() => selectCartItems([]), 200)
		setTimeout(() => toggleShopAction("deleteCartItem", "IDLE"), 500)
	}

	const deleteItemInCartHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		if (!selectedCartItemIds.length) return
		const completed = await deleteItemInCart(selectedCartItemIds)
		if (!completed) return
	}

	return (
		<BaseDialog
			isOpen={deleteCartItemDialog}
			onClose={toggleDeleteCartItemDialogHandler}
			title={`Remove item${selectedCartItemIds.length < 2 ? `` : `s`} from cart?`}
		>
			{deleteCartItemAction === "IDLE" ? (
				<div className="w-full flex flex-col items-start justify-center">
					<p>Are you sure you want to remove the following items from your cart?</p>
					<ul className="list-disc space-y-1 ml-4 mt-2">
						{cartItemsToDelete.map((cartItem) => (
							<li key={cartItem.id}>
								{cartItem.item ? `${cartItem.item.name} (${cartItem.quantity})` : ""}
							</li>
						))}
					</ul>
					<div className="w-full mt-2 inline-flex items-center justify-end space-x-2">
						<button type="button" onClick={deleteItemInCartHandler} className="border-red-500 text-red-500">
							Remove
						</button>
						<button type="button" onClick={toggleDeleteCartItemDialogHandler}>
							Cancel
						</button>
					</div>
				</div>
			) : deleteCartItemAction === "LOADING" ? (
				<div className="w-full flex flex-col items-center justify-center">
					<BaseDialogSpinner text="Removing item from cart..." />
				</div>
			) : (
				<div className="w-full flex flex-col items-center justify-center">
					<h6>Removed item/s from cart!</h6>
				</div>
			)}
		</BaseDialog>
	)
}

export default DeleteCartItemDialog

