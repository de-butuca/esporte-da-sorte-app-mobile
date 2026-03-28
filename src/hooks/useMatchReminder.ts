import { useState, useEffect, useCallback, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ToastContext } from '@/contexts/Toast/ToastContext';
import * as Notifications from 'expo-notifications';

const REMINDER_KEY_PREFIX = 'reminder_';

// Generate a safe key for SecureStore (alphanumeric, dots, dashes, underscores only)
function generateSafeKey(matchId: string, homeTeam: string, awayTeam: string): string {
	if (!matchId || !homeTeam || !awayTeam) {
		throw new Error('matchId, homeTeam, and awayTeam are required');
	}

	// Sanitize: remove special characters, convert to lowercase
	const sanitized = `${REMINDER_KEY_PREFIX}${matchId}-${homeTeam}-${awayTeam}`
		.toLowerCase()
		.replace(/[^a-z0-9.-_]/g, '_');

	return sanitized;
}

interface ReminderData {
	matchId: string;
	homeTeam: string;
	awayTeam: string;
	time: string;
	isActive: boolean;
}

export function useMatchReminder(matchId: string, homeTeam: string, awayTeam: string) {
	const [isReminderActive, setIsReminderActive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const toast = useContext(ToastContext);

	if (!toast) {
		throw new Error('useMatchReminder deve ser usado dentro de um ToastProvider');
	}

	// Validate inputs
	const isValidMatch = !!(matchId && homeTeam && awayTeam && matchId.trim() && homeTeam.trim() && awayTeam.trim());

	// Load reminder state on mount or when match changes
	useEffect(() => {
		if (isValidMatch) {
			loadReminderState();
		} else {
			setIsLoading(false);
		}
	}, [matchId, homeTeam, awayTeam, isValidMatch]);

	const loadReminderState = async () => {
		try {
			const reminderKey = generateSafeKey(matchId, homeTeam, awayTeam);
			const reminder = await SecureStore.getItemAsync(reminderKey);
			setIsReminderActive(!!reminder);
		} catch (error) {
			console.error('Erro ao carregar reminder:', error);
			// Set to false if there's an error
			setIsReminderActive(false);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleReminder = useCallback(async () => {
		if (!isValidMatch) {
			toast.error('Dados do match incompletos');
			return;
		}

		try {
			setIsLoading(true);
			const reminderKey = generateSafeKey(matchId, homeTeam, awayTeam);

			if (isReminderActive) {
				// Remove reminder
				await SecureStore.deleteItemAsync(reminderKey);
				setIsReminderActive(false);
				toast.info('Lembrete removido');
			} else {
				// Add reminder
				const reminderData: ReminderData = {
					matchId,
					homeTeam,
					awayTeam,
					time: new Date().toISOString(),
					isActive: true,
				};

				await SecureStore.setItemAsync(reminderKey, JSON.stringify(reminderData));
				setIsReminderActive(true);

				// Send push notification
				await sendReminderNotification(homeTeam, awayTeam);
				toast.success(`Lembrete ativado para ${homeTeam} vs ${awayTeam}`);
			}
		} catch (error) {
			console.error('Erro ao alternar reminder:', error);
			toast.error('Erro ao configurar lembrete');
		} finally {
			setIsLoading(false);
		}
	}, [matchId, homeTeam, awayTeam, isReminderActive, isValidMatch, toast]);

	return {
		isReminderActive,
		isLoading,
		toggleReminder,
	};
}

async function sendReminderNotification(homeTeam: string, awayTeam: string) {
	try {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: '🔔 Lembrete de Partida',
				body: `${homeTeam} vs ${awayTeam} em breve!`,
				data: {
					type: 'match_reminder',
					homeTeam,
					awayTeam,
				},
			},
			trigger: {
				type: 'time',
				seconds: 5, // Test notification after 5 seconds
			},
		});
	} catch (error) {
		console.error('Erro ao enviar notificação:', error);
	}
}
