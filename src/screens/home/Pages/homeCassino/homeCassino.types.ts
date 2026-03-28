export type CasinoGameBadge = 'live' | 'new' | 'none';

export interface CasinoHomeGameViewModel {
	id: string;
	name: string;
	provider: string;
	image: string | number;
	badge?: CasinoGameBadge;
	players?: string;
}

export interface CasinoHomeSectionViewModel {
	id: string;
	title: string;
	count?: number;
	hasLive?: boolean;
	games: CasinoHomeGameViewModel[];
	emptyLabel: string;
}

export interface CasinoHomeScreenViewModel {
	sections: CasinoHomeSectionViewModel[];
}
