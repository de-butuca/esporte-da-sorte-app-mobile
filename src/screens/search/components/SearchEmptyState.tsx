import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Search } from 'lucide-react-native';
import { ButtonBase } from '@/components/Button';
import { fontFamily, lightColors } from '@/stampd.config';

interface SearchEmptyStateProps {
	onClearSearch: () => void;
}

export function SearchEmptyState({ onClearSearch }: SearchEmptyStateProps) {
	return (
		<View style={styles.card}>
			<View style={styles.iconWrap}>
				<Search size={RFValue(28)} color={lightColors.textSecondary} strokeWidth={2.1} />
			</View>
			<Text style={styles.title}>Nenhum resultado encontrado</Text>
			<Text style={styles.description}>
				Tente buscar por outro termo ou categoria.
			</Text>
			<ButtonBase
				text="Limpar busca"
				size="sm"
				variant="accent"
				onPress={onClearSearch}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#1A2336',
		borderRadius: RFValue(18),
		paddingHorizontal: RFValue(24),
		paddingVertical: RFValue(28),
		alignItems: 'center',
		gap: RFValue(12),
	},
	iconWrap: {
		width: RFValue(54),
		height: RFValue(54),
		borderRadius: RFValue(27),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.04)',
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		color: lightColors.textPrimary,
		textAlign: 'center',
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
		marginBottom: RFValue(2),
	},
});
