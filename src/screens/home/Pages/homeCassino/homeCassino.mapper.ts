import {
	CasinoGamesList,
	ReservedCategory,
	ReservedGame,
} from '../../../../../backend/models/casino.models';
import {
	CasinoHomeGameViewModel,
	CasinoHomeScreenViewModel,
	CasinoHomeSectionViewModel,
} from './homeCassino.types';

const GAME_THUMB_1 = require('@assets/images/games/game-thumbnail-1.png');
const GAME_THUMB_2 = require('@assets/images/games/game-thumbnail-2.png');
const GAME_THUMB_3 = require('@assets/images/games/game-thumbnail-3.png');

const PROVIDER_FALLBACKS: Record<number, string> = {
	1001: 'Pragmatic Play',
	1002: 'Spribe',
	1003: 'Evolution',
};

interface MapperInput {
	categories: ReservedCategory[];
	games: ReservedGame[];
	tags: Record<string, string>;
	gamesTags: CasinoGamesList[];
}

export function mapHomeCassinoScreenData({
	categories,
	games,
	tags,
	gamesTags,
}: MapperInput): CasinoHomeScreenViewModel {
	const categoryMap = new Map(categories.map((category) => [category.id, category]));
	const gameTagsMap = new Map(gamesTags.map((item) => [item.gameId, item.tagIds ?? []]));

	const liveGames = games
		.filter((game) => isLiveGame(game, categoryMap.get(game.categoryId), gameTagsMap.get(game.id)))
		.slice(0, 8)
		.map((game, index) => mapGame(game, tags, gameTagsMap.get(game.id), index));

	const trendingGames = games
		.filter((game) => game.popular || hasTag(tags, gameTagsMap.get(game.id), 'Popular'))
		.sort((left, right) => (left.orderBy ?? 0) - (right.orderBy ?? 0))
		.slice(0, 8)
		.map((game, index) => mapGame(game, tags, gameTagsMap.get(game.id), index));

	const newGames = games
		.filter((game) => game.newGame || hasTag(tags, gameTagsMap.get(game.id), 'Novos'))
		.sort((left, right) => (left.orderBy ?? 0) - (right.orderBy ?? 0))
		.slice(0, 8)
		.map((game, index) => mapGame(game, tags, gameTagsMap.get(game.id), index));

	return {
		sections: [
			createSection('live', 'Ao vivo', categoryMap.get(2)?.mobileCount, true, 'Nenhum jogo ao vivo disponivel.', liveGames),
			createSection('trending', 'Cassino em alta', categoryMap.get(10)?.mobileCount, false, 'Nenhum jogo em destaque agora.', trendingGames),
			createSection('new', 'Novos cassinos', undefined, false, 'Nenhum lancamento disponivel.', newGames),
		],
	};
}

function createSection(
	id: string,
	title: string,
	count: number | undefined,
	hasLive: boolean,
	emptyLabel: string,
	games: CasinoHomeGameViewModel[],
): CasinoHomeSectionViewModel {
	return {
		id,
		title,
		count,
		hasLive,
		emptyLabel,
		games,
	};
}

function mapGame(
	game: ReservedGame,
	tags: Record<string, string>,
	tagIds: number[] | undefined,
	index: number,
): CasinoHomeGameViewModel {
	return {
		id: String(game.id),
		name: game.name ?? game.defaultGameName ?? 'Jogo de cassino',
		provider: PROVIDER_FALLBACKS[game.vendorId ?? 0] ?? `Provider ${game.vendorId ?? '--'}`,
		image: game.gameDetails?.dealerImageUrl ?? pickFallbackImage(game, tagIds, index),
		badge: pickBadge(game, tags, tagIds),
		players: buildPlayersLabel(game),
	};
}

function pickBadge(game: ReservedGame, tags: Record<string, string>, tagIds?: number[]) {
	if (game.newGame || hasTag(tags, tagIds, 'Novos')) return 'new';
	if (isLiveFlag(game, tags, tagIds)) return 'live';
	return 'none';
}

function buildPlayersLabel(game: ReservedGame) {
	if (game.gameDetails?.dealer) return `${game.gameDetails.dealer} na mesa`;
	if (game.jackpotAmount) return `Jackpot ${formatCurrency(game.jackpotAmount)}`;
	if (game.minBet) return `Apostas a partir de ${formatCurrency(game.minBet)}`;
	return undefined;
}

function formatCurrency(value: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumFractionDigits: value >= 100 ? 0 : 2,
	}).format(value);
}

function pickFallbackImage(game: ReservedGame, tagIds: number[] | undefined, index: number) {
	if (game.categoryId === 2 || tagIds?.includes(4)) return GAME_THUMB_3;
	if (game.newGame || tagIds?.includes(2)) return GAME_THUMB_2;
	return [GAME_THUMB_1, GAME_THUMB_2, GAME_THUMB_3][index % 3];
}

function hasTag(tags: Record<string, string>, tagIds: number[] | undefined, expectedTag: string) {
	return (tagIds ?? []).some((tagId) => tags[String(tagId)] === expectedTag);
}

function isLiveFlag(game: ReservedGame, tags: Record<string, string>, tagIds?: number[]) {
	return game.categoryId === 2 || hasTag(tags, tagIds, 'Ao Vivo');
}

function isLiveGame(game: ReservedGame, category: ReservedCategory | undefined, tagIds: number[] | undefined) {
	return category?.name === 'Ao Vivo' || game.categoryId === 2 || tagIds?.includes(4);
}
