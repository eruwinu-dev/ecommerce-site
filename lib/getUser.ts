import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"

import prisma from "../prisma/prisma"

const getUser = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context)
	if (!session || !session.user) return null

	const email = session.user.email || ""

	const user = await prisma.user.findUnique({
		where: { email },
	})

	return user
}

export default getUser

