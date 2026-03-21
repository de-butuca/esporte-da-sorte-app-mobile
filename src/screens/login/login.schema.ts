import { z } from "zod"

export const loginSchema = z.object({
	login: z.string().min(1, "Login obrigatório"),
})
