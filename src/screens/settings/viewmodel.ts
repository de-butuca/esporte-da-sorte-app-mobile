import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	IConfigService,
	MockConfigService,
} from '../../../backend/services/config.service';
import {
	AppPreferences,
	loadPreferences,
	savePreferences,
} from '@/core/preferences/preferences.storage';
import { TraderCustomerNotificationType, TraderOddDisplayType } from '../../../backend/models/config.models';

const configService: IConfigService = new MockConfigService();

const SETTINGS_CONTEXT = {
	domain: 'esportes-da-sorte',
	language: 'pt-BR',
} as const;

async function getSettingsData() {
	const [notificationsResponse, oddDisplayTypesResponse] = await Promise.all([
		configService.getTraderNotificationList(SETTINGS_CONTEXT.domain, SETTINGS_CONTEXT.language),
		configService.getTraderOddDisplayTypes(SETTINGS_CONTEXT.domain),
	]);

	return {
		notifications: (notificationsResponse.data ?? [])
			.filter((item) => item.webVisible !== false)
			.sort((left, right) => (left.orderBy ?? 0) - (right.orderBy ?? 0)),
		oddDisplayTypes: (oddDisplayTypesResponse.data ?? [])
			.filter((item) => item.isWebVisible !== false)
			.sort((left, right) => (left.orderBy ?? 0) - (right.orderBy ?? 0)),
	};
}

function getNotificationKey(item: TraderCustomerNotificationType) {
	return String(item.customerNotificationTypeId ?? item.traderCustNotificationTypeId ?? item.description ?? '');
}

export function useSettingsViewModel() {
	const query = useQuery({
		queryKey: ['settings-screen', SETTINGS_CONTEXT.domain, SETTINGS_CONTEXT.language],
		queryFn: getSettingsData,
	});
	const [storedPreferences, setStoredPreferences] = useState<AppPreferences | null>(null);

	useEffect(() => {
		let isMounted = true;

		void loadPreferences().then((preferences) => {
			if (!isMounted) return;
			setStoredPreferences(preferences);
		});

		return () => {
			isMounted = false;
		};
	}, []);

	const selectedOddTypeCode = useMemo(() => {
		const availableTypes = query.data?.oddDisplayTypes ?? [];
		if (!availableTypes.length) return undefined;

		const storedCode = storedPreferences?.oddDisplayTypeCode;
		const hasStoredCode = availableTypes.some((item) => item.oddDisplayTypeCode === storedCode);

		return hasStoredCode ? storedCode : availableTypes[0]?.oddDisplayTypeCode;
	}, [query.data?.oddDisplayTypes, storedPreferences?.oddDisplayTypeCode]);

	const notificationPreferences = useMemo(() => {
		const notifications = query.data?.notifications ?? [];
		const stored = storedPreferences?.notificationPreferences ?? {};

		return notifications.reduce<Record<string, boolean>>((accumulator, item) => {
			const key = getNotificationKey(item);
			accumulator[key] = stored[key] ?? true;
			return accumulator;
		}, {});
	}, [query.data?.notifications, storedPreferences?.notificationPreferences]);

	async function persistPreferences(partial: Partial<AppPreferences>) {
		const nextPreferences: AppPreferences = {
			themeMode: partial.themeMode ?? storedPreferences?.themeMode ?? 'light',
			highContrast: partial.highContrast ?? storedPreferences?.highContrast ?? false,
			oddDisplayTypeCode: partial.oddDisplayTypeCode ?? selectedOddTypeCode,
			notificationPreferences: partial.notificationPreferences ?? notificationPreferences,
		};

		setStoredPreferences(nextPreferences);
		await savePreferences(nextPreferences);
	}

	async function handleSelectOddType(oddType: TraderOddDisplayType) {
		await persistPreferences({
			oddDisplayTypeCode: oddType.oddDisplayTypeCode,
		});
	}

	async function handleToggleNotification(item: TraderCustomerNotificationType, value: boolean) {
		const key = getNotificationKey(item);
		await persistPreferences({
			notificationPreferences: {
				...notificationPreferences,
				[key]: value,
			},
		});
	}

	return {
		notifications: query.data?.notifications ?? [],
		oddDisplayTypes: query.data?.oddDisplayTypes ?? [],
		selectedOddTypeCode,
		notificationPreferences,
		isLoading: query.isLoading,
		isError: query.isError,
		refetch: query.refetch,
		handleSelectOddType,
		handleToggleNotification,
	};
}
