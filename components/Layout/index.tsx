import React, { ReactNode } from "react"
import { UserProvider } from "../../context/UserState"
import Header from "../Header"

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<UserProvider>
			<Header />
			<main>{children}</main>
		</UserProvider>
	)
}

export default Layout

