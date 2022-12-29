import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"

import prisma from "../prisma/prisma"

const getItems = async (context: GetServerSidePropsContext, published: boolean = false) => {
	const session = await getSession(context)
	if (!session) return []

	const items = await prisma.item.findMany({
		where: { published },
	})

	const orders = await prisma.order.groupBy({
		by: ["groupId"],
		where: {
			status: {
				in: ["DELIVERED", "SHIPMENT"],
			},
		},
	})

	return items
}

export default getItems

