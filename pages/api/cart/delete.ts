import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	deleted: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderId } = req.body
	const order = await prisma.order.delete({
		where: { id: orderId },
	})
	res.status(200).json({ deleted: Boolean(order) })
}

export default handler

