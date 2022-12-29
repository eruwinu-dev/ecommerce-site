import React from "react"
import CartList from "./CartList"

type Props = {}

const CartDisplay = (props: Props) => {
	return (
		<div className="w-11/12 mx-auto flex flex-col items-center justify-center">
			<CartList />
		</div>
	)
}

export default CartDisplay

