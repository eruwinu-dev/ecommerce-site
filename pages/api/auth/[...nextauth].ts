import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/prisma"
import { NextApiHandler } from "next"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET || "",
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	events: {
		signIn: async (message) => {
			if (message.isNewUser) {
				await prisma.cart.create({
					data: {
						userId: message.user.id,
					},
				})
			}
		},
	},
}

