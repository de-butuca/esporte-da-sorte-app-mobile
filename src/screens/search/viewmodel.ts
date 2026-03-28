import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	IFixturesService,
	MockFixturesService,
} from '../../../backend/services/fixtures.service';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import {
	filterLeaguesBySport,
	getHighlightedLeagues,
	getTrendingTopics,
	mapSearchScreenData,
	matchesLeagueSearch,
} from './search.mapper';
import { SearchLeagueCardViewModel } from './search.types';

const fixturesService: IFixturesService = new MockFixturesService();

const SEARCH_CONTEXT = {
	device: 'm',
	language: 'pt-BR',
	trader: '102',
} as const;

async function getSearchScreenData() {
	const [todaySportsResponse, searchableSportsResponse] = await Promise.all([
		fixturesService.getTodaySportTypes(
			SEARCH_CONTEXT.device,
			SEARCH_CONTEXT.language,
			SEARCH_CONTEXT.trader,
		),
		fixturesService.searchFixtures(
			SEARCH_CONTEXT.device,
			SEARCH_CONTEXT.language,
			SEARCH_CONTEXT.trader,
		),
	]);

	return mapSearchScreenData({
		todaySports: todaySportsResponse.data ?? [],
		sports: searchableSportsResponse.data ?? [],
	});
}

function addRecentSearch(
	currentSearches: string[],
	searchValue: string,
): string[] {
	const normalizedValue = searchValue.trim();

	if (!normalizedValue) return currentSearches;

	return [normalizedValue, ...currentSearches.filter((item) => item !== normalizedValue)].slice(0, 5);
}

export function useSearchViewModel() {
	const navigation = useAppNavigation();
	const route = useAppRoute<'Search'>();
	const { requireAuth } = useRequireAuth();
	const [searchValue, setSearchValue] = useState('');
	const [selectedSportSlug, setSelectedSportSlug] = useState(route.params?.initialSportSlug ?? '');
	const [recentSearches, setRecentSearches] = useState<string[]>([]);

	const query = useQuery({
		queryKey: ['search-screen', SEARCH_CONTEXT.device, SEARCH_CONTEXT.language],
		queryFn: getSearchScreenData,
	});

	const activeSportSlug = useMemo(() => {
		if (!query.data?.sports.length) return '';

		const hasSelectedSport = query.data.sports.some((sport) => sport.slug === selectedSportSlug);
		return hasSelectedSport ? selectedSportSlug : query.data.sports[0].slug;
	}, [query.data?.sports, selectedSportSlug]);

	const scopedLeagues = useMemo(
		() => filterLeaguesBySport(query.data?.leagues ?? [], activeSportSlug),
		[activeSportSlug, query.data?.leagues],
	);

	const trimmedSearchValue = searchValue.trim();

	const searchResults = useMemo(() => {
		if (!trimmedSearchValue) return [];

		return scopedLeagues.filter((league) => matchesLeagueSearch(league, trimmedSearchValue));
	}, [scopedLeagues, trimmedSearchValue]);

	const highlightedLeagues = useMemo(
		() => getHighlightedLeagues(query.data?.leagues ?? [], activeSportSlug),
		[activeSportSlug, query.data?.leagues],
	);

	const trendingTopics = useMemo(
		() => getTrendingTopics(query.data?.leagues ?? [], activeSportSlug),
		[activeSportSlug, query.data?.leagues],
	);

	function handleBack() {
		if (navigation.canGoBack()) {
			navigation.goBack();
			return;
		}

		navigation.navigate('Home');
	}

	function persistRecentSearch(searchTerm: string) {
		setRecentSearches((currentSearches) => addRecentSearch(currentSearches, searchTerm));
	}

	function handleSearchChange(value: string) {
		setSearchValue(value);
	}

	function handleClearSearch() {
		setSearchValue('');
	}

	function handleSubmitSearch() {
		persistRecentSearch(trimmedSearchValue);
	}

	function handleSelectSport(slug: string) {
		setSelectedSportSlug(slug);
	}

	function handleSelectTrendingTopic(topic: string) {
		setSearchValue(topic);
		persistRecentSearch(topic);
	}

	function handleSelectRecentSearch(searchTerm: string) {
		setSearchValue(searchTerm);
	}

	function handleClearRecentSearches() {
		setRecentSearches([]);
	}

	function handleOpenLeague(league: SearchLeagueCardViewModel) {
		persistRecentSearch(league.title);
		requireAuth(() => {
			navigation.navigate('GameHome');
		});
	}

	return {
		title: 'Pesquisa',
		searchValue,
		trimmedSearchValue,
		sports: query.data?.sports ?? [],
		activeSportSlug,
		searchResults,
		highlightedLeagues,
		trendingTopics,
		recentSearches,
		hasTypedSearch: Boolean(trimmedSearchValue),
		isLoading: query.isLoading,
		isError: query.isError,
		refetch: query.refetch,
		handleBack,
		handleSearchChange,
		handleClearSearch,
		handleSubmitSearch,
		handleSelectSport,
		handleSelectTrendingTopic,
		handleSelectRecentSearch,
		handleClearRecentSearches,
		handleOpenLeague,
	};
}
