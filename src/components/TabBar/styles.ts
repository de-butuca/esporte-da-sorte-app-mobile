import { DimensionValue, StyleSheet } from 'react-native';
import { porcentagemWidth, TAB_WIDTH } from './const';

export const stylesTabBar = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 16,
		alignSelf: 'center',

		flexDirection: 'row',
		height: 70,
		backgroundColor: '#111',
		borderRadius: 20,
		width: `${porcentagemWidth * 100}%` as DimensionValue,
		overflow: 'hidden',
	},

	tab: {
		width: TAB_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
	},

	icon: {
		width: 24,
		height: 24,
		backgroundColor: 'white',
		borderRadius: 12,
	},

	label: {
		color: 'white',
		fontSize: 12,
		marginTop: 4,
	},

	indicator: {
		position: 'absolute',
		width: TAB_WIDTH,
		height: 70,
		backgroundColor: '#222',
		borderRadius: 20,
	},
});
