import { ImageSourcePropType } from 'react-native';

export type PromotionIconKey = 'ticket' | 'sports' | 'casino';

export type PromotionCategory =
	| 'Todas'
	| 'Bônus'
	| 'Cashback'
	| 'Exclusivo'
	| 'Limitado'
	| 'Esportes'
	| 'Cassino';

export type PromotionTag = Exclude<PromotionCategory, 'Todas'>;

export interface PromotionCardViewModel {
	id: string;
	title: string;
	subtitle: string;
	benefit: string;
	description: string;
	highlights: string[];
	ctaLabel: string;
	categories: PromotionTag[];
	validUntilLabel?: string;
	badge?: 'EXCLUSIVO' | 'LIMITADO';
	imageUrl?: string;
	fallbackAsset: ImageSourcePropType;
	iconKey: PromotionIconKey;
	gradient: string[];
	detailsUrl?: string;
	source: 'news' | 'custom-event';
}

export interface PromotionHeroViewModel extends PromotionCardViewModel {
	eyebrow: string;
}

export interface PromotionsLegalViewModel {
	title: string;
	description: string;
	linkLabel: string;
	content: string;
}

export interface PromotionsSupportViewModel {
	title: string;
	description: string;
	buttonLabel: string;
	helperText: string;
}

export interface PromotionsFooterViewModel {
	responsibleText: string;
	ageLabel: string;
	institutionalText: string;
}

export interface PromotionsScreenViewModel {
	headerTitle: string;
	headerDescription: string;
	hero: PromotionHeroViewModel | null;
	filters: PromotionCategory[];
	cards: PromotionCardViewModel[];
	legal: PromotionsLegalViewModel;
	support: PromotionsSupportViewModel;
	footer: PromotionsFooterViewModel;
}
