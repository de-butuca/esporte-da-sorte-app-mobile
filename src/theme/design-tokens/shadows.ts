import { Platform } from 'react-native';

export const shadows = {
	/** Sombra sutil — cards, inputs */
	level1: Platform.select({
		ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 },
		android: { elevation: 2 },
	}),
	/** Sombra média — botões, chips */
	level2: Platform.select({
		ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4 },
		android: { elevation: 4 },
	}),
	/** Sombra elevada — modais, dropdowns */
	level3: Platform.select({
		ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.16, shadowRadius: 8 },
		android: { elevation: 8 },
	}),
	/** Sombra forte — bottom sheets, overlays */
	level4: Platform.select({
		ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12 },
		android: { elevation: 16 },
	}),
};
