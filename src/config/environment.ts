export const config = {
	DEV_MODE: process.env.EXPO_PUBLIC_MODE == "DEVELOPMENT" ? true : false,
	LOG_MODE: process.env.EXPO_PUBLIC_MODE == "DEVELOPMENT" ? true : false,
	API_TIMEOUT: 15000,
	EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
	TENANT_ID: 2,
}
