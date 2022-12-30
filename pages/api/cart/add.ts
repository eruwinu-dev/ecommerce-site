import prisma from "../../../prisma/prisma"
import crypto from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { Order } from "@prisma/client"

type Data = {
	order: Order
	newItem: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { itemId, quantity, userId } = req.body
	const cart = await prisma.order.findMany({
		where: {
			userId,
			status: "CART",
		},
	})
	if (!cart.length) {
		const order = await prisma.order.create({
			data: {
				itemId,
				quantity,
				userId,
				status: "CART",
				groupId: crypto.randomUUID(),
			},
		})
		res.status(200).json({ order, newItem: true })
	} else {
		const cartItem = cart.find((order) => order.itemId === itemId && order.status === "CART")
		if (cartItem) {
			const order = await prisma.order.update({
				where: { id: cartItem.id },
				data: {
					quantity: cartItem.quantity + quantity,
				},
			})
			res.status(200).json({ order, newItem: false })
		} else {
			const order = await prisma.order.create({
				data: {
					itemId,
					quantity,
					userId,
					status: "CART",
					groupId: cart[0].groupId,
				},
			})
			res.status(200).json({ order, newItem: true })
		}
	}
}

export default handler

