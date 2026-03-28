import React, { useCallback } from 'react';
import { Switch, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { useStampdUI, ThemeMode } from 'stampd/context';
import { Styled } from 'stampd/styled';
import { ChevronLeft } from 'lucide-react-native';
import { useAppNavigation } from '@/navigation/hooks';
import { lightColors } from '@/stampd.config';
import { savePreferences } from '@/core/preferences/preferences.storage';

const SetS = {
	container: Styled.View({
		style: ({ theme }) => ({
			flex: 1,
			backgroundColor: theme.colors.background,
		}),
	}),

	header: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: theme.spacing.p5,
			paddingBottom: theme.spacing.p4,
			borderBottomWidth: 1,
			borderBottomColor: 'rgba(160,160,200,0.12)',
			gap: theme.spacing.gap3,
		}),
	}),

	headerTitle: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.lg,
			color: theme.colors.textPrimary,
			flex: 1,
		}),
	}),

	section: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p5,
			paddingTop: theme.spacing.p5,
		}),
	}),

	sectionTitle: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
			fontFamily: theme.fonts.family.medium,
			letterSpacing: 0.6,
			textTransform: 'uppercase',
			marginBottom: theme.spacing.p3,
		}),
	}),

	row: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: theme.colors.bgCard,
			paddingHorizontal: theme.spacing.p4,
			paddingVertical: theme.spacing.p4,
			borderRadius: theme.radius.roundedLg,
		}),
	}),

	rowText: Styled.View({
		style: { flex: 1 },
	}),

	rowLabel: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: theme.fonts.sizes.sm,
			color: theme.colors.textPrimary,
		}),
	}),

	rowSubtitle: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
			marginTop: 2,
		}),
	}),
};

export default function SettingsScreen() {
	const insets = useSafeAreaInsets();
	const { goBack } = useAppNavigation();
	const { themeMode, setThemeMode, highContrast, setHighContrast } = useStampdUI();

	const isDark = themeMode !== ThemeMode.LIGHT;
	const isHighContrast = highContrast;

	const handleDarkToggle = useCallback(
		(value: boolean) => {
			const newMode = value ? ThemeMode.DARK : ThemeMode.LIGHT;
			setThemeMode(newMode);
			savePreferences({ themeMode: newMode, highContrast: isHighContrast });
		},
		[setThemeMode, isHighContrast]
	);

	const handleHighContrastToggle = useCallback(
		(value: boolean) => {
			setHighContrast(value);
			savePreferences({ themeMode: themeMode as string, highContrast: value });
		},
		[setHighContrast, themeMode]
	);

	return (
		<SetS.container>
			<SetS.header style={{ paddingTop: Math.max(insets.top, 16) + 8 }}>
				<TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.7}>
					<ChevronLeft size={RFValue(24)} color={lightColors.textPrimary} strokeWidth={2} />
				</TouchableOpacity>
				<SetS.headerTitle>Configurações</SetS.headerTitle>
			</SetS.header>

			<SetS.section>
				<SetS.sectionTitle>Aparência</SetS.sectionTitle>

				<View style={styles.rows}>
					{/* <SetS.row>
						<SetS.rowText>
							<SetS.rowLabel>Modo escuro</SetS.rowLabel>
							<SetS.rowSubtitle>Alterna entre tema claro e escuro</SetS.rowSubtitle>
						</SetS.rowText>
						<Switch
							value={isDark}
							onValueChange={handleDarkToggle}
							trackColor={{ false: 'rgba(160,160,200,0.2)', true: lightColors.accent }}
							thumbColor="#fff"
						/>
					</SetS.row> */}

					<SetS.row>
						<SetS.rowText>
							<SetS.rowLabel>Alto contraste</SetS.rowLabel>
							<SetS.rowSubtitle>Aumenta o contraste para maior legibilidade</SetS.rowSubtitle>
						</SetS.rowText>
						<Switch
							value={isHighContrast}
							onValueChange={handleHighContrastToggle}
							trackColor={{ false: 'rgba(160,160,200,0.2)', true: lightColors.accent }}
							thumbColor="#fff"
						/>
					</SetS.row>
				</View>
			</SetS.section>
		</SetS.container>
	);
}

const styles = StyleSheet.create({
	backBtn: {
		padding: RFValue(4),
	},
	rows: {
		gap: RFValue(8),
	},
});
