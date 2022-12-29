/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [
			[
				"next-superjson-plugin",
				{
					excluded: [],
				},
			],
		],
	},
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com"],
		loader: "custom",
	},
}

module.exports = nextConfig

