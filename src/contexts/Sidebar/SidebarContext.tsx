import { createContext, useContext } from 'react';

interface SidebarContextValue {
	open: () => void;
	close: () => void;
	isOpen: boolean;
}

export const SidebarContext = createContext<SidebarContextValue>({
	open: () => {},
	close: () => {},
	isOpen: false,
});

export function useSidebar() {
	return useContext(SidebarContext);
}
