import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { MockConfigService } from '../../../backend/services/config.service';
import { mapPromotionsScreenData } from './promotions.mapper';
import { PromotionCardViewModel, PromotionCategory, PromotionHeroViewModel } from './promotions.types';
import { useAppNavigation } from '@/navigation/hooks';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useSessionContext } from '@/contexts/SessionContext';

const configService = new MockConfigService();

const PROMOTIONS_CONTEXT = {
	domain: 'esportes-da-sorte',
	device: 'm',
	language: 'pt-BR',
	languageId: 2,
	traderId: 102,
} as const;

const REQUIRED_WEB_MODULE_CODES = ['terms-conditions', 'responsible-gaming', 'footer-text'] as const;

async function getPromotionsScreenData() {
	const [
		modulesResponse,
		traderDefaultsResponse,
		introContentResponse,
		supportContentResponse,
		newsResponse,
		customEventsResponse,
		usedWebModuleCodesResponse,
	] = await Promise.all([
		configService.getTraderModules(PROMOTIONS_CONTEXT.domain, PROMOTIONS_CONTEXT.device),
		configService.getTraderDefaults(PROMOTIONS_CONTEXT.domain),
		configService.getContentByCode({
			traderId: PROMOTIONS_CONTEXT.traderId,
			languageId: PROMOTIONS_CONTEXT.languageId,
			device: PROMOTIONS_CONTEXT.device,
			requestBody: { code: 'promotions-intro' },
		}),
		configService.getContentByCode({
			traderId: PROMOTIONS_CONTEXT.traderId,
			languageId: PROMOTIONS_CONTEXT.languageId,
			device: PROMOTIONS_CONTEXT.device,
			requestBody: { code: 'promotions-support' },
		}),
		configService.getNews(
			PROMOTIONS_CONTEXT.domain,
			PROMOTIONS_CONTEXT.languageId,
			PROMOTIONS_CONTEXT.device,
			PROMOTIONS_CONTEXT.traderId,
		),
		configService.getCustomEventsModules(),
		configService.getUsedWebModuleCodes(
			PROMOTIONS_CONTEXT.domain,
			PROMOTIONS_CONTEXT.device,
			PROMOTIONS_CONTEXT.language,
		),
	]);

	const activeWebModuleCodes = new Set(usedWebModuleCodesResponse.data ?? []);
	const requestedWebModules = REQUIRED_WEB_MODULE_CODES.filter((code) => activeWebModuleCodes.has(code));

	const webModuleEntries = await Promise.all(
		requestedWebModules.map(async (moduleCode) => {
			const response = await configService.getWebModuleContentByCode(
				PROMOTIONS_CONTEXT.domain,
				moduleCode,
				PROMOTIONS_CONTEXT.device,
				PROMOTIONS_CONTEXT.language,
			);

			return [moduleCode, response.data ?? []] as const;
		}),
	);

	const webModules = Object.fromEntries(webModuleEntries);

	return mapPromotionsScreenData({
		modules: modulesResponse.data ?? [],
		news: newsResponse.data ?? [],
		customEvents: customEventsResponse.data ?? [],
		introContent: introContentResponse.data,
		supportContent: supportContentResponse.data,
		webModules,
		traderDefaults: traderDefaultsResponse.data,
	});
}

export function usePromotionsViewModel() {
	const navigation = useAppNavigation();
	const { requireAuth } = useRequireAuth();
	const { activeCategory: sessionCategory } = useSessionContext();
	const authVariant = sessionCategory === 'cassino' ? 'cassino' : 'esportes';
	const [selectedCategory, setSelectedCategory] = useState<PromotionCategory>('Todas');

	const query = useQuery({
		queryKey: ['promotions-screen', PROMOTIONS_CONTEXT.device, PROMOTIONS_CONTEXT.languageId],
		queryFn: getPromotionsScreenData,
	});

	const availableFilters = query.data?.filters ?? ['Todas'];
	const activeCategory = availableFilters.includes(selectedCategory) ? selectedCategory : 'Todas';

	const filteredCards = useMemo(() => {
		if (!query.data?.cards?.length) return [];
		if (activeCategory === 'Todas') return query.data.cards;

		return query.data.cards.filter((card) => card.categories.includes(activeCategory));
	}, [activeCategory, query.data?.cards]);

	function openPromotion(promotion: PromotionCardViewModel | PromotionHeroViewModel) {
		requireAuth(() => {
			if (promotion.categories.includes('Esportes')) {
				navigation.navigate('GameHome');
				return;
			}

			Alert.alert(
				promotion.title,
				promotion.detailsUrl
					? `Destino preparado para integrar a rota ${promotion.detailsUrl}.`
					: 'Detalhes da promoção prontos para receber um destino real na próxima integração.',
			);
		}, authVariant);
	}

	function openTerms() {
		Alert.alert(
			query.data?.legal.title ?? 'Termos & Condições',
			query.data?.legal.content ?? 'Conteúdo não disponível no momento.',
		);
	}

	function openSupport() {
		navigation.navigate('Support');
	}

	function handleBack() {
		if (navigation.canGoBack()) {
			navigation.goBack();
			return;
		}

		navigation.navigate('Home');
	}

	return {
		screen: query.data,
		isLoading: query.isLoading,
		isRefreshing: query.isFetching && !query.isLoading,
		isError: query.isError,
		refetch: query.refetch,
		selectedCategory: activeCategory,
		setSelectedCategory,
		filteredCards,
		handleBack,
		handleOpenPromotion: openPromotion,
		handleOpenTerms: openTerms,
		handleOpenSupport: openSupport,
	};
}
