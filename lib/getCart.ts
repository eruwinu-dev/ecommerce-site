import prisma from "../prisma/prisma"

const getCart = async (userId: string) => {
	if (!userId) return []
	const items = await prisma.order.findMany({
		where: {
			userId,
			status: "CART",
		},
		include: {
			item: true,
		},
	})
	return items
}

export default getCart

