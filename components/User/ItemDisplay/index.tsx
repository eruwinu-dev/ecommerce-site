import { Item } from "@prisma/client"
import Link from "next/link"
import React, { ChangeEvent, MouseEvent, useState } from "react"
import useShopContext from "../../../context/ShopState"
import useUserContext from "../../../context/UserState"
import CloudinaryImage from "../../CloudinaryImage"

type Props = {
	item: Item
}

const ItemDisplay = ({ item }: Props) => {
	const { addItemToCart } = useShopContext()
	const { user } = useUserContext()
	const [quantity, setQuanity] = useState<number>(1)

	const changeQuantityInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const inputQuantity = Number(event.target.value)
		if (inputQuantity < 1) setQuanity(1)
		else if (inputQuantity > item.quantity) setQuanity(item.quantity)
		else setQuanity(inputQuantity)
	}

	const changeQuantityByButtonHandler = (direction: -1 | 1) => (event: MouseEvent<HTMLButtonElement>) => {
		if (quantity + direction < 1) return
		if (quantity + direction > item.quantity) return
		setQuanity((quantity) => quantity + direction)
	}

	const addItemToCartHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		if (!user) return
		await addItemToCart(item.id, quantity, user.id)
	}

	return (
		<div className="w-10/12 mx-auto flex flex-col items-center justify-start pt-[5vh]">
			<div className="w-full grid grid-cols-2 grid-flow-row">
				<div className="flex flex-col items-center">
					<div className="w-8/12 h-auto aspect-square relative">
						{item.images.length ? (
							<CloudinaryImage
								src={item.images[0]}
								alt={item.name}
								className="object-cover object-center"
							/>
						) : null}
					</div>
				</div>
				<div className="flex flex-col items-start justify-start space-y-4">
					<h1>{item.name}</h1>
					<p>{item.description}</p>
					<p>{`${item.quantity} in stock`}</p>
					{user ? (
						<>
							<div className="lg:w-1/2 md:w-3/4 w-full inline-flex items-center justify-between">
								<div>Quantity</div>
								<div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-1/2 inline-flex items-center justify-center">
									<button type="button" onClick={changeQuantityByButtonHandler(-1)}>
										-
									</button>
									<input type="number" value={quantity} onChange={changeQuantityInputHandler} />
									<button type="button" onClick={changeQuantityByButtonHandler(+1)}>
										+
									</button>
								</div>
							</div>
							<button type="button" onClick={addItemToCartHandler}>
								Add To Cart
							</button>
						</>
					) : (
						<div>
							<p>
								<Link href="/auth" className="font-semibold">
									Sign In
								</Link>{" "}
								to add this item to your cart.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ItemDisplay

