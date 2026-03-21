// core/session/session.types.ts

export interface SessionUser {
	id: string
	name: string
}

export interface SessionState {
	user: SessionUser | null
	token: string | null
	isAuthenticated: boolean
	isLoading: boolean
}

export interface SignInPayload {
	user: SessionUser
	token: string
}
