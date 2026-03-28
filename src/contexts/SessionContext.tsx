import React, { createContext, useContext, useState } from 'react';

export type CategoryTab = 'cassino' | 'esportes';

interface CategoryContextType {
	activeCategory: CategoryTab;
	setActiveCategory: (category: CategoryTab) => void;
}

const SessionContext = createContext<CategoryContextType | undefined>(undefined);

interface SessionProviderProps {
	children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
	const [activeCategory, setActiveCategory] = useState<CategoryTab>('cassino');

	return <SessionContext.Provider value={{ activeCategory, setActiveCategory }}>{children}</SessionContext.Provider>;
}

export function useSessionContext() {
	const context = useContext(SessionContext);

	if (!context) {
		throw new Error('useSessionContext must be used within a SessionProvider');
	}

	return context;
}
