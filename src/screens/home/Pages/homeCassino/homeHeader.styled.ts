import { Styled } from 'stampd/styled';

// ── HomeHeader ─────────────────────────────────────────────────────────────────
export const HHS = {
	topRow: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: theme.size.s2,
		}),
	}),

	actions: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.gap4,
		}),
	}),

	iconBtn: Styled.TouchableOpacity({
		style: ({ theme }) => ({ padding: theme.spacing.p1 }),
		attrs: { activeOpacity: 0.7 },
	}),

	entrarBtn: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			backgroundColor: theme.colors.accent,
			paddingHorizontal: theme.spacing.p5,
			paddingVertical: 10,
			borderRadius: 10,
		}),
		attrs: { activeOpacity: 0.8 },
	}),

	entrarText: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.bgNav,
			letterSpacing: 0.1,
		}),
	}),

	categoryTabs: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			backgroundColor: 'rgba(255,255,255,0.08)',
			borderRadius: theme.radius.roundedLg,
			padding: theme.spacing.p1,
			marginTop: theme.spacing.p4,
		}),
	}),

	categoryTab: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: 10,
			borderRadius: 10,
			gap: theme.spacing.gap2,
			zIndex: 1,
		}),
		attrs: { activeOpacity: 0.8 },
	}),

	categoryLabel: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
			letterSpacing: 0.08,
		}),
	}),

	categoryLabelActive: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textPrimary,
			letterSpacing: 0.08,
		}),
	}),
};
