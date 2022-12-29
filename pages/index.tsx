import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import React from "react"

type Props = {}

const Landing = ({}: Props) => {
	return (
		<>
			<Head>
				<title>SellerStop</title>
			</Head>
			<section className="grid grid-cols-2 grid-flow-row">
				<div className="flex flex-col items-start justify-center p-8 space-y-6">
					<h1 className="text-left">Shop from your phone, receive at your home.</h1>
					<p>Buy items from the SellerStop platform!</p>
				</div>
				<div></div>
			</section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (!session) {
		return {
			props: {
				user: null,
			},
		}
	}
	return {
		redirect: {
			destination: "/home",
			permanent: false,
		},
	}
}
export default Landing

