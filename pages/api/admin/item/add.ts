import prisma from "../../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { Item } from "@prisma/client"

type Data = {
	item: Item
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const values = req.body
	const item = await prisma.item.create({
		data: values,
	})
	res.status(200).json({ item })
}

export default handler

