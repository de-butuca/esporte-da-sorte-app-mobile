import { ResponseApi } from "@/core/http/api.types"

export type loginReponse = ResponseApi<{
	token: string
	user: {
		id: string
		name: string
	}
}>
