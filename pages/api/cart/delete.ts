import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	deleted: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderIds } = req.body
	const orders = await prisma.order.deleteMany({
		where: {
			id: {
				in: orderIds,
			},
		},
	})
	res.status(200).json({ deleted: Boolean(orders) })
}

export default handler

