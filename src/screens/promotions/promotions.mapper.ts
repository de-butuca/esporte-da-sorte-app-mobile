import {
	CustomEventsModule,
	Module,
	News,
	TraderDefaults,
	TraderDynamicContent,
	WebModuleContent,
} from '../../../backend/models/config.models';
import {
	PromotionCardViewModel,
	PromotionHeroViewModel,
	PromotionTag,
	PromotionsScreenViewModel,
} from './promotions.types';

const HERO_FALLBACK = require('@assets/images/banners/banner-1.png');
const BONUS_FALLBACK = require('@assets/images/banners/banner-3.png');
const SPORTS_FALLBACK = require('@assets/images/banners/banner-2.png');
const CASINO_FALLBACK = require('@assets/images/banners/banner-4.png');

const TICKET_ICON = require('@assets/images/icons/ticket-percent.png');
const SPORTS_ICON = require('@assets/images/icons/soccer-ball-icon.png');
const CASINO_ICON = require('@assets/images/icons/cassino-coin-icon.png');

const CATEGORY_ORDER: PromotionTag[] = ['Bônus', 'Cashback', 'Exclusivo', 'Limitado', 'Esportes', 'Cassino'];

interface PromotionsMapperInput {
	modules: Module[];
	news: News[];
	customEvents: CustomEventsModule[];
	introContent?: TraderDynamicContent;
	supportContent?: TraderDynamicContent;
	webModules: Record<string, WebModuleContent[]>;
	traderDefaults?: TraderDefaults;
	now?: number;
}

interface PromotionCardWithOrder extends PromotionCardViewModel {
	sortOrder: number;
}

export function mapPromotionsScreenData({
	modules,
	news,
	customEvents,
	introContent,
	supportContent,
	webModules,
	traderDefaults,
	now = Date.now(),
}: PromotionsMapperInput): PromotionsScreenViewModel {
	const moduleCodes = new Set(
		modules
			.filter((module) => module.isActive)
			.map((module) => module.moduleCode)
			.filter((moduleCode): moduleCode is string => Boolean(moduleCode)),
	);

	const visibleNews = news
		.filter((item) => isActiveForMobile(item.active, item.startDate, item.expireDate, item.device, now))
		.sort((left, right) => (left.orderBy ?? Number.MAX_SAFE_INTEGER) - (right.orderBy ?? Number.MAX_SAFE_INTEGER));

	const newsCards = visibleNews.map(mapNewsToPromotionCard);
	const customEventCards = customEvents
		.filter((item) => item.mobileActive)
		.filter((item) => isActiveForMobile(true, item.moduleStartDate, item.moduleEndDate, 'm', now))
		.map(mapCustomEventToPromotionCard);

	const heroCandidate = newsCards[0];
	const feedCards = [...newsCards.slice(1), ...customEventCards]
		.sort((left, right) => left.sortOrder - right.sortOrder)
		.map(({ sortOrder, ...card }) => card);

	const hero = moduleCodes.has('promotions-hero') ? mapHero(heroCandidate, introContent) : null;
	const cards = moduleCodes.has('promotions-feed') ? feedCards : [];
	const allCategories = [hero, ...cards]
		.flatMap((item) => item?.categories ?? [])
		.filter((category, index, items) => items.indexOf(category) === index)
		.sort((left, right) => CATEGORY_ORDER.indexOf(left) - CATEGORY_ORDER.indexOf(right));

	return {
		headerTitle: 'Promoções',
		headerDescription:
			introContent?.description ??
			extractPrimaryText(introContent?.moduleContent) ??
			'Campanhas especiais, bônus e benefícios pensados para o seu jogo no mobile.',
		hero,
		filters: ['Todas', ...allCategories],
		cards,
		legal: {
			title: 'Termos & Condições',
			description:
				extractPrimaryText(webModules['terms-conditions']?.[0]?.moduleContent) ??
				'Todas as promoções seguem regras específicas de elegibilidade, período e rollover.',
			linkLabel: 'Ler termos completos',
			content:
				extractReadableText(webModules['terms-conditions']?.[0]?.moduleContent) ??
				'Todas as promoções seguem termos e condições específicos.',
		},
		support: {
			title: 'Fala com a gente',
			description:
				supportContent?.description ??
				'Se ficou com qualquer dúvida, nosso time pode ajudar você a entender a campanha ideal.',
			buttonLabel: 'Preciso de ajuda',
			helperText:
				extractPrimaryText(supportContent?.moduleContent) ??
				'Canal pronto para plugar chat e atendimento nas próximas etapas.',
		},
		footer: {
			responsibleText:
				extractPrimaryText(webModules['responsible-gaming']?.[0]?.moduleContent) ??
				'Jogue com responsabilidade e respeite os seus limites.',
			ageLabel: `${traderDefaults?.tAL ?? 18}+ somente para maiores de idade`,
			institutionalText:
				extractPrimaryText(webModules['footer-text']?.[0]?.moduleContent) ??
				'As campanhas podem ser alteradas sem aviso prévio, sempre respeitando o regulamento vigente.',
		},
	};
}

function mapHero(
	card: PromotionCardWithOrder | undefined,
	introContent?: TraderDynamicContent,
): PromotionHeroViewModel | null {
	if (!card) return null;

	return {
		...card,
		eyebrow: extractEyebrow(card.categories),
		description:
			introContent?.description ??
			card.description ??
			'Ative a campanha principal e comece com vantagem desde a primeira aposta.',
		fallbackAsset: HERO_FALLBACK,
	};
}

function mapNewsToPromotionCard(news: News): PromotionCardWithOrder {
	const contentText = extractReadableText(news.htmlContent);
	const title = news.title?.trim() || 'Oferta especial';
	const categories = deriveCategories(title, contentText, news.newsType?.typeName);
	const highlights = extractListItems(news.htmlContent);
	const fallbackAsset = pickFallbackAsset(categories);

	return {
		id: String(news.newsId ?? news.title ?? Math.random()),
		title,
		subtitle: buildSubtitle(title, categories, news.newsType?.typeName),
		benefit: buildBenefit(title, contentText),
		description:
			extractDescription(contentText, highlights) ??
			'Confira as regras da campanha e ative a oferta direto no app.',
		highlights: highlights.length ? highlights.slice(0, 3) : buildFallbackHighlights(categories),
		ctaLabel: buildCtaLabel(title, categories),
		categories,
		validUntilLabel: buildValidityLabel(news.expireDate),
		badge: pickBadge(categories),
		imageUrl: news.bigImage ?? news.smallImage,
		fallbackAsset,
		iconAsset: pickIcon(categories),
		gradient: pickGradient(categories, title),
		detailsUrl: news.url,
		source: 'news',
		sortOrder: news.orderBy ?? Number.MAX_SAFE_INTEGER,
	};
}

function mapCustomEventToPromotionCard(event: CustomEventsModule): PromotionCardWithOrder {
	const title = event.moduleName?.trim() || 'Campanha esportiva';
	const description = [
		[event.homeCompetitorName, event.awayCompetitorName].filter(Boolean).join(' x '),
		event.leagueName,
	].filter(Boolean).join(' • ');

	return {
		id: `custom-event-${event.customEventsModuleId ?? event.fixtureId ?? title}`,
		title,
		subtitle: 'Odds turbinadas',
		benefit: event.eventName?.trim() || 'Seleção especial do dia',
		description: description || 'Campanha especial vinculada a um evento esportivo.',
		highlights: [
			event.betTypeName ? `Mercado ${event.betTypeName}` : 'Mercado especial',
			event.fixtureOddPrice ? `Odd de ${event.fixtureOddPrice.toFixed(2)}` : 'Odds elevadas',
			event.seasonName ? `Temporada ${event.seasonName}` : 'Condição por tempo limitado',
		],
		ctaLabel: 'Ver jogos',
		categories: ['Esportes', 'Limitado'],
		validUntilLabel: buildValidityLabel(event.moduleEndDate),
		badge: 'LIMITADO',
		imageUrl: undefined,
		fallbackAsset: SPORTS_FALLBACK,
		iconAsset: SPORTS_ICON,
		gradient: ['#00D37F', '#04B67B', '#044D55'],
		detailsUrl: undefined,
		source: 'custom-event',
		sortOrder: (event.moduleOrderBy ?? 50) + 50,
	};
}

function deriveCategories(title: string, contentText: string, typeName?: string): PromotionTag[] {
	const haystack = `${title} ${contentText} ${typeName ?? ''}`.toLowerCase();
	const categories = new Set<PromotionTag>();

	if (typeName?.toLowerCase() === 'casino') categories.add('Cassino');
	if (typeName?.toLowerCase() === 'sports') categories.add('Esportes');
	if (/cashback/.test(haystack)) categories.add('Cashback');
	if (/b[oô]nus|dep[oó]sito|rodadas|combo/.test(haystack)) categories.add('Bônus');
	if (/indique|convide|novo usu[aá]rio|exclusiv/.test(haystack)) categories.add('Exclusivo');
	if (/torneio|limitad|semana|prazo|at[eé]|\bdi[aá]rio\b/.test(haystack)) categories.add('Limitado');

	if (!categories.size) {
		categories.add(typeName?.toLowerCase() === 'casino' ? 'Cassino' : 'Bônus');
	}

	return CATEGORY_ORDER.filter((category) => categories.has(category));
}

function buildBenefit(title: string, contentText: string) {
	const haystack = `${title} ${contentText}`.toLowerCase();

	if (/cashback/.test(haystack)) return 'Até 10% de volta';
	if (/dep[oó]sito|b[oô]nus/.test(haystack)) return 'Até R$ 500 de bônus';
	if (/indique|convide/.test(haystack)) return 'R$ 50 por indicação';
	if (/torneio/.test(haystack)) return 'Prêmio de R$ 10.000';
	if (/combo|odds/.test(haystack)) return 'Ganhe até 500% de bônus';

	return extractPrimaryText(contentText) ?? 'Oferta especial por tempo limitado';
}

function buildSubtitle(title: string, categories: PromotionTag[], typeName?: string) {
	if (categories.includes('Cashback')) return 'Saldo de volta todos os dias';
	if (categories.includes('Esportes')) return 'Campanha especial para o esporte';
	if (categories.includes('Cassino')) return 'Oferta pensada para o cassino';
	if (categories.includes('Exclusivo')) return 'Campanha exclusiva para o seu perfil';
	if (typeName) return typeName;

	return title;
}

function buildCtaLabel(title: string, categories: PromotionTag[]) {
	const haystack = title.toLowerCase();

	if (categories.includes('Cashback')) return 'Participar';
	if (haystack.includes('indique')) return 'Compartilhar';
	if (categories.includes('Esportes')) return 'Apostar agora';
	if (haystack.includes('torneio')) return 'Inscrever-se';

	return 'Resgatar agora';
}

function buildFallbackHighlights(categories: PromotionTag[]) {
	if (categories.includes('Cashback')) {
		return ['Saldo liberado rapidamente', 'Crédito instantâneo'];
	}

	if (categories.includes('Esportes')) {
		return ['Mercados selecionados', 'Condição por tempo limitado'];
	}

	return ['Campanha ativa no mobile', 'Regulamento disponível'];
}

function extractEyebrow(categories: PromotionTag[]) {
	if (categories.includes('Cashback')) return 'Cashback especial';
	if (categories.includes('Esportes')) return 'Campanha esportiva';
	if (categories.includes('Exclusivo')) return 'Oferta exclusiva';

	return 'Campanha principal';
}

function pickBadge(categories: PromotionTag[]) {
	if (categories.includes('Exclusivo')) return 'EXCLUSIVO';
	if (categories.includes('Limitado')) return 'LIMITADO';

	return undefined;
}

function pickGradient(categories: PromotionTag[], title: string) {
	const haystack = title.toLowerCase();

	if (categories.includes('Cashback')) return ['#FFB300', '#FF6A00', '#4A1F1B'];
	if (categories.includes('Esportes')) return ['#00E08B', '#10B981', '#09464A'];
	if (categories.includes('Cassino') || haystack.includes('torneio')) return ['#FF4C7F', '#D11B7A', '#30113E'];

	return ['#0B57D0', '#198BFF', '#38E67D'];
}

function pickIcon(categories: PromotionTag[]) {
	if (categories.includes('Esportes')) return SPORTS_ICON;
	if (categories.includes('Cassino')) return CASINO_ICON;

	return TICKET_ICON;
}

function pickFallbackAsset(categories: PromotionTag[]) {
	if (categories.includes('Esportes')) return SPORTS_FALLBACK;
	if (categories.includes('Cassino')) return CASINO_FALLBACK;

	return BONUS_FALLBACK;
}

function buildValidityLabel(timestamp?: number) {
	if (!timestamp) return undefined;

	return `Válido até ${formatDate(timestamp)}`;
}

function formatDate(timestamp: number) {
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(new Date(timestamp));
}

function isActiveForMobile(
	isActive: boolean | undefined,
	startDate: number | undefined,
	endDate: number | undefined,
	device: string | undefined,
	now: number,
) {
	const active = isActive ?? true;
	const started = !startDate || startDate <= now;
	const notExpired = !endDate || endDate >= now;
	const matchesDevice = !device || device.split(',').map((item) => item.trim()).includes('m');

	return active && started && notExpired && matchesDevice;
}

function extractDescription(contentText: string, highlights: string[]) {
	const normalized = normalizeText(contentText);
	if (!normalized) return undefined;

	const withoutHighlights = highlights.reduce((description, item) => description.replace(item, ''), normalized);
	return withoutHighlights.length > 140 ? `${withoutHighlights.slice(0, 137)}...` : withoutHighlights;
}

function extractListItems(html?: string) {
	if (!html) return [];

	return Array.from(html.matchAll(/<li>(.*?)<\/li>/gi))
		.map((item) => normalizeText(item[1] ?? ''))
		.filter(Boolean)
		.slice(0, 3);
}

function extractReadableText(html?: string) {
	if (!html) return '';

	return normalizeText(
		html
			.replace(/<\/p>/gi, ' ')
			.replace(/<br\s*\/?>/gi, ' ')
			.replace(/<\/li>/gi, ' ')
			.replace(/<[^>]+>/g, ' ')
			.replace(/&nbsp;/gi, ' ')
			.replace(/&amp;/gi, '&'),
	);
}

function extractPrimaryText(html?: string) {
	const text = extractReadableText(html);
	if (!text) return undefined;

	const [firstSentence] = text.split(/(?<=[.!?])\s+/);
	return firstSentence ?? text;
}

function normalizeText(value: string) {
	return value.replace(/\s+/g, ' ').trim();
}
