import { Item } from "@prisma/client"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { AdminContextType, AdminDialogKeyType, AdminDialogType, AdminLoadingType, ItemFormType } from "../types/admin"
import imageUpload from "../utils/imageUpload"

type Props = {
	children: ReactNode
}

const adminLoadingInitial: AdminLoadingType = {
	addItem: false,
	editItem: false,
	deleteItem: false,
}

const adminDialogInitial: AdminDialogType = {
	addItem: false,
	editItem: false,
	deleteItem: false,
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: Props) => {
	const [items, setItems] = useState<Item[]>([])

	const [adminLoading, setAdminLoading] = useState<AdminLoadingType>(adminLoadingInitial)
	const [adminDialog, setAdminDialog] = useState<AdminDialogType>(adminDialogInitial)

	const getItems = (items: Item[]) => setItems(items)

	const addItem = async (values: ItemFormType, files: File[], userId: string) => {
		let itemId: string = ""
		let images: string[] = []
		toggleAdminLoading("addItem")
		try {
			images = await Promise.all(files.map((file) => imageUpload(file)))
			const result = await fetch("/api/admin/item/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...values, images, userId }),
			})
			const { item: newItem } = await result.json()
			itemId = newItem.id
			setItems((items) => [...items, newItem])
		} finally {
			if (!itemId) return
			toggleAdminLoading("addItem")
			toggleAdminDialog("addItem")
		}
		return itemId
	}

	const editItem = async (values: ItemFormType, files: File[]) => {
		let completed: boolean = false
		try {
		} finally {
		}
		return completed
	}

	const deleteItem = async (id: string) => {
		let completed: boolean = false
		try {
		} finally {
		}
		return completed
	}

	const toggleAdminLoading = (loadingKey: keyof AdminLoadingType) =>
		setAdminLoading((loading) => ({ ...loading, [loadingKey]: !loading[loadingKey as keyof AdminLoadingType] }))

	const toggleAdminDialog = (dialogKey: AdminDialogKeyType) =>
		setAdminDialog((dialog) => ({ ...dialog, [dialogKey]: !dialog[dialogKey] }))

	const value: AdminContextType = {
		items,
		getItems,
		addItem,
		editItem,
		deleteItem,
		adminLoading,
		adminDialog,
		toggleAdminDialog,
	}

	return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

const useAdminContext = () => useContext(AdminContext) as AdminContextType

export default useAdminContext

