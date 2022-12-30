import React from "react"
import useShopContext from "../../../context/ShopState"
import BaseDialog from "../../BaseDialog"
import BaseDialogSpinner from "../../BaseDialog/BaseDialogSpinner"

type Props = {}

const AddItemToCartDialog = (props: Props) => {
	const {
		shopDialog: { addItemToCart: addItemToCartDialog },
		toggleShopDialog,
		shopAction: { addItemToCart: addItemToCartAction },
		toggleShopAction,
	} = useShopContext()

	const toggleAddItemToCartDialogHandler = () => {
		toggleShopDialog("addItemToCart")
		setTimeout(() => toggleShopAction("addItemToCart", "IDLE"), 500)
	}

	return (
		<BaseDialog isOpen={addItemToCartDialog} onClose={toggleAddItemToCartDialogHandler} title="Add Item to Cart">
			{addItemToCartAction === "IDLE" ? (
				<div></div>
			) : addItemToCartAction === "LOADING" ? (
				<div className="w-full flex flex-col items-center justify-center">
					<BaseDialogSpinner text="Adding item to cart" />
				</div>
			) : (
				<div className="w-full flex flex-col items-center justify-center">
					<h6>Item added to cart!</h6>
				</div>
			)}
		</BaseDialog>
	)
}

export default AddItemToCartDialog

