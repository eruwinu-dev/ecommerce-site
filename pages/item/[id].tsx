import { Item, Order, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import React, { useEffect, useRef } from "react"
import AddItemToCartDialog from "../../components/User/AddItemToCartDialog"
import ItemDisplay from "../../components/User/ItemDisplay"
import useShopContext from "../../context/ShopState"
import useUserContext from "../../context/UserState"
import getCart from "../../lib/getCart"
import getItem from "../../lib/getItem"
import getUser from "../../lib/getUser"

type Props = {
	user: User
	item: Item
	cart: (Order & {
		item: Item
	})[]
}

interface StaticParams extends ParsedUrlQuery {
	id: string
}

const Item = ({ user, item, cart }: Props) => {
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
				<title>{`${item.name} - ${item.description}`}</title>
			</Head>
			<section>
				<ItemDisplay item={item} />
				<AddItemToCartDialog />
			</section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id = "" } = context.params as StaticParams
	const user = await getUser(context)
	const item = await getItem(id)

	const cart = await getCart(user ? user.id : "")

	return {
		props: {
			user,
			item,
			cart,
		},
	}
}

export default Item

