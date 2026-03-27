import { z } from 'zod';

export const registerSchema = z
	.object({
		cpf: z
			.string()
			.min(1, 'CPF obrigatório')
			.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
		email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
		phone: z
			.string()
			.min(1, 'Celular obrigatório')
			.regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Celular inválido'),
		password: z.string().min(6, 'Mínimo 6 caracteres'),
		confirmPassword: z.string().min(1, 'Confirme sua senha'),
		acceptTerms: z.boolean(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})
	.refine((data) => data.acceptTerms === true, {
		message: 'Aceite os termos para continuar',
		path: ['acceptTerms'],
	});
