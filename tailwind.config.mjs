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
				"topper": "var(--topper-font-size)",
				"header": "var(--header-font-size)",
				"body": "var(--body-font-size)",
				"h3": "var(--h3-font-size)",
				"card-body": "var(--card-body-font-size)",
				"form-title": "var(--form-title-font-size)",
				"form-label": "var(--form-label-font-size)",
				"hero": "var(--hero-font-size)",
				"footer": "var(--footer-font-size)",
			},
			colors: {
				"primary": "hsl(var(--color-primary) / <alpha-value>)",
				"secondary": "var(--color-secondary)",
				"secondary-accent": "var(--color-secondary-accent)",
				"tertiary": "var(--color-tertiary)",
				"accent": "var(--color-accent)",
			},
			screens: {
				xs: "360px",
				s: "600px",
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
