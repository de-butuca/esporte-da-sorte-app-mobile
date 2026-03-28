import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft } from 'lucide-react-native';
import { ButtonBase } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { fontFamily, lightColors } from '@/stampd.config';
import { PromotionCard } from './components/PromotionCard';
import { PromotionFilterChips } from './components/PromotionFilterChips';
import { PromotionsHero } from './components/PromotionsHero';
import { PromotionsLegalCard } from './components/PromotionsLegalCard';
import { PromotionsSupportCard } from './components/PromotionsSupportCard';
import { PromotionCardViewModel } from './promotions.types';
import { usePromotionsViewModel } from './viewmodel';

export default function PromotionsScreen() {
	const insets = useSafeAreaInsets();
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
		<View style={[styles.root, { paddingTop: insets.top + RFValue(10) }]}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
					<ArrowLeft size={RFValue(18)} color={lightColors.textPrimary} strokeWidth={2.2} />
				</TouchableOpacity>

				<View style={styles.headerCopy}>
					<Text style={styles.headerTitle}>{screen?.headerTitle ?? 'Promoções'}</Text>
					<Text style={styles.headerDescription}>
						{screen?.headerDescription ?? 'Campanhas especiais, bônus e benefícios pensados para o seu jogo no mobile.'}
					</Text>
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
						<View style={styles.headerContent}>
							{screen.hero && <PromotionsHero hero={screen.hero} onPress={handleOpenPromotion} />}
							<PromotionFilterChips
								filters={screen.filters}
								selectedFilter={selectedCategory}
								onSelectFilter={setSelectedCategory}
							/>
							<SectionHeader title="Promoções ativas" />
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
							<PromotionsSupportCard support={screen.support} onPress={handleOpenSupport} />
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
		backgroundColor: lightColors.background,
	},
	header: {
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(10),
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: RFValue(14),
	},
	backButton: {
		width: RFValue(36),
		height: RFValue(36),
		borderRadius: RFValue(12),
		backgroundColor: 'rgba(255,255,255,0.08)',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: RFValue(4),
	},
	headerCopy: {
		flex: 1,
		paddingTop: RFValue(2),
	},
	headerTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(24),
		color: lightColors.textPrimary,
		marginBottom: RFValue(4),
	},
	headerDescription: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		maxWidth: '95%',
	},
	listContent: {
		paddingBottom: RFValue(28),
	},
	headerContent: {
		gap: RFValue(18),
		paddingBottom: RFValue(6),
	},
	separator: {
		height: RFValue(16),
	},
	footerStack: {
		gap: RFValue(16),
		paddingTop: RFValue(16),
	},
	footerCard: {
		marginHorizontal: RFValue(20),
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
		paddingHorizontal: RFValue(20),
		paddingTop: RFValue(12),
		gap: RFValue(16),
	},
	loadingHero: {
		height: RFValue(162),
		borderRadius: RFValue(18),
		backgroundColor: '#111B36',
	},
	loadingChips: {
		flexDirection: 'row',
		gap: RFValue(10),
	},
	loadingChipLarge: {
		width: RFValue(88),
		height: RFValue(40),
		borderRadius: RFValue(14),
		backgroundColor: '#111B36',
	},
	loadingChip: {
		width: RFValue(72),
		height: RFValue(40),
		borderRadius: RFValue(14),
		backgroundColor: '#111B36',
	},
	loadingCard: {
		height: RFValue(298),
		borderRadius: RFValue(18),
		backgroundColor: '#111B36',
	},
	feedbackCard: {
		marginHorizontal: RFValue(20),
		marginTop: RFValue(20),
		padding: RFValue(20),
		borderRadius: RFValue(18),
		backgroundColor: '#111B36',
		alignItems: 'center',
	},
	feedbackTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		color: lightColors.textPrimary,
		textAlign: 'center',
		marginBottom: RFValue(8),
	},
	feedbackDescription: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
	},
	feedbackButtonWrap: {
		width: '100%',
		marginTop: RFValue(18),
	},
});
