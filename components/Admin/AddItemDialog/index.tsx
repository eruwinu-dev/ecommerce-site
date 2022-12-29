import React from "react"
import useAdminContext from "../../../context/AdminState"
import BaseDialog from "../../BaseDialog"
import BaseDialogSpinner from "../../BaseDialog/BaseDialogSpinner"
import AddItemForm from "./AddItemForm"

type Props = {}

const AddItemDialog = (props: Props) => {
	const {
		adminDialog: { addItem: addItemDialog },
		adminLoading: { addItem: addItemLoading },
		toggleAdminDialog,
	} = useAdminContext()

	return (
		<BaseDialog
			isOpen={addItemDialog}
			onClose={() => toggleAdminDialog("addItem")}
			title="Add Item"
			closeOnBlur={false}
			size="max-w-5xl"
		>
			{addItemLoading ? <BaseDialogSpinner text="Adding your item" /> : <AddItemForm />}
		</BaseDialog>
	)
}

export default AddItemDialog

