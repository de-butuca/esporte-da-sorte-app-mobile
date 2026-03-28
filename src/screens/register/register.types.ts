export interface RegisterFormData {
	cpf: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
	acceptTerms: boolean;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface RegisterContractConfig {
	passwordLength: number;
	requireLowerCase: boolean;
	requireUpperCase: boolean;
	requireDigit: boolean;
	disallowOnlyDigit: boolean;
	activeVisualFields: {
		cpf: boolean;
		email: boolean;
		phone: boolean;
		password: boolean;
	};
	requiresUsername: boolean;
	requiresLookupProfile: boolean;
	unsupportedActiveFields: string[];
}

export interface RegisterCustomerLookupViewModel {
	fullName: string;
	birthdate?: string;
}
