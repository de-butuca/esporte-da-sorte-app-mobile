import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
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
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={[styles.item, !isLastItem && styles.itemBorder]}>
			<TouchableOpacity style={styles.header} onPress={onPress} activeOpacity={0.8}>
				<Text style={[styles.question, { color: colors.textPrimary }]}>{item.question}</Text>
				{isExpanded ? (
					<ChevronUp size={RFValue(18)} color={colors.textMuted} strokeWidth={2.2} />
				) : (
					<ChevronDown size={RFValue(18)} color={colors.textMuted} strokeWidth={2.2} />
				)}
			</TouchableOpacity>

			{isExpanded && <Text style={[styles.answer, { color: colors.textMuted }]}>{item.answer}</Text>}
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
		fontFamily: fontFamily.semibold,
		fontSize: 14,
		lineHeight: 21,
	},
	answer: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(20),
		marginTop: RFValue(16),
		paddingRight: RFValue(8),
	},
});
