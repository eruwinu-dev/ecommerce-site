import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"

type Props = {
	quantity: number
	setQuantity: Dispatch<SetStateAction<number>>
	lowerLimit?: number
	upperLimit: number
}

const ItemQuantityForm = ({ quantity, setQuantity, lowerLimit = 1, upperLimit }: Props) => {
	const changeQuantityInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const inputQuantity = Number(event.target.value)
		if (inputQuantity < lowerLimit) setQuantity(lowerLimit)
		else if (inputQuantity > upperLimit) setQuantity(upperLimit)
		else setQuantity(inputQuantity)
	}

	const changeQuantityByButtonHandler = (direction: -1 | 1) => (event: MouseEvent<HTMLButtonElement>) => {
		if (quantity + direction < lowerLimit) return
		if (quantity + direction > upperLimit) return
		setQuantity((quantity) => quantity + direction)
	}

	return (
		<div className="lg:w-1/2 md:w-3/4 w-full inline-flex items-center justify-between">
			<div>Quantity</div>
			<div className="w-full inline-flex items-center justify-center">
				<button type="button" onClick={changeQuantityByButtonHandler(-1)}>
					-
				</button>
				<input type="number" value={quantity} onChange={changeQuantityInputHandler} />
				<button type="button" onClick={changeQuantityByButtonHandler(+1)}>
					+
				</button>
			</div>
		</div>
	)
}

export default ItemQuantityForm

