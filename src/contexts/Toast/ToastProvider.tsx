import React, { ReactNode } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet } from 'react-native';
import { ToastContext, ToastType } from './ToastContext';

interface Props {
	children: ReactNode;
}

// Toast component that displays text properly
const ToastComponent = ({ text1, text2, type }: any) => {
	const getColor = (toastType: string) => {
		switch (toastType) {
			case 'success':
				return '#10B981';
			case 'error':
				return '#EF4444';
			case 'warning':
				return '#F59E0B';
			default:
				return '#3B82F6';
		}
	};

	const borderColor = getColor(type);

	return (
		<View style={[styles.container, { borderLeftColor: borderColor }]}>
			<Text style={styles.title}>{text1}</Text>
			{text2 && <Text style={styles.message}>{text2}</Text>}
		</View>
	);
};

export function ToastProvider({ children }: Props) {
	function show(message: string, type: ToastType = 'info', title?: string) {
		Toast.show({
			type,
			text1: title || getDefaultTitle(type),
			text2: message,
			position: 'top',
			visibilityTime: 3000,
		});
	}

	function getDefaultTitle(type: ToastType) {
		switch (type) {
			case 'success':
				return '✓ Sucesso';
			case 'error':
				return 'Erro';
			default:
				return 'Aviso';
		}
	}

	const value = {
		show,
		success: (message: string, title?: string) => show(message, 'success', title || '✓ Sucesso'),
		error: (message: string, title?: string) => show(message, 'error', title || '! Erro'),
		info: (message: string, title?: string) => show(message, 'info', title || 'ℹ Aviso'),
	};

	return (
		<ToastContext.Provider value={value}>
			{children}
			<Toast
				config={{
					success: (props: any) => <ToastComponent {...props} />,
					error: (props: any) => <ToastComponent {...props} />,
					info: (props: any) => <ToastComponent {...props} />,
					warning: (props: any) => <ToastComponent {...props} />,
				}}
				topOffset={50}
			/>
		</ToastContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		borderLeftWidth: 4,
		backgroundColor: '#1F2937',
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginHorizontal: 16,
		marginTop: 16,
		marginBottom: 8,
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
		marginBottom: 4,
	},
	message: {
		fontSize: 13,
		color: '#D1D5DB',
		lineHeight: 18,
	},
});
