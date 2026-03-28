import { Styled } from 'stampd/styled';

// ── GameCard ──────────────────────────────────────────────────────────────────
export const GCS = {
	container: Styled.TouchableOpacity({
		style: ({ width }: { theme: any; width?: number }) => ({ gap: 6, width }),
		attrs: { activeOpacity: 0.8 },
	}),

	thumbnail: Styled.View({
		style: ({ theme, width }: { theme: any; width?: number }) => ({
			width,
			height: 130,
			borderRadius: theme.radius.roundedXl,
			overflow: 'hidden',
			backgroundColor: theme.colors.bgCard,
		}),
	}),

	badge: Styled.View({
		style: ({ theme }) => ({
			position: 'absolute',
			top: theme.size.s2,
			left: theme.size.s2,
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: theme.spacing.p2,
			paddingVertical: theme.spacing.p1,
			borderRadius: theme.radius.roundedMd,
			gap: theme.spacing.gap1,
		}),
		variants: {
			type: {
				live: ({ theme }) => ({ backgroundColor: theme.colors.live }),
				new: ({ theme }) => ({ backgroundColor: theme.colors.accent }),
			},
		},
	}),

	liveIndicator: Styled.View({
		style: ({ theme }) => ({
			width: 5,
			height: 5,
			borderRadius: 3,
			backgroundColor: theme.colors.textPrimary,
		}),
	}),

	badgeText: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: 9,
		}),
		variants: {
			type: {
				live: ({ theme }) => ({ color: theme.colors.textPrimary }),
				new: ({ theme }) => ({ color: theme.colors.bgNav }),
			},
		},
	}),

	players: Styled.View({
		style: ({ theme }) => ({
			position: 'absolute',
			bottom: theme.size.s2,
			left: theme.size.s2,
			backgroundColor: 'rgba(0,0,0,0.5)',
			paddingHorizontal: theme.spacing.p2,
			paddingVertical: 3,
			borderRadius: 20,
		}),
	}),

	playersText: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: 8,
			color: theme.colors.textPrimary,
		}),
	}),

	name: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: 11,
			color: theme.colors.textPrimary,
		}),
	}),

	provider: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: 9,
			color: theme.colors.textMuted,
		}),
	}),
};

// ── SectionHeader ─────────────────────────────────────────────────────────────
export const SHS = {
	container: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: theme.spacing.p5,
		}),
	}),

	titleRow: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.gap2,
		}),
	}),

	liveDot: Styled.View({
		style: ({ theme }) => ({
			width: theme.size.s2,
			height: theme.size.s2,
			borderRadius: theme.radius.rounded,
			backgroundColor: theme.colors.live,
		}),
	}),

	title: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xl,
			color: theme.colors.textPrimary,
		}),
	}),

	seeAll: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.sm,
			color: theme.colors.accent,
		}),
	}),
};

// ── PromoBanner ───────────────────────────────────────────────────────────────
export const PBS = {
	wrapper: Styled.View({
		style: ({ theme }) => ({ paddingHorizontal: theme.spacing.p5 }),
	}),

	content: Styled.View({
		style: ({ theme }) => ({
			flex: 1,
			justifyContent: 'center',
			paddingLeft: theme.spacing.p5,
			gap: theme.spacing.gap2,
			zIndex: 1,
		}),
	}),

	subtitle: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: theme.fonts.sizes.xs,
			color: 'rgba(255,255,255,0.8)',
		}),
	}),

	title: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xl2,
			color: theme.colors.textPrimary,
			lineHeight: 24,
		}),
	}),

	button: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			backgroundColor: theme.colors.accent,
			paddingHorizontal: theme.spacing.p5,
			paddingVertical: theme.spacing.p2,
			borderRadius: theme.radius.roundedMd,
			alignSelf: 'flex-start',
		}),
		attrs: { activeOpacity: 0.8 },
	}),

	buttonText: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.bgNav,
		}),
	}),
};

// ── BannerCarousel ────────────────────────────────────────────────────────────
export const BCS = {
	container: Styled.View({
		style: ({ theme }) => ({ gap: theme.size.s3 }),
	}),

	bannerContent: Styled.View({
		style: ({ theme }) => ({
			flex: 1,
			justifyContent: 'center',
			paddingLeft: theme.spacing.p5,
			gap: theme.spacing.gap1,
			zIndex: 1,
		}),
	}),

	bannerSubtitle: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: theme.fonts.sizes.xs,
			color: 'rgba(255,255,255,0.8)',
		}),
	}),

	bannerTitle: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: 26,
			color: theme.colors.textPrimary,
			textTransform: 'uppercase',
			lineHeight: 28,
		}),
	}),

	dots: Styled.View({
		style: () => ({
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 6,
		}),
	}),

	dot: Styled.View({
		style: ({ theme, state }: { theme: any; state?: 'active' | 'inactive' }) => ({
			borderRadius: theme.radius.rounded,
			height: theme.size.s1,
			width: state === 'active' ? theme.size.s5 : theme.size.s1,
			backgroundColor: state === 'active' ? theme.colors.accent : 'rgba(160,160,200,0.4)',
		}),
	}),
};

// ── HomeCassino view ──────────────────────────────────────────────────────────
export const HCS = {
	section: Styled.View({
		style: ({ theme }) => ({ gap: theme.size.s3 }),
	}),

	bottomSpacer: Styled.View({
		style: ({ theme }) => ({ height: theme.size.s4 }),
	}),
};

export const GAME_ROW_CONTENT_STYLE = { paddingHorizontal: 20, gap: 12 };
