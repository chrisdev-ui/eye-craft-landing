import sendgridMail from "@sendgrid/mail"
import type { APIRoute } from "astro"

import { htmlGenerator } from "@/emails/template"

export const prerender = false

sendgridMail.setApiKey(import.meta.env.SENDGRID_API_KEY as string)

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData()
	const name = data.get("name") as string
	const email = data.get("email") as string
	const phone = data.get("phone") as string
	const message = data.get("message") as string

	if (!name || !email || !phone || !message) {
		return new Response(
			JSON.stringify({
				message: "Todos los campos son requeridos",
			}),
			{
				status: 400,
				statusText: "Bad Request",
			}
		)
	}

	const msg = {
		from: { name: "Contacto", email: "contacto@em5923.protesis-ocularjlemus.com" },
		to: "jelemus024726@gmail.com",
		subject: "Nuevo mensaje de contacto desde tu página web",
		html: htmlGenerator({
			name,
			email,
			phone,
			message,
		}),
	}

	try {
		await sendgridMail.send(msg)

		return new Response(
			JSON.stringify({
				message: "El correo ha sido enviado correctamente",
			}),
			{
				status: 200,
				statusText: "OK",
			}
		)
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "El correo no pudo ser enviado. Por favor, inténtalo de nuevo.",
			}),
			{
				status: 500,
				statusText: "Internal Server Error",
			}
		)
	}
}
