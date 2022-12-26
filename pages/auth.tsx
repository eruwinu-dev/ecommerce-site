import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import React from "react"

type Props = {}

const Auth = ({}: Props) => {
	return (
		<>
			<Head>
				<title>Sign In | SellerStop</title>
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

export default Auth

