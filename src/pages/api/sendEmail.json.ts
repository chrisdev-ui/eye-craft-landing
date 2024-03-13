import type { APIRoute } from "astro"
import { Resend } from "resend"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const GET: APIRoute = async ({ params, request }) => {
	const send = await resend.emails.send({
		from: "Contact <no-reply@resend.dev>",
		to: ["web.christian.dev@gmail.com"],
		subject: "Hello from Astro",
		html: "<p>Hello from Astro</p>",
		text: "Hello from Astro",
	})

	if (send.data) {
		return new Response(
			JSON.stringify({
				message: "Email sent",
				data: send.data,
			}),
			{
				status: 200,
				statusText: "OK",
			}
		)
	} else {
		return new Response(
			JSON.stringify({
				message: "Email not sent",
				data: send.error,
			}),
			{
				status: 500,
				statusText: "Internal Server Error",
			}
		)
	}
}
