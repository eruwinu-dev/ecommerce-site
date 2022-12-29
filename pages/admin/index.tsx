import { Item, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import ItemsDashboard from "../../components/Admin/ItemsDashboard"
import useAdminContext from "../../context/AdminState"
import useUserContext from "../../context/UserState"
import getItems from "../../lib/getItems"
import getUser from "../../lib/getUser"

type Props = {
	user: User
	items: Item[]
}

const Admin = ({ user, items }: Props) => {
	const { setUser } = useUserContext()
	const { getItems } = useAdminContext()
	const calledOnce = useRef(false)

	useEffect(() => {
		if (calledOnce.current) return
		else {
			setUser(user)
			getItems(items)
			calledOnce.current = true
		}
		return () => {}
	}, [])

	return (
		<>
			<Head>
				<title>Admin | SellerStop</title>
			</Head>
			<section className="grid grid-cols-2 grid-flow-row gap-4 min-h-fit">
				<div className="col-span-2 p-4">
					<span>
						Welcome, <span className="text-xl font-semibold">{user.name}</span>
					</span>
				</div>
				<ItemsDashboard />
				<div></div>
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
	if (user.role === "USER") {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		}
	}

	const items = await getItems(context, true)

	return {
		props: {
			user,
			items,
		},
	}
}

export default Admin

