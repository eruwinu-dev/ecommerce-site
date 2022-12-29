import prisma from "../../../prisma/prisma"
import crypto from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { Order } from "@prisma/client"

type Data = {
	order: Order
	message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { itemId, quantity, userId } = req.body
	const cartItem = await prisma.order.findFirst({
		where: {
			userId,
			status: "CART",
		},
	})
	if (!cartItem) {
		const order = await prisma.order.create({
			data: {
				itemId,
				quantity,
				userId,
				status: "CART",
				groupId: crypto.randomUUID(),
			},
		})
		res.status(200).json({ order, message: "Added new item" })
	} else {
		if (cartItem.status === "CART" && cartItem.itemId === itemId) {
			const order = await prisma.order.update({
				where: { id: cartItem.id },
				data: {
					quantity: cartItem.quantity + quantity,
				},
			})
			res.status(200).json({ order, message: "Added more quantity to item" })
		} else {
			const order = await prisma.order.create({
				data: {
					itemId,
					quantity,
					userId,
					status: "CART",
					groupId: cartItem.groupId,
				},
			})
			res.status(200).json({ order, message: "Has cart, but not the item" })
		}
	}
}

export default handler

