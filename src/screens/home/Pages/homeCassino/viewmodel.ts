import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	ICasinoService,
	MockCasinoService,
} from '../../../../../backend/services/casino.service';
import { mapHomeCassinoScreenData } from './homeCassino.mapper';

const casinoService: ICasinoService = new MockCasinoService();

async function getHomeCassinoScreenData() {
	const [categoriesResponse, gamesResponse, tagsResponse, gamesTagsResponse] = await Promise.all([
		casinoService.getReservedCategories(),
		casinoService.getReservedGames(),
		casinoService.getCasinoTags(),
		casinoService.getCasinoGamesTags(),
	]);

	return mapHomeCassinoScreenData({
		categories: categoriesResponse.categories ?? [],
		games: gamesResponse.games ?? [],
		tags: tagsResponse.map ?? {},
		gamesTags: gamesTagsResponse.list ?? [],
	});
}

export function useHomeCassinoViewModel() {
	const query = useQuery({
		queryKey: ['home-cassino'],
		queryFn: getHomeCassinoScreenData,
	});

	const sections = useMemo(() => query.data?.sections ?? [], [query.data?.sections]);

	return {
		sections,
		isLoading: query.isLoading,
		isError: query.isError,
		refetch: query.refetch,
	};
}
