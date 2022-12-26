export type RoleType = "USER" | "ADMIN" | null

export interface UserType {
	id: string
	name: string
	email: string
	role: RoleType
}

export interface UserContextType {
	user: UserType | null
	setUser: Dispatch<SetStateAction<UserType | null>>
}

