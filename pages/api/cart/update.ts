import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { Item, Order } from "@prisma/client"

type Data = {
	newOrder: Order & {
		item: Item
	}
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderId, quantity } = req.body
	const newOrder = await prisma.order.update({
		where: {
			id: orderId,
		},
		data: {
			quantity,
		},
		include: {
			item: true,
		},
	})
	res.status(200).json({ newOrder })
}

export default handler

