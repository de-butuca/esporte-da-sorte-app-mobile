import { createContext } from "react"

export type ToastType = "success" | "error" | "info"

export interface ToastContextProps {
	show: (message: string, type?: ToastType, title?: string) => void
	success: (message: string, title?: string) => void
	error: (message: string, title?: string) => void
	info: (message: string, title?: string) => void
}

export const ToastContext = createContext<ToastContextProps | null>(null)
