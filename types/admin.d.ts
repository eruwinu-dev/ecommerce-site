import { Item } from "@prisma/client"

export interface ItemFormType {
	name: string
	description: string
	price: number
	quantity: number
	published: boolean
}

export interface AdminLoadingType {
	addItem: boolean
	editItem: boolean
	deleteItem: boolean
}

export interface AdminDialogType {
	addItem: boolean
	editItem: boolean
	deleteItem: boolean
}

export type AdminDialogKeyType = "addItem" | "editItem" | "deleteItem"

export interface AdminContextType {
	items: Item[]
	getItems: (items: Item[]) => void
	addItem: (values: ItemForm, files: File[], userId: string) => Promise<string | undefined>
	editItem: (values: ItemForm, files: File[]) => Promise<boolean | undefined>
	deleteItem: (id: string) => Promise<boolean | undefined>
	adminLoading: AdminLoadingType
	adminDialog: AdminDialogType
	toggleAdminDialog: (dialogKey: AdminDialogKeyType) => void
}

