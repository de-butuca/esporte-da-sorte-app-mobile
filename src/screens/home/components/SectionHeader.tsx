import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/theme/design-tokens';

interface SectionHeaderProps {
	title: string;
	count?: number;
	hasLive?: boolean;
	onSeeAll?: () => void;
}

export function SectionHeader({ title, count, hasLive, onSeeAll }: SectionHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.titleRow}>
				{hasLive && <View style={styles.liveDot} />}
				<Text style={styles.title}>{title}</Text>
			</View>
			{count !== undefined && (
				<TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
					<Text style={styles.seeAll}>{`Ver todos (${count}) >`}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: RFValue(20),
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(8),
	},
	liveDot: {
		width: RFValue(10),
		height: RFValue(10),
		borderRadius: RFValue(5),
		backgroundColor: '#FF3B3B',
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		color: '#FFFFFF',
	},
	seeAll: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: '#37E67D',
	},
});
