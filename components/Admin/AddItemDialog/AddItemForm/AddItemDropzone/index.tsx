import Image from "next/image"
import React, { Dispatch, memo, MouseEvent, SetStateAction } from "react"
import Dropzone, { FileWithPath } from "react-dropzone"
import cloudinaryLoader from "../../../../../utils/cloudinaryLoader"

type Props = {
	files: File[]
	setFiles: Dispatch<SetStateAction<File[]>>
}

const AddItemDropzone = ({ files, setFiles }: Props) => {
	const dropHandler = (newFiles: File[]) => {
		const filePaths = files.map((file: FileWithPath) => file.path)
		const uniqueFiles = newFiles.filter((file: FileWithPath) => !filePaths.includes(file.path))
		setFiles((files) => [...files, ...uniqueFiles])
	}

	const removeFileHandler = (path: string) => (event: MouseEvent<HTMLDivElement>) => {
		const newFiles = files.filter((file: FileWithPath) => file.path !== path)
		setFiles(newFiles)
	}

	return (
		<div className="dropzone-with-images">
			<Dropzone onDrop={dropHandler}>
				{({ getRootProps, getInputProps }) => (
					<div className="dropzone-container">
						<div className="mb-2">
							<span className="text-sm font-semibold">Item Images</span>
						</div>
						<div
							{...getRootProps({
								className: "dropzone",
							})}
						>
							<input {...getInputProps()} />
							<p>Click or drag images to upload</p>
						</div>
					</div>
				)}
			</Dropzone>
			<div className="dropzone-image-container">
				{files.reverse().map((file: FileWithPath) => (
					<div className="group dropzone-image" key={file.path}>
						<Image
							src={URL.createObjectURL(file)}
							alt={file.path || ""}
							className="rounded-2xl"
							fill
							loader={cloudinaryLoader}
							sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
						/>
						<div
							className="dropzone-image-backdrop group-hover:opacity-100"
							onClick={removeFileHandler(file.path || "")}
						>
							<span>Click to remove</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(AddItemDropzone)

