import React, { ReactNode } from "react"
import { AdminProvider } from "../../context/AdminState"
import { ShopProvider } from "../../context/ShopState"
import { UserProvider } from "../../context/UserState"
import Header from "../Header"

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<UserProvider>
			<AdminProvider>
				<ShopProvider>
					<Header />
					<main>{children}</main>
				</ShopProvider>
			</AdminProvider>
		</UserProvider>
	)
}

export default Layout

