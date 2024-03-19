import preact from "@astrojs/preact"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	site: "https://protesis-ocularjlemus.com/",
	integrations: [
		tailwind(),
		preact({ compat: true }),
		sitemap({
			lastmod: new Date(),
		}),
	],
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	output: "hybrid",
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		build: {
			cssMinify: "lightningcss",
		},
		ssr: {
			noExternal: ["path-to-regexp"],
		},
	},
})
