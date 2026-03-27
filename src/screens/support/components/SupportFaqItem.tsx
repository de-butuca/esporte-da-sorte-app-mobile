import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { fontFamily, lightColors } from '@/stampd.config';
import { SupportFaqItemViewModel } from '../support.types';

interface SupportFaqItemProps {
	item: SupportFaqItemViewModel;
	isExpanded: boolean;
	isLastItem: boolean;
	onPress: () => void;
}

export function SupportFaqItem({
	item,
	isExpanded,
	isLastItem,
	onPress,
}: SupportFaqItemProps) {
	return (
		<View style={[styles.item, !isLastItem && styles.itemBorder]}>
			<TouchableOpacity style={styles.header} onPress={onPress} activeOpacity={0.8}>
				<Text style={styles.question}>{item.question}</Text>
				{isExpanded ? (
					<ChevronUp size={RFValue(18)} color={lightColors.textMuted} strokeWidth={2.2} />
				) : (
					<ChevronDown size={RFValue(18)} color={lightColors.textMuted} strokeWidth={2.2} />
				)}
			</TouchableOpacity>

			{isExpanded && <Text style={styles.answer}>{item.answer}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		paddingHorizontal: RFValue(18),
		paddingVertical: RFValue(20),
	},
	itemBorder: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255,255,255,0.06)',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: RFValue(12),
	},
	question: {
		flex: 1,
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		lineHeight: RFValue(22),
		color: lightColors.textPrimary,
	},
	answer: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(20),
		color: lightColors.textMuted,
		marginTop: RFValue(16),
		paddingRight: RFValue(8),
	},
});
