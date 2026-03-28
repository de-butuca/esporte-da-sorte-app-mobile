import { ImageSourcePropType } from 'react-native';

export type GameBadge = 'exclusivo' | 'compra_bonus' | 'novo' | 'live' | 'none';

export type Volatility = 'low' | 'medium' | 'high';

export interface SearchGame {
	id: string;
	name: string;
	provider: string;
	image: ImageSourcePropType;
	badge: GameBadge;
	tags?: string[];
	volatility?: Volatility;
	rtp?: string;
	lines?: number;
	reels?: number;
}
