import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"

import prisma from "../prisma/prisma"
import { UserType } from "../types/user"

const getUser = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context)
	if (!session || !session.user) return null

	const email = session.user.email || ""

	const userDetails = await prisma.user.findUnique({
		where: { email },
	})

	if (!userDetails) return null

	const { createdAt, updatedAt, emailVerified, ...user } = userDetails

	return user as UserType
}

export default getUser

