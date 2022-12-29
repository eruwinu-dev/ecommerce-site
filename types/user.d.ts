import { User } from "@prisma/client"

export interface UserContextType {
	user: User | null
	setUser: Dispatch<SetStateAction<UserType | null>>
}

