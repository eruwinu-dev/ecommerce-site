import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ItemFormType } from "../../../../types/admin"
import useAdminContext from "../../../../context/AdminState"
import useUserContext from "../../../../context/UserState"
import AddItemDropzone from "./AddItemDropzone"

type Props = {}

const addItemSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	description: Yup.string(),
	price: Yup.number().required("Required").min(0.01),
	quantity: Yup.number().required("Required").min(1),
	published: Yup.boolean().default(true),
})

const addItemInitialValues: ItemFormType = {
	name: "",
	description: "",
	price: 10,
	quantity: 1,
	published: true,
}

const AddItemForm = (props: Props) => {
	const { addItem } = useAdminContext()
	const { user } = useUserContext()
	const [files, setFiles] = useState<File[]>([])

	return (
		<Formik
			initialValues={addItemInitialValues}
			validationSchema={addItemSchema}
			onSubmit={async (values) => {
				if (!user) return
				await addItem(values, files, user.id)
			}}
		>
			{({ values, touched, errors }) => (
				<Form>
					<div className="w-full grid grid-cols-2 grid-flow-row gap-4">
						<div>
							<label htmlFor="name">Item Name</label>
							<Field as="input" type="text" name="name" placeholder="Item Name" />
							<ErrorMessage name="name" render={(msg) => <div className="error-message">{msg}</div>} />
							<label htmlFor="description">Item Description</label>
							<Field
								as="textarea"
								rows={3}
								type="text"
								name="description"
								placeholder="Item Description"
							/>
							<label htmlFor="quantity">Quantity</label>
							<Field
								as="input"
								type="number"
								name="quantity"
								min={1}
								step={1}
								placeholder="Item Quantity"
							/>
							<ErrorMessage
								name="quantity"
								render={(msg) => <div className="error-message">{msg}</div>}
							/>
							<label htmlFor="price">Item Price</label>
							<Field
								as="input"
								type="number"
								min={0.01}
								step={0.01}
								name="price"
								placeholder="Item Price"
							/>
							<ErrorMessage name="price" render={(msg) => <div className="error-message">{msg}</div>} />
						</div>
						<div>
							<AddItemDropzone files={files} setFiles={setFiles} />
						</div>
					</div>
					<div className="w-full flex flex-row items-center justify-end space-x-4">
						<button type="submit">Add Item</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default AddItemForm

