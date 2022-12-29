import { Item, Order, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import CartDisplay from "../components/User/CartDisplay"
import useShopContext from "../context/ShopState"
import useUserContext from "../context/UserState"
import getCart from "../lib/getCart"
import getUser from "../lib/getUser"

type Props = {
	user: User
	cart: (Order & {
		item: Item
	})[]
}

const Cart = ({ user, cart }: Props) => {
	const { setUser } = useUserContext()
	const { getCart } = useShopContext()
	const calledOnce = useRef(false)

	useEffect(() => {
		if (calledOnce.current) return
		else {
			setUser(user)
			getCart(cart)
			calledOnce.current = true
		}
		return () => {}
	}, [])

	return (
		<>
			<Head>
				<title>Cart | SellerStop</title>
			</Head>
			<section>
				<CartDisplay />
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

	const cart = await getCart(user.id)

	return {
		props: {
			user,
			cart,
		},
	}
}

export default Cart

