import { Item } from "@prisma/client"
import Link from "next/link"
import React, { ChangeEvent, MouseEvent, useState } from "react"
import useShopContext from "../../../context/ShopState"
import useUserContext from "../../../context/UserState"
import CloudinaryImage from "../../CloudinaryImage"
import ItemQuantityForm from "../../ItemQuantityForm"

type Props = {
	item: Item
}

const ItemDisplay = ({ item }: Props) => {
	const { addItemToCart } = useShopContext()
	const { user } = useUserContext()
	const [quantity, setQuantity] = useState<number>(1)

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
							<ItemQuantityForm
								quantity={quantity}
								setQuantity={setQuantity}
								upperLimit={item.quantity}
							/>
							<button type="button" onClick={addItemToCartHandler}>
								Add To Cart
							</button>
						</>
					) : (
						<div>
							<p>
								<Link href="/auth" className="font-semibold">
									Sign In
								</Link>
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

