import { Item, Order, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import UserDashboard from "../../components/User/UserDashboard"
import useShopContext from "../../context/ShopState"
import useUserContext from "../../context/UserState"
import getCart from "../../lib/getCart"
import getItems from "../../lib/getItems"
import getUser from "../../lib/getUser"

type Props = {
	user: User
	items: Item[]
	cart: (Order & {
		item: Item
	})[]
}

const Home = ({ user, items, cart }: Props) => {
	const { setUser } = useUserContext()
	const { getItems, getCart } = useShopContext()
	const calledOnce = useRef(false)

	useEffect(() => {
		if (calledOnce.current) return
		else {
			setUser(user)
			getItems(items)
			getCart(cart)
			calledOnce.current = true
		}
		return () => {}
	}, [])

	return (
		<>
			<Head>
				<title>Home | SellerStop</title>
			</Head>
			<section>
				<UserDashboard />
			</section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const user = await getUser(context)

	if (!user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	const items = await getItems(context, true)
	const cart = await getCart(user.id)

	return {
		props: {
			user,
			items,
			cart,
		},
	}
}

export default Home

