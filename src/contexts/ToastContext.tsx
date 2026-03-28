import React, { createContext, useContext } from 'react';
import Toast from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
	duration?: number;
	position?: 'top' | 'bottom';
}

interface IToastService {
	show: (message: string, type: ToastType, options?: ToastOptions) => void;
	success: (message: string, options?: ToastOptions) => void;
	error: (message: string, options?: ToastOptions) => void;
	info: (message: string, options?: ToastOptions) => void;
	warning: (message: string, options?: ToastOptions) => void;
	hide: () => void;
}

const ToastContext = createContext<IToastService | undefined>(undefined);

// Implementation using react-native-toast-message
class ToastServiceImpl implements IToastService {
	show(message: string, type: ToastType, options?: ToastOptions) {
		Toast.show({
			type,
			text1: message,
			duration: options?.duration || 3000,
			position: options?.position === 'top' ? 'top' : 'bottom',
		});
	}

	success(message: string, options?: ToastOptions) {
		this.show(message, 'success', options);
	}

	error(message: string, options?: ToastOptions) {
		this.show(message, 'error', options);
	}

	info(message: string, options?: ToastOptions) {
		this.show(message, 'info', options);
	}

	warning(message: string, options?: ToastOptions) {
		this.show(message, 'warning', options);
	}

	hide() {
		Toast.hide();
	}
}

const toastService = new ToastServiceImpl();

export function ToastProvider({ children }: { children: React.ReactNode }) {
	return (
		<ToastContext.Provider value={toastService}>
			{children}
			<Toast />
		</ToastContext.Provider>
	);
}

export function useToast(): IToastService {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast deve ser usado dentro de um ToastProvider');
	}
	return context;
}
