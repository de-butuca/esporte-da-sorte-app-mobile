export interface SearchSportChipViewModel {
	id: string;
	label: string;
	slug: string;
	accentColor: string;
}

export interface SearchLeagueCardViewModel {
	id: string;
	title: string;
	subtitle: string;
	sportSlug: string;
	sportLabel: string;
	categoryLabel: string;
	matchCount: number;
	totalOdds: number;
	isLive: boolean;
	searchTerms: string[];
}

export interface SearchScreenDataViewModel {
	sports: SearchSportChipViewModel[];
	leagues: SearchLeagueCardViewModel[];
}
