// src/api/ApiRepositoryContext.tsx
import { IAuthRepository } from "@/domain/auth/IAuthRepository"
import { AuthRepository } from "@/infra/AuthRepository"
import React, { createContext, ReactNode, useContext, useMemo } from "react"

type ApiRepositories = {
	AuthRepository: IAuthRepository
}

const ApiRepositoryContext = createContext<ApiRepositories | undefined>(undefined)

export const ApiRepositoryProvider = ({ children }: { children: ReactNode }) => {
	// Criando instâncias dos repositórios
	const repositories = useMemo(
		() => ({
			AuthRepository: new AuthRepository(),
		}),
		[]
	)

	return <ApiRepositoryContext.Provider value={repositories}>{children}</ApiRepositoryContext.Provider>
}

// Hook para consumir o contexto
export const useApiRepository = (): ApiRepositories => {
	const context = useContext(ApiRepositoryContext)
	if (!context) {
		throw new Error("useApiRepository deve ser usado dentro de ApiRepositoryProvider")
	}
	return context
}
