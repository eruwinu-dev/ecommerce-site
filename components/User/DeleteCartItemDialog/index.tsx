import React, { MouseEvent } from "react"
import useShopContext from "../../../context/ShopState"
import BaseDialog from "../../BaseDialog"
import BaseDialogSpinner from "../../BaseDialog/BaseDialogSpinner"

type Props = {}

const DeleteCartItemDialog = (props: Props) => {
	const {
		selectedCartItemId,
		selectCartItem,
		findCartItem,
		shopDialog: { deleteCartItem: deleteCartItemDialog },
		toggleShopDialog,
		shopAction: { deleteCartItem: deleteCartItemAction },
		toggleShopAction,
		deleteItemInCart,
	} = useShopContext()

	const toggleDeleteCartItemDialogHandler = () => {
		toggleShopDialog("deleteCartItem")
		setTimeout(() => toggleShopAction("deleteCartItem", "IDLE"), 150)
	}

	const deleteItemInCartHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		if (!selectedCartItemId) return
		const completed = await deleteItemInCart(selectedCartItemId)
		if (!completed) return
		selectCartItem(null)
	}

	const selectedCartItem = selectedCartItemId ? findCartItem(selectedCartItemId) : undefined

	if (!selectedCartItem) return <></>

	return (
		<BaseDialog
			isOpen={deleteCartItemDialog}
			onClose={toggleDeleteCartItemDialogHandler}
			title="Remove item from cart?"
		>
			{deleteCartItemAction === "IDLE" ? (
				<div className="w-full flex flex-col items-start justify-center">
					<p>
						Are you sure you want to remove{" "}
						<span className="font-semibold">{selectedCartItem.item ? selectedCartItem.item.name : ""}</span>{" "}
						from your cart?
					</p>
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
					<h6>Removed item from cart!</h6>
				</div>
			)}
		</BaseDialog>
	)
}

export default DeleteCartItemDialog

