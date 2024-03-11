import animations from "@midudev/tailwind-animations"
import tailwindTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				title: ["Montserrat", ...tailwindTheme.fontFamily.mono],
				subtitle: ["Lora", ...tailwindTheme.fontFamily.serif],
				body: ["Hind\\ Madurai", ...tailwindTheme.fontFamily.sans],
			},
			fontSize: {
				topper: "var(--topper-font-size)",
				header: "var(--header-font-size)",
				body: "var(--body-font-size)",
			},
			colors: {
				"primary": "var(--color-primary)",
				"secondary": "var(--color-secondary)",
				"secondary-accent": "var(--color-secondary-accent)",
				"tertiary": "var(--color-tertiary)",
				"accent": "var(--color-accent)",
			},
			screens: {
				xs: "360px",
				...tailwindTheme.screens,
			},
			boxShadow: {
				"nav": "0 0 20px rgba(0, 0, 0, 0.1)",
				"nav-dark": "0 0 20px rgba(252, 252, 252, 0.6)",
				"service-card": "0px 8px 50px rgba(149, 157, 165, 0.4)",
			},
		},
	},

	plugins: [
		animations,
		function ({ addVariant }) {
			addVariant("any-hover", "@media (any-hover: hover) { &:hover }")
		},
	],
}
