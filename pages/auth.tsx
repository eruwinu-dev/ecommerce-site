import { GetServerSideProps } from "next"
import { getSession, signIn } from "next-auth/react"
import Head from "next/head"
import React, { MouseEvent } from "react"

type Props = {}

const Auth = ({}: Props) => {
	const signInHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		await signIn("google")
	}
	return (
		<>
			<Head>
				<title>Sign In | SellerStop</title>
			</Head>
			<section className="items-center justify-start">
				<div className="mt-[20vh] mx-auto w-9/12 flex flex-col items-center justify-center space-y-4">
					<h3>Online shopping but make it fun.</h3>
					<button type="button" onClick={signInHandler} className="inline-flex space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
						</svg>
						<span className="ml-2">Google Sign In</span>
					</button>
				</div>
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

export default Auth

