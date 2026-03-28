import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BannerCarousel } from './components/BannerCarousel';
import { GameRow } from './components/GameRow';
import { PromoBanner } from './components/PromoBanner';
import { SectionHeader } from './components/SectionHeader';
import { useAuthGuard } from '@/core/auth/useAuthGuard';
import { HCS } from './homeCassino.styled';
import { useHomeCassinoViewModel } from './viewmodel';
import { lightColors } from '@/stampd.config';
import { ButtonBase } from '@/components/Button';

export function HomeCassino() {
	const { requireAuth } = useAuthGuard();
	const { sections, isLoading, isError, refetch } = useHomeCassinoViewModel();

	const handleGamePress = useCallback(
		(gameId: string) => {
			requireAuth(() => {
				if (__DEV__) console.log('opening-casino-game', gameId);
			});
		},
		[requireAuth],
	);

	return (
		<>
			<BannerCarousel />

			{isLoading ? (
				<View style={styles.feedbackCard}>
					<ActivityIndicator size="large" color={lightColors.accent} />
					<Text style={styles.feedbackTitle}>Carregando cassino</Text>
					<Text style={styles.feedbackDescription}>Preparando categorias, tags e jogos do mock.</Text>
				</View>
			) : null}

			{!isLoading && isError ? (
				<View style={styles.feedbackCard}>
					<Text style={styles.feedbackTitle}>Nao foi possivel carregar o cassino</Text>
					<Text style={styles.feedbackDescription}>Tente novamente para recarregar os jogos mockados.</Text>
					<ButtonBase
						text="Tentar novamente"
						size="sm"
						variant="accent"
						onPress={() => {
							void refetch();
						}}
					/>
				</View>
			) : null}

			{!isLoading && !isError
				? sections.map((section, index) => (
						<HCS.section key={section.id}>
							<SectionHeader title={section.title} count={section.count} hasLive={section.hasLive} />
							{section.games.length ? (
								<GameRow
									games={section.games}
									cardWidth={section.hasLive ? RFValue(95) : undefined}
									onGamePress={handleGamePress}
								/>
							) : (
								<View style={styles.emptyCard}>
									<Text style={styles.emptyText}>{section.emptyLabel}</Text>
								</View>
							)}
							{index === 1 ? <PromoBanner /> : null}
						</HCS.section>
					))
				: null}

			<HCS.bottomSpacer />
		</>
	);
}

const styles = StyleSheet.create({
	feedbackCard: {
		marginHorizontal: RFValue(20),
		borderRadius: RFValue(18),
		backgroundColor: '#1A2336',
		paddingHorizontal: RFValue(20),
		paddingVertical: RFValue(24),
		alignItems: 'center',
		gap: RFValue(10),
	},
	feedbackTitle: {
		fontSize: RFValue(16),
		fontWeight: '700',
		color: lightColors.textPrimary,
		textAlign: 'center',
	},
	feedbackDescription: {
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
	},
	emptyCard: {
		marginHorizontal: RFValue(20),
		borderRadius: RFValue(16),
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(18),
		backgroundColor: lightColors.bgCard,
	},
	emptyText: {
		fontSize: RFValue(12),
		color: lightColors.textMuted,
	},
});
