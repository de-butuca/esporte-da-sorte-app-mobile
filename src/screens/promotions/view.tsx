import React, { useCallback } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { Image } from 'expo-image';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { ButtonBase } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { fontFamily, lightColors } from '@/stampd.config';
import Logo from '@assets/esporteDaSorteCompleto.svg';
import { PromotionCard } from './components/PromotionCard';
import { PromotionFilterChips } from './components/PromotionFilterChips';
import { PromotionsHero } from './components/PromotionsHero';
import { PromotionsLegalCard } from './components/PromotionsLegalCard';
import { PromotionsSupportCard } from './components/PromotionsSupportCard';
import { PromotionCardViewModel } from './promotions.types';
import { usePromotionsViewModel } from './viewmodel';
import { useAppNavigation } from '@/navigation/hooks';

const BOLAO_BG = require('@assets/bolaodacopa.png');

export default function PromotionsScreen() {
	const insets = useSafeAreaInsets();
	const navigation = useAppNavigation();
	const {
		screen,
		isLoading,
		isRefreshing,
		isError,
		refetch,
		selectedCategory,
		setSelectedCategory,
		filteredCards,
		handleBack,
		handleOpenPromotion,
		handleOpenTerms,
		handleOpenSupport,
	} = usePromotionsViewModel();

	const renderCard = useCallback(
		({ item }: { item: PromotionCardViewModel }) => <PromotionCard card={item} onPress={handleOpenPromotion} />,
		[handleOpenPromotion]
	);

	const keyExtractor = useCallback((item: PromotionCardViewModel) => item.id, []);
	const renderSeparator = useCallback(() => <View style={styles.separator} />, []);
	const refreshList = useCallback(() => {
		void refetch();
	}, [refetch]);

	return (
		<View style={styles.root}>
			<View style={[styles.header, { paddingTop: insets.top }]}>
				<View style={styles.headerRow}>
					<TouchableOpacity onPress={handleBack} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
						<ArrowLeft size={RFValue(20)} color="#FFFFFF" strokeWidth={2} />
					</TouchableOpacity>
					<Logo width={149} height={16} />
					<View style={{ width: RFValue(20) }} />
				</View>
			</View>

			{isLoading ? (
				<PromotionsLoadingState />
			) : isError || !screen ? (
				<PromotionsFeedbackState
					title="Não foi possível carregar as promoções"
					description="Verifique sua conexão ou tente novamente em instantes."
					actionLabel="Tentar novamente"
					onAction={refreshList}
				/>
			) : (
				<FlatList
					data={filteredCards}
					renderItem={renderCard}
					keyExtractor={keyExtractor}
					showsVerticalScrollIndicator={false}
					onRefresh={refreshList}
					refreshing={isRefreshing}
					contentContainerStyle={styles.listContent}
					ItemSeparatorComponent={renderSeparator}
					ListHeaderComponent={
						<View style={styles.listHeader}>
							<View style={styles.titleBlock}>
								<Text style={styles.title}>{screen?.headerTitle ?? 'Promoções'}</Text>
								<Text style={styles.subtitle}>
									{screen?.headerDescription ?? 'Campanhas especiais, bônus e benefícios pensados para o seu jogo no mobile.'}
								</Text>
							</View>

							<PromotionFilterChips
								filters={screen.filters}
								selectedFilter={selectedCategory}
								onSelectFilter={setSelectedCategory}
							/>
							<SectionHeader title="Promoções ativas" />

							<View style={styles.bolaoShell}>
								<Image source={BOLAO_BG} style={styles.bolaoHero} contentFit="cover" contentPosition="top" />
								<View style={styles.bolaoBody}>
									<Text style={styles.bolaoTitle}>Bolão Copa 2026</Text>
									<Text style={styles.bolaoBenefit}>Faça seus palpites e concorra a prêmios!</Text>
									<Text style={styles.bolaoDescription}>
										Monte seu bolão da Copa do Mundo 2026. Escolha os vencedores de cada partida e dispute com outros jogadores.
									</Text>
									<View style={styles.bolaoHighlights}>
										<View style={styles.bolaoHighlightRow}>
											<View style={styles.bolaoHighlightDot} />
											<Text style={styles.bolaoHighlightText}>48 partidas para palpitar</Text>
										</View>
										<View style={styles.bolaoHighlightRow}>
											<View style={styles.bolaoHighlightDot} />
											<Text style={styles.bolaoHighlightText}>Ranking entre jogadores</Text>
										</View>
									</View>
									<View style={{ paddingTop: RFValue(6) }}>
										<ButtonBase
											text="Participar agora"
											size="full"
											variant="accent"
											rightIcon={<ChevronRight size={RFValue(16)} color={lightColors.bgNav} strokeWidth={2.3} />}
											onPress={() => navigation.navigate('Bolao')}
										/>
									</View>
								</View>
							</View>
						</View>
					}
					ListEmptyComponent={
						<PromotionsFeedbackState
							title="Nenhuma promoção encontrada"
							description="Não há campanhas para o filtro selecionado agora. Tente outra categoria."
						/>
					}
					ListFooterComponent={
						<View style={styles.footerStack}>
							<PromotionsLegalCard legal={screen.legal} onPress={handleOpenTerms} />
							<View style={styles.supportWrap}>
								<PromotionsSupportCard support={screen.support} onPress={handleOpenSupport} />
							</View>
							<View style={styles.footerCard}>
								<Text style={styles.footerResponsible}>{screen.footer.responsibleText}</Text>
								<Text style={styles.footerAge}>{screen.footer.ageLabel}</Text>
								<Text style={styles.footerInstitutional}>{screen.footer.institutionalText}</Text>
							</View>
						</View>
					}
				/>
			)}
		</View>
	);
}

function PromotionsLoadingState() {
	return (
		<View style={styles.loadingContainer}>
			<View style={styles.loadingHero} />
			<View style={styles.loadingChips}>
				<View style={styles.loadingChipLarge} />
				<View style={styles.loadingChip} />
				<View style={styles.loadingChip} />
			</View>
			<View style={styles.loadingCard} />
			<View style={styles.loadingCard} />
		</View>
	);
}

interface PromotionsFeedbackStateProps {
	title: string;
	description: string;
	actionLabel?: string;
	onAction?: () => void;
}

function PromotionsFeedbackState({ title, description, actionLabel, onAction }: PromotionsFeedbackStateProps) {
	return (
		<View style={styles.feedbackCard}>
			<Text style={styles.feedbackTitle}>{title}</Text>
			<Text style={styles.feedbackDescription}>{description}</Text>
			{actionLabel && onAction && (
				<View style={styles.feedbackButtonWrap}>
					<ButtonBase text={actionLabel} size="full" variant="accent" onPress={onAction} />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#0B1120',
	},
	header: {
		backgroundColor: '#101828',
		paddingHorizontal: 16,
		paddingBottom: RFValue(14),
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: RFValue(14),
	},
	listContent: {
		paddingBottom: RFValue(28),
	},
	listHeader: {
		gap: RFValue(18),
		paddingTop: 32,
		paddingBottom: RFValue(6),
	},
	titleBlock: {
		paddingHorizontal: 16,
		gap: 4,
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: 20,
		lineHeight: 30,
		color: '#FFFFFF',
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 19.5,
		color: '#94A3B8',
	},
	bolaoShell: {
		backgroundColor: '#1A2332',
		borderRadius: 12,
		padding: RFValue(14),
		marginHorizontal: RFValue(20),
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.04)',
	},
	bolaoHero: {
		width: '100%',
		height: RFValue(126),
		borderRadius: 12,
	},
	bolaoBody: {
		paddingTop: RFValue(16),
		gap: RFValue(10),
	},
	bolaoTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(24),
		lineHeight: RFValue(28),
		color: '#FFFFFF',
	},
	bolaoBenefit: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(13),
		color: lightColors.textSecondary,
	},
	bolaoDescription: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
	},
	bolaoHighlights: {
		gap: RFValue(8),
		paddingTop: RFValue(4),
	},
	bolaoHighlightRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(8),
	},
	bolaoHighlightDot: {
		width: RFValue(6),
		height: RFValue(6),
		borderRadius: RFValue(3),
		backgroundColor: lightColors.accent,
	},
	bolaoHighlightText: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		color: lightColors.textSecondary,
	},
	separator: {
		height: RFValue(16),
	},
	supportWrap: {
		paddingHorizontal: 16,
	},
	footerStack: {
		gap: RFValue(16),
		paddingTop: RFValue(16),
	},
	footerCard: {
		marginHorizontal: 16,
		paddingVertical: RFValue(4),
		alignItems: 'center',
	},
	footerResponsible: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
		marginBottom: RFValue(6),
	},
	footerAge: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
		color: lightColors.textSecondary,
		marginBottom: RFValue(6),
	},
	footerInstitutional: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(10),
		lineHeight: RFValue(16),
		color: lightColors.textInactive,
		textAlign: 'center',
	},
	loadingContainer: {
		paddingHorizontal: 16,
		paddingTop: 32,
		gap: RFValue(16),
	},
	loadingHero: {
		height: RFValue(162),
		borderRadius: 12,
		backgroundColor: '#1A2332',
	},
	loadingChips: {
		flexDirection: 'row',
		gap: RFValue(10),
	},
	loadingChipLarge: {
		width: RFValue(88),
		height: RFValue(40),
		borderRadius: 12,
		backgroundColor: '#1A2332',
	},
	loadingChip: {
		width: RFValue(72),
		height: RFValue(40),
		borderRadius: 12,
		backgroundColor: '#1A2332',
	},
	loadingCard: {
		height: RFValue(298),
		borderRadius: 12,
		backgroundColor: '#1A2332',
	},
	feedbackCard: {
		marginHorizontal: 16,
		marginTop: 32,
		padding: RFValue(20),
		borderRadius: 12,
		backgroundColor: '#1A2332',
		alignItems: 'center',
	},
	feedbackTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 18,
		color: '#FFFFFF',
		textAlign: 'center',
		marginBottom: RFValue(8),
	},
	feedbackDescription: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 19.5,
		color: '#94A3B8',
		textAlign: 'center',
	},
	feedbackButtonWrap: {
		width: '100%',
		marginTop: RFValue(18),
	},
});
