import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import useUserContext from "../context/UserState"
import getUser from "../lib/getUser"
import { UserType } from "../types/user"

type Props = {
	user: UserType
}

const Home = ({ user }: Props) => {
	const { setUser } = useUserContext()
	const calledOnce = useRef(false)

	useEffect(() => {
		if (calledOnce.current) return
		else {
			setUser(user)
			calledOnce.current = true
		}
		return () => {}
	}, [])

	return (
		<>
			<Head>
				<title>Home | SellerStop</title>
			</Head>
			<section>{JSON.stringify(user)}</section>
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
	return {
		props: {
			user,
		},
	}
}

export default Home

