import React, { MouseEvent, useEffect, useState } from "react"
import useShopContext from "../../../context/ShopState"
import BaseDialog from "../../BaseDialog"
import BaseDialogSpinner from "../../BaseDialog/BaseDialogSpinner"
import ItemQuantityForm from "../../ItemQuantityForm"

type Props = {}

const UpdateCartItemDialog = (props: Props) => {
	const {
		shopDialog: { updateCartItem: updateCartItemDialog },
		toggleShopDialog,
		shopAction: { updateCartItem: updateCartItemAction },
		toggleShopAction,
		selectedCartItemId,
		findCartItem,
		changeItemInCart,
	} = useShopContext()

	const [quantity, setQuantity] = useState<number>(0)

	const selectedCartItem = selectedCartItemId ? findCartItem(selectedCartItemId) : undefined

	const updateCartItemHandler = async (event: MouseEvent) => {
		if (!selectedCartItemId) return
		await changeItemInCart(selectedCartItemId, quantity)
	}

	const toggleUpdateCartItemDialogHandler = () => {
		toggleShopDialog("updateCartItem")
		setTimeout(() => toggleShopAction("updateCartItem", "IDLE"), 150)
	}

	useEffect(() => {
		if (!selectedCartItem) return
		setQuantity(selectedCartItem.quantity)
		return () => {}
	}, [selectedCartItem])

	if (!selectedCartItem) return <></>

	return (
		<BaseDialog
			isOpen={updateCartItemDialog}
			onClose={toggleUpdateCartItemDialogHandler}
			title="Change Item Quantity"
		>
			{updateCartItemAction === "IDLE" ? (
				<div className="w-full flex flex-col items-center justify-center">
					<ItemQuantityForm
						quantity={quantity}
						setQuantity={setQuantity}
						upperLimit={selectedCartItem.item.quantity}
					/>
					<div className="w-full mt-2 inline-flex items-center justify-end space-x-2">
						<button type="button" onClick={updateCartItemHandler} className="border-blue-500 text-blue-500">
							Update
						</button>
						<button type="button" onClick={toggleUpdateCartItemDialogHandler}>
							Cancel
						</button>
					</div>
				</div>
			) : updateCartItemAction === "LOADING" ? (
				<div className="w-full flex flex-col items-center justify-center">
					<BaseDialogSpinner text="Updating item quantity..." />
				</div>
			) : (
				<div className="w-full flex flex-col items-center justify-center">
					<h6>Changed item quantity!</h6>
				</div>
			)}
		</BaseDialog>
	)
}

export default UpdateCartItemDialog

