import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ui } from './theme';

interface ChipProps {
	children: string;
	selected?: boolean;
	icon?: React.ReactNode;
	onPress?: () => void;
	onClose?: () => void;
	disabled?: boolean;
}

export function Chip({
	children,
	selected = false,
	icon,
	onPress,
	onClose,
	disabled = false,
}: ChipProps) {
	const bg = selected ? ui.colors.primary : ui.colors.surface2;
	const textColor = selected ? ui.colors.onPrimary : ui.colors.textPrimary;

	return (
		<TouchableOpacity
			style={[styles.base, { backgroundColor: bg }, disabled && styles.disabled]}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityState={{ selected, disabled }}
		>
			{icon && <View style={styles.iconWrap}>{icon}</View>}
			<Text style={[styles.label, { color: textColor }]}>{children}</Text>
			{onClose && (
				<TouchableOpacity
					onPress={onClose}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					accessibilityLabel="Remover"
				>
					<X size={RFValue(14)} color={textColor} strokeWidth={2} />
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingHorizontal: RFValue(12),
		paddingVertical: RFValue(6),
		borderRadius: ui.radius.full,
		gap: RFValue(6),
	},
	iconWrap: {
		marginRight: RFValue(2),
	},
	label: {
		fontFamily: ui.font.medium,
		fontSize: ui.fontSize.sm,
	},
	disabled: {
		opacity: 0.5,
	},
});
