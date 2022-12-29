import prisma from "../prisma/prisma"

const getItem = async (itemId: string) => {
	const item = await prisma.item.findUnique({
		where: {
			id: itemId,
		},
		include: {
			order: true,
		},
	})
	return item
}

export default getItem

