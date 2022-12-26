import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import useUserContext from "../../context/UserState"
import HeaderDropdown from "./HeaderDropdown"

type Props = {}

const Header = (props: Props) => {
	const { user } = useUserContext()
	const { pathname } = useRouter()
	return (
		<header>
			<nav>
				<div></div>
				<div>
					<Link href="/">SellerStop</Link>
				</div>
				<div>
					{["/auth"].includes(pathname) ? null : user ? (
						<HeaderDropdown />
					) : (
						<Link href="/auth" className="px-2 py-1.5 rounded-lg text-sm font-semibold">
							Sign In
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header

