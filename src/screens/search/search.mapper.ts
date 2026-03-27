import { Season, SportType, TodaySportType } from '../../../backend/models/fixtures.models';
import {
	SearchLeagueCardViewModel,
	SearchScreenDataViewModel,
	SearchSportChipViewModel,
} from './search.types';

const SPORT_COLOR_MAP: Record<string, string> = {
	futebol: '#F4F7FF',
	basquete: '#FF8B38',
	tenis: '#CFF249',
	volei: '#D6DCEB',
};

function normalizeText(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();
}

function getSportSlug(sport: Pick<TodaySportType, 'stN' | 'stSURL'>) {
	return normalizeText(sport.stSURL ?? sport.stN);
}

function getSportColor(slug: string) {
	return SPORT_COLOR_MAP[slug] ?? '#38E67D';
}

function formatMatchSubtitle(matchCount: number) {
	return `${matchCount} ${matchCount === 1 ? 'jogo hoje' : 'jogos hoje'}`;
}

function getLeagueDisplayTitle(season: Pick<Season, 'seaN' | 'lName' | 'leagueName'>) {
	const rawTitle = season.seaN ?? season.lName ?? season.leagueName ?? '';

	return rawTitle.replace(/\s+\d{4}(?:\/\d{2})?$/, '').trim();
}

function getTotalOddsCount(leaguesOdds: Array<number | undefined>) {
	return leaguesOdds.reduce<number>((total, value) => total + (value ?? 0), 0);
}

function mapSportChip(sport: TodaySportType): SearchSportChipViewModel {
	const slug = getSportSlug(sport);

	return {
		id: String(sport.stId),
		label: sport.stN,
		slug,
		accentColor: getSportColor(slug),
	};
}

function mapLeagueCards(sports: SportType[]) {
	return sports.flatMap((sport) => {
		const sportSlug = getSportSlug(sport);
		const sportLabel = sport.stN;

		return (
			sport.cs?.flatMap((category) =>
				(category.sns ?? []).map((season) => {
					const fixtures = season.fs ?? [];
					const title = getLeagueDisplayTitle(season);
					const searchTerms = [
						title,
						season.seaN,
						season.lName,
						season.leagueName,
						category.cN,
						sportLabel,
						...fixtures.flatMap((fixture) => [fixture.hcN, fixture.acN, fixture.name]).filter(Boolean),
					]
						.filter((value): value is string => Boolean(value))
						.map(normalizeText);

					return {
						id: `${sport.stId}-${season.sId}`,
						title,
						subtitle: formatMatchSubtitle(fixtures.length),
						sportSlug,
						sportLabel,
						categoryLabel: category.cN,
						matchCount: fixtures.length,
						totalOdds: getTotalOddsCount(
							fixtures.map((fixture) =>
								fixture.btgs?.reduce<number>(
									(sum, group) => sum + (group.fos?.length ?? 0),
									0,
								) ?? 0,
							),
						),
						isLive: fixtures.some((fixture) => fixture.lSt),
						searchTerms,
					} satisfies SearchLeagueCardViewModel;
				}),
			) ?? []
		);
	});
}

export function mapSearchScreenData(params: {
	todaySports: TodaySportType[];
	sports: SportType[];
}): SearchScreenDataViewModel {
	const sports = params.todaySports.map(mapSportChip);
	const leagues = mapLeagueCards(params.sports).sort((left, right) => {
		if (left.isLive !== right.isLive) return left.isLive ? -1 : 1;
		if (left.matchCount !== right.matchCount) return right.matchCount - left.matchCount;
		if (left.totalOdds !== right.totalOdds) return right.totalOdds - left.totalOdds;
		return left.title.localeCompare(right.title);
	});

	return {
		sports,
		leagues,
	};
}

export function filterLeaguesBySport(
	leagues: SearchLeagueCardViewModel[],
	selectedSportSlug: string,
) {
	const scopedLeagues = leagues.filter((league) => league.sportSlug === selectedSportSlug);

	return scopedLeagues.length ? scopedLeagues : leagues;
}

export function getTrendingTopics(
	leagues: SearchLeagueCardViewModel[],
	selectedSportSlug: string,
	limit = 6,
) {
	return Array.from(
		new Set(filterLeaguesBySport(leagues, selectedSportSlug).map((league) => league.title)),
	).slice(0, limit);
}

export function getHighlightedLeagues(
	leagues: SearchLeagueCardViewModel[],
	selectedSportSlug: string,
	limit = 4,
) {
	return filterLeaguesBySport(leagues, selectedSportSlug).slice(0, limit);
}

export function matchesLeagueSearch(league: SearchLeagueCardViewModel, searchValue: string) {
	const normalizedSearchValue = normalizeText(searchValue);

	if (!normalizedSearchValue) return true;

	return league.searchTerms.some((term) => term.includes(normalizedSearchValue));
}
