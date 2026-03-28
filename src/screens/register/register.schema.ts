import { z } from 'zod';
import { RegisterContractConfig } from './register.types';

const DEFAULT_CONTRACT: RegisterContractConfig = {
	passwordLength: 6,
	requireLowerCase: false,
	requireUpperCase: false,
	requireDigit: false,
	disallowOnlyDigit: false,
	activeVisualFields: {
		cpf: true,
		email: true,
		phone: true,
		password: true,
	},
	requiresUsername: false,
	requiresLookupProfile: false,
	unsupportedActiveFields: [],
};

export function createRegisterSchema(contract?: Partial<RegisterContractConfig>) {
	const resolvedContract = {
		...DEFAULT_CONTRACT,
		...contract,
		activeVisualFields: {
			...DEFAULT_CONTRACT.activeVisualFields,
			...contract?.activeVisualFields,
		},
	};

	return z
		.object({
			cpf: z
				.string()
				.min(1, 'CPF obrigatorio')
				.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF invalido'),
			email: z.string().min(1, 'E-mail obrigatorio').email('E-mail invalido'),
			phone: z
				.string()
				.min(1, 'Celular obrigatorio')
				.regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Celular invalido'),
			password: z
				.string()
				.min(
					Math.max(1, resolvedContract.passwordLength),
					`Minimo ${resolvedContract.passwordLength} caracteres`,
				)
				.refine(
					(value) => !resolvedContract.requireLowerCase || /[a-z]/.test(value),
					'Use ao menos uma letra minuscula',
				)
				.refine(
					(value) => !resolvedContract.requireUpperCase || /[A-Z]/.test(value),
					'Use ao menos uma letra maiuscula',
				)
				.refine((value) => !resolvedContract.requireDigit || /\d/.test(value), 'Use ao menos um numero')
				.refine(
					(value) => !resolvedContract.disallowOnlyDigit || !/^\d+$/.test(value),
					'A senha nao pode conter apenas numeros',
				),
			confirmPassword: z.string().min(1, 'Confirme sua senha'),
			acceptTerms: z.boolean(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'As senhas nao coincidem',
			path: ['confirmPassword'],
		})
		.refine((data) => data.acceptTerms === true, {
			message: 'Aceite os termos para continuar',
			path: ['acceptTerms'],
		});
}

export function extractDigits(value: string) {
	return value.replace(/\D/g, '');
}

export function getPasswordRequirementsLabel(contract: RegisterContractConfig) {
	const rules = [`Minimo ${contract.passwordLength} caracteres`];

	if (contract.requireLowerCase) rules.push('1 letra minuscula');
	if (contract.requireUpperCase) rules.push('1 letra maiuscula');
	if (contract.requireDigit) rules.push('1 numero');
	if (contract.disallowOnlyDigit) rules.push('nao pode ser so numeros');

	return rules.join(' • ');
}
