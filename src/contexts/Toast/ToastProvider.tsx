import React, { ReactNode } from "react"
import Burnt from "burnt"
import { ToastContext, ToastType } from "./ToastContext"

interface Props {
	children: ReactNode
}

export function ToastProvider({ children }: Props) {
	function show(message: string, type: ToastType = "info", title?: string) {
		const presetMap = {
			success: "done",
			error: "error",
			info: "none",
		} as const

		Burnt.toast({
			title: title ?? getDefaultTitle(type),
			message,
			preset: presetMap[type],
		})
	}

	function getDefaultTitle(type: ToastType) {
		switch (type) {
			case "success":
				return "Sucesso"
			case "error":
				return "Erro"
			default:
				return "Aviso"
		}
	}

	const value = {
		show,
		success: (message: string, title?: string) => show(message, "success", title),
		error: (message: string, title?: string) => show(message, "error", title),
		info: (message: string, title?: string) => show(message, "info", title),
	}

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
