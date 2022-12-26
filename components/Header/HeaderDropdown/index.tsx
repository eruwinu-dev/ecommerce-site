import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, MouseEvent } from "react"

import { signOut } from "next-auth/react"
import useUserContext from "../../../context/UserState"
import Link from "next/link"

type Props = {}

const HeaderDropdown = (props: Props) => {
	const { user } = useUserContext()

	const signOutHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		await signOut()
	}

	if (!user) return <></>

	return (
		<div className="dropdown-container">
			<Menu as="div" className="dropdown-menu">
				<div>
					<Menu.Button className="dropdown-button"></Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="dropdown-menu-items">
						<div className="dropdown-menu-group">
							<Menu.Item>
								<button className="font-normal text-sm p-2 text-left">
									Signed in as <br /> <div className="font-semibold mt-2">{user.name}</div>
									<div></div>
								</button>
							</Menu.Item>
						</div>
						<div className="dropdown-menu-group">
							<Menu.Item>
								{({ active }) => (
									<Link
										href="/cart"
										className={[
											"dropdown-menu-item",
											active ? "dropdown-menu-item-hover" : "",
										].join(" ")}
									>
										Cart
									</Link>
								)}
							</Menu.Item>
						</div>
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<Link
										href="/purchases"
										className={[
											"dropdown-menu-item",
											active ? "dropdown-menu-item-hover" : "",
										].join(" ")}
									>
										Purchases
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href="/settings"
										className={[
											"dropdown-menu-item",
											active ? "dropdown-menu-item-hover" : "",
										].join(" ")}
									>
										Settings
									</Link>
								)}
							</Menu.Item>
						</div>
						{user.role === "ADMIN" ? (
							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<Link
											href="/admin"
											className={[
												"dropdown-menu-item",
												active ? "dropdown-menu-item-hover" : "",
											].join(" ")}
										>
											Admin Dashboard
										</Link>
									)}
								</Menu.Item>
							</div>
						) : null}
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<button
										className={[
											"dropdown-menu-item",
											active ? "dropdown-menu-item-hover" : "",
										].join(" ")}
										onClick={signOutHandler}
									>
										Sign Out
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

export default HeaderDropdown

