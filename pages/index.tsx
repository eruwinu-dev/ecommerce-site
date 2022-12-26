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
			<section></section>
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

