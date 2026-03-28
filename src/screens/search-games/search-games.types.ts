import { ImageSourcePropType } from 'react-native';

export type GameBadge = 'exclusivo' | 'compra_bonus' | 'novo' | 'live' | 'none';

export interface SearchGame {
	id: string;
	name: string;
	provider: string;
	image: ImageSourcePropType;
	badge: GameBadge;
}
