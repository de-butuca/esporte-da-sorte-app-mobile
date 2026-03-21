import axios from "axios"
import { config } from "../../config/environment"
import { useSessionStore } from "@/core/session/useSessionStore"

export const apiClient = axios.create({
	baseURL: config.EXPO_PUBLIC_API_URL,
	timeout: config.API_TIMEOUT,
	withCredentials: true,
})

apiClient.interceptors.request.use(
	async (config: any) => {
		const token = await useSessionStore.getState().token

		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			}
		}

		return config
	},
	(error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		return Promise.reject(error)
	}
)
