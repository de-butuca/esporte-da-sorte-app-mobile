import { Styled } from 'stampd/styled';

export const RES = {
	background: Styled.ImageBackground({
		style: {
			flex: 1,
		},
	}),

	gradient: Styled.View({
		style: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
	}),

	content: Styled.View({
		style: {
			flex: 1,
			justifyContent: 'space-between',
			zIndex: 1,
		},
	}),

	header: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: theme.spacing.p4,
			zIndex: 20,
		}),
	}),

	branding: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.p2,
		}),
	}),

	statusIndicator: Styled.View({
		style: ({ theme }) => ({
			width: 12,
			height: 12,
			borderRadius: theme.radius.roundedFull,
			backgroundColor: theme.colors.accent,
		}),
	}),

	brandText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.sm,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.textPrimary,
		}),
	}),

	brandSubtext: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
		}),
	}),

	closeButton: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			padding: theme.spacing.p2,
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	matchInfo: Styled.View({
		style: ({ theme }) => ({
			flex: 1,
			paddingHorizontal: theme.spacing.p4,
			paddingVertical: theme.spacing.p4,
			gap: theme.spacing.p3,
			justifyContent: 'flex-end',
		}),
	}),

	leagueLabel: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			fontFamily: theme.fonts.family.medium,
			color: theme.colors.textMuted,
			textTransform: 'uppercase',
			letterSpacing: 0.5,
		}),
	}),

	teamMatchup: Styled.View({
		style: ({ theme }) => ({
			gap: theme.spacing.p2,
		}),
	}),

	teamName: Styled.Text({
		style: ({ theme }) => ({
			fontSize: 48,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.textPrimary,
			lineHeight: 56,
		}),
	}),

	versus: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.lg,
			fontFamily: theme.fonts.family.regular,
			color: theme.colors.textSecondary,
		}),
	}),

	timeContainer: Styled.View({
		style: ({ theme }) => ({
			marginTop: theme.spacing.p2,
			gap: theme.spacing.p1,
		}),
	}),

	timeText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.textSecondary,
		}),
	}),

	countdownBadge: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.p2,
			borderWidth: 2,
			borderColor: theme.colors.accent,
			borderRadius: theme.radius.roundedMd,
			paddingHorizontal: theme.spacing.p4,
			paddingVertical: theme.spacing.p3,
			marginVertical: theme.spacing.p3,
		}),
	}),

	countdownText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.lg,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.accent,
		}),
	}),

	infoContainer: Styled.View({
		style: ({ theme }) => ({
			gap: theme.spacing.p2,
		}),
	}),

	infoRow: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.p2,
		}),
	}),

	infoText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.sm,
			color: theme.colors.textSecondary,
		}),
	}),

	buttonsContainer: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			gap: theme.spacing.p3,
			marginTop: theme.spacing.p4,
		}),
	}),

	buttonOutline: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flex: 1,
			paddingVertical: theme.spacing.p3,
			borderRadius: theme.radius.roundedMd,
			borderWidth: 2,
			borderColor: theme.colors.accent,
			backgroundColor: 'transparent',
			alignItems: 'center',
		}),
		attrs: { activeOpacity: 0.85 },
	}),

	buttonFilled: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flex: 1,
			paddingVertical: theme.spacing.p3,
			borderRadius: theme.radius.roundedMd,
			backgroundColor: theme.colors.accent,
			alignItems: 'center',
		}),
		attrs: { activeOpacity: 0.85 },
	}),

	buttonTextOutline: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.base,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.accent,
		}),
	}),

	buttonTextFilled: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.base,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.background,
		}),
	}),

	buttonReminderActive: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flex: 1,
			paddingVertical: theme.spacing.p3,
			borderRadius: theme.radius.roundedMd,
			borderWidth: 2,
			borderColor: theme.colors.accent,
			backgroundColor: theme.colors.accent,
			alignItems: 'center',
		}),
		attrs: { activeOpacity: 0.85 },
	}),

	buttonReminderActiveText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.base,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.background,
		}),
	}),

	container: Styled.View({
		style: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	}),

	noMatchText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			fontFamily: theme.fonts.family.medium,
			color: theme.colors.textMuted,
			textTransform: 'uppercase',
		}),
	}),
};
