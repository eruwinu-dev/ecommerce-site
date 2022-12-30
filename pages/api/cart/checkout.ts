import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	updated: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderIds, status } = req.body
	const ordersForValidation = await prisma.order.updateMany({
		where: {
			id: {
				in: orderIds,
			},
		},
		data: {
			status,
		},
	})
	res.status(200).json({ updated: Boolean(ordersForValidation) })
}

export default handler

