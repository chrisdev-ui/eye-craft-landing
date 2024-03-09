import animations from "@midudev/tailwind-animations"
import tailwindTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				title: ["Montserrat", ...tailwindTheme.fontFamily.mono],
				subTitle: ["Lora", ...tailwindTheme.fontFamily.serif],
				body: ["Hind\\ Madurai", ...tailwindTheme.fontFamily.sans],
			},
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				tertiary: "var(--color-tertiary)",
				accent: "var(--color-accent)",
			},
			screens: {
				xs: "360px",
				...tailwindTheme.screens,
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
