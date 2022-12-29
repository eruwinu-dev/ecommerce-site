import Image from "next/image"
import React from "react"
import cloudinaryLoader from "../../utils/cloudinaryLoader"

type Props = {
	src: string
	alt: string
	className?: string
}

const CloudinaryImage = ({ src, alt, className }: Props) => {
	return (
		<Image
			src={src}
			alt={alt}
			loader={cloudinaryLoader}
			fill
			className={className}
			sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
		/>
	)
}

export default CloudinaryImage

