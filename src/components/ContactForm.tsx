import React from "preact/compat"
import { useEffect, useRef, useState } from "preact/hooks"

import { cn } from "@/utils"

type MessageType = "success" | "error" | null

interface DataProps {
	message: string
}

interface ResponseMessage {
	message: string
	type: MessageType
}

export default function ContactForm() {
	const formRef = useRef<HTMLFormElement | null>(null)
	const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
		message: "",
		type: null,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [timeoutId, setTimeoutId] = useState<number | null>(null)

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		try {
			setIsLoading(true)
			const response: Response = await fetch("/api/contact", {
				method: "POST",
				body: formData,
			})
			const data: DataProps = (await response.json()) as DataProps
			if (response.ok) {
				setResponseMessage({
					message: data.message,
					type: "success",
				})
				formRef.current?.reset()
			} else {
				setResponseMessage({
					message: data.message,
					type: "error",
				})
			}
		} catch (error) {
			setResponseMessage({
				message: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
				type: "error",
			})
		} finally {
			setIsLoading(false)
			const id = setTimeout(() => {
				setResponseMessage({
					message: "",
					type: null,
				})
			}, 5000)
			setTimeoutId(id)
		}
	}

	useEffect(() => {
		return () => {
			if (timeoutId) {
				window.clearTimeout(timeoutId)
			}
		}
	}, [timeoutId])

	return (
		<form
			ref={formRef}
			className="box-border flex w-full max-w-[39.375rem] flex-wrap items-center justify-between gap-3 rounded-2xl bg-tertiary p-[clamp(1.5rem,18vw,3rem)_clamp(1rem,4vw,3rem)] lg:w-[46%] lg:max-w-[36.125rem] dark:bg-secondary"
			onSubmit={handleSubmit}
		>
			<h3 class="mb-1 text-form-title font-bold leading-[1.2em] text-black dark:text-white">
				Envíanos un Correo
			</h3>
			<label
				className="flex w-full flex-col items-start justify-center gap-1 text-form-label text-black dark:text-white"
				for="name"
			>
				Nombre
				<input
					disabled={isLoading}
					className="box-border h-14 w-full rounded-lg bg-white p-0 pl-6 text-base text-black [border:none] placeholder:text-neutral-700 placeholder:opacity-60"
					type="text"
					name="name"
					id="name"
					required
					placeholder="Nombre"
				/>
			</label>
			<label
				for="email"
				className="flex w-full flex-col items-start justify-center gap-1 text-form-label text-black dark:text-white"
			>
				Correo electrónico
				<input
					disabled={isLoading}
					className="box-border h-14 w-full rounded-lg bg-white p-0 pl-6 text-base text-black [border:none] placeholder:text-neutral-700 placeholder:opacity-60"
					type="email"
					name="email"
					id="email"
					required
					placeholder="Correo electrónico"
				/>
			</label>
			<label
				for="phone"
				className="flex w-full flex-col items-start justify-center gap-1 text-form-label text-black dark:text-white"
			>
				Teléfono
				<input
					disabled={isLoading}
					className="box-border h-14 w-full rounded-lg bg-white p-0 pl-6 text-base text-black [border:none] placeholder:text-neutral-700 placeholder:opacity-60"
					type="text"
					name="phone"
					id="phone"
					required
					placeholder="Teléfono"
				/>
			</label>
			<label
				for="message"
				className="flex w-full flex-col items-start justify-center gap-1 text-form-label text-black dark:text-white"
			>
				Mensaje
				<textarea
					disabled={isLoading}
					className="mb-3 box-border h-14 min-h-[7.5rem] w-full rounded-lg bg-white p-0 pl-6 pt-6 text-base text-black [border:none] placeholder:text-neutral-700 placeholder:opacity-60"
					name="message"
					id="message"
					required
					minLength={5}
					placeholder="Escribe tu mensaje..."
				></textarea>
			</label>
			<button
				disabled={isLoading}
				className="relative z-[1] m-0 inline-block w-full min-w-[12.5rem] overflow-hidden rounded-lg bg-primary px-12 py-0 text-base font-bold leading-[3.5rem] text-white [border:none] [transition:color_0.3s] before:absolute before:left-0 before:top-0 before:-z-[1] before:block before:h-full before:w-0 before:bg-black before:opacity-100 before:content-[''] before:[transition:width_0.3s] hover:cursor-pointer hover:before:w-full md:w-auto dark:before:bg-white dark:hover:text-black"
				type="submit"
			>
				{isLoading ? "Enviando..." : "Enviar"}
			</button>
			{responseMessage.type !== null && responseMessage.message && (
				<div
					className={cn("flex w-full items-center justify-center text-center", {
						"text-green-500": responseMessage.type === "success",
						"text-red-500": responseMessage.type === "error",
					})}
				>
					{responseMessage.type === "success" ? (
						<svg
							className="mr-2 inline-block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					) : (
						<svg
							className="mr-2 inline-block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					)}
					<p>{responseMessage.message}</p>
				</div>
			)}
		</form>
	)
}
