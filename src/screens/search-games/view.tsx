import React, { useCallback } from 'react';
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Image } from 'expo-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search as SearchIcon, X, MoreVertical, Star, Zap } from 'lucide-react-native';
import { useStampdUI } from 'stampd/context';
import { AppBottomSheet } from '@/components/BottomSheet';
import { useSearchGamesViewModel } from './search-games.viewmodel';
import type { SearchGame, GameBadge, Volatility } from './search-games.types';

// ── Constants ────────────────────────────────────────────────────────────────

const BADGE_LABELS: Record<GameBadge, string | null> = {
	exclusivo: 'EXCLUSIVO',
	compra_bonus: 'COMPRA DE BÔNUS',
	novo: 'NOVO',
	live: 'AO VIVO',
	none: null,
};

const VOLATILITY_ICONS: Record<Volatility, number> = { low: 1, medium: 2, high: 3 };

// ── Game Grid Card ───────────────────────────────────────────────────────────

function GameGridCard({
	game,
	theme,
	onMorePress,
}: {
	game: SearchGame;
	theme: any;
	onMorePress: (game: SearchGame) => void;
}) {
	const badgeLabel = BADGE_LABELS[game.badge];

	return (
		<View style={styles.cardWrapper}>
			<View style={[styles.cardThumb, { backgroundColor: theme.colors.bgCard }]}>
				<Image source={game.image} style={styles.cardImage} contentFit="cover" />

				{badgeLabel && (
					<View
						style={[
							styles.badge,
							{
								backgroundColor:
									game.badge === 'live'
										? theme.colors.live
										: game.badge === 'exclusivo'
											? '#E11D48'
											: theme.colors.accent,
							},
						]}
					>
						<Text
							style={[
								styles.badgeText,
								{ color: game.badge === 'compra_bonus' ? theme.colors.bgNav : '#FFFFFF' },
							]}
						>
							{badgeLabel}
						</Text>
					</View>
				)}

				<TouchableOpacity
					style={styles.moreBtn}
					activeOpacity={0.7}
					onPress={() => onMorePress(game)}
				>
					<MoreVertical size={RFValue(16)} color="#FFFFFF" strokeWidth={2} />
				</TouchableOpacity>
			</View>
			<Text style={[styles.cardName, { color: theme.colors.textPrimary }]} numberOfLines={1}>
				{game.name}
			</Text>
		</View>
	);
}

// ── Game Details Bottom Sheet Content ─────────────────────────────────────────

function GameDetailsContent({
	game,
	similarGames,
	theme,
}: {
	game: SearchGame;
	similarGames: SearchGame[];
	theme: any;
}) {
	return (
		<View style={styles.detailsContainer}>
			{/* Hero image */}
			<View style={[styles.detailsHero, { backgroundColor: theme.colors.bgCard }]}>
				<Image source={game.image} style={styles.detailsHeroImage} contentFit="cover" />
				<TouchableOpacity style={styles.favoriteBtn} activeOpacity={0.7}>
					<Star size={RFValue(16)} color="#FFFFFF" strokeWidth={2} />
				</TouchableOpacity>
			</View>

			{/* Name & Provider */}
			<Text style={[styles.detailsName, { color: theme.colors.textPrimary }]}>{game.name}</Text>
			<Text style={[styles.detailsProvider, { color: theme.colors.textMuted }]}>{game.provider}</Text>

			{/* Tags */}
			{game.tags && game.tags.length > 0 && (
				<View style={styles.tagsRow}>
					{game.tags.map((tag) => (
						<Text key={tag} style={[styles.tag, { color: theme.colors.accent }]}>
							#{tag}
						</Text>
					))}
				</View>
			)}

			{/* Stats */}
			{(game.volatility || game.rtp) && (
				<View style={styles.statsSection}>
					<Text style={[styles.statsTitle, { color: theme.colors.textMuted }]}>MAIS INFORMAÇÕES</Text>
					<View style={[styles.statsGrid, { borderColor: 'rgba(255,255,255,0.08)' }]}>
						{game.volatility && (
							<View style={[styles.statCell, { borderRightColor: 'rgba(255,255,255,0.08)' }]}>
								<Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>VOLATILIDADE</Text>
								<View style={styles.volatilityRow}>
									{Array.from({ length: VOLATILITY_ICONS[game.volatility] }).map((_, i) => (
										<Zap key={i} size={RFValue(12)} color={theme.colors.accent} fill={theme.colors.accent} strokeWidth={0} />
									))}
								</View>
							</View>
						)}
						{game.rtp && (
							<View style={[styles.statCell, { borderRightColor: 'rgba(255,255,255,0.08)' }]}>
								<Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>RTP</Text>
								<Text style={[styles.statValue, { color: theme.colors.accent }]}>{game.rtp}</Text>
							</View>
						)}
						{game.lines != null && game.lines > 0 && (
							<View style={[styles.statCell, { borderRightColor: 'rgba(255,255,255,0.08)' }]}>
								<Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>LINHAS</Text>
								<Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
									{game.lines > 1000 ? `${(game.lines / 1000).toFixed(0)}k` : game.lines}
								</Text>
							</View>
						)}
						{game.reels != null && game.reels > 0 && (
							<View style={styles.statCell}>
								<Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>CARRETÉIS</Text>
								<Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>{game.reels}</Text>
							</View>
						)}
					</View>
				</View>
			)}

			{/* Similar Games */}
			{similarGames.length > 0 && (
				<View style={styles.similarSection}>
					<Text style={[styles.statsTitle, { color: theme.colors.textMuted }]}>JOGOS SIMILARES</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarScroll}>
						{similarGames.map((sg) => (
							<View key={sg.id} style={styles.similarCard}>
								<View style={[styles.similarThumb, { backgroundColor: theme.colors.bgCard }]}>
									<Image source={sg.image} style={styles.similarImage} contentFit="cover" />
								</View>
								<Text style={[styles.similarName, { color: theme.colors.textPrimary }]} numberOfLines={1}>
									{sg.name}
								</Text>
							</View>
						))}
					</ScrollView>
				</View>
			)}
		</View>
	);
}

function PlayButton({ theme, onPress }: { theme: any; onPress: () => void }) {
	return (
		<TouchableOpacity
			style={[styles.playBtn, { backgroundColor: theme.colors.accent }]}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<Text style={[styles.playBtnText, { color: theme.colors.bgNav }]}>JOGAR</Text>
		</TouchableOpacity>
	);
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function SearchGamesScreen() {
	const insets = useSafeAreaInsets();
	const { theme } = useStampdUI();
	const {
		searchValue,
		filteredGames,
		selectedGame,
		similarGames,
		sheetRef,
		handleSearchChange,
		handleClearSearch,
		handleBack,
		handleOpenGameDetails,
		handleCloseGameDetails,
		handlePlayGame,
	} = useSearchGamesViewModel();

	const renderItem = useCallback(
		({ item }: { item: SearchGame }) => (
			<GameGridCard game={item} theme={theme} onMorePress={handleOpenGameDetails} />
		),
		[theme, handleOpenGameDetails]
	);

	const keyExtractor = useCallback((item: SearchGame) => item.id, []);

	return (
		<View style={[styles.root, { backgroundColor: theme.colors.background, paddingTop: insets.top + RFValue(10) }]}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.08)' }]}
					onPress={handleBack}
					activeOpacity={0.8}
				>
					<ArrowLeft size={RFValue(18)} color={theme.colors.textPrimary} strokeWidth={2.2} />
				</TouchableOpacity>

				<View style={[styles.searchBar, { backgroundColor: theme.colors.bgCard, borderColor: 'rgba(255,255,255,0.06)' }]}>
					<SearchIcon size={RFValue(16)} color={theme.colors.textMuted} strokeWidth={2.2} />
					<TextInput
						value={searchValue}
						onChangeText={handleSearchChange}
						placeholder="Procurar jogos & dealers"
						placeholderTextColor={theme.colors.textMuted}
						style={[styles.searchInput, { color: theme.colors.textPrimary }]}
						cursorColor={theme.colors.accent}
						autoCapitalize="none"
						autoCorrect={false}
						returnKeyType="search"
						autoFocus
					/>
					{searchValue ? (
						<TouchableOpacity onPress={handleClearSearch} activeOpacity={0.8}>
							<X size={RFValue(16)} color={theme.colors.textSecondary} strokeWidth={2.2} />
						</TouchableOpacity>
					) : null}
				</View>
			</View>

			{/* Grid */}
			<FlatList
				data={filteredGames}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
				columnWrapperStyle={styles.row}
				contentContainerStyle={styles.gridContent}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Mais Jogos</Text>
				}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>
							Nenhum jogo encontrado
						</Text>
					</View>
				}
			/>

			{/* Game Details Bottom Sheet */}
			<AppBottomSheet
				ref={sheetRef}
				snapPoints={['80%']}
				onDismiss={handleCloseGameDetails}
				scrollable={false}
				footer={selectedGame ? <PlayButton theme={theme} onPress={handlePlayGame} /> : undefined}
			>
				{selectedGame && (
					<GameDetailsContent
						game={selectedGame}
						similarGames={similarGames}
						theme={theme}
					/>
				)}
			</AppBottomSheet>
		</View>
	);
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
	root: { flex: 1 },
	header: {
		flexDirection: 'row', alignItems: 'center', gap: RFValue(12),
		paddingHorizontal: RFValue(20), paddingBottom: RFValue(14),
	},
	backButton: {
		width: RFValue(36), height: RFValue(36), borderRadius: RFValue(12),
		alignItems: 'center', justifyContent: 'center',
	},
	searchBar: {
		flex: 1, height: RFValue(40), borderRadius: RFValue(10), borderWidth: 1,
		paddingHorizontal: RFValue(12), flexDirection: 'row', alignItems: 'center', gap: RFValue(10),
	},
	searchInput: { flex: 1, paddingVertical: 0, fontSize: RFValue(12), fontWeight: '400' },
	gridContent: { paddingHorizontal: RFValue(16), paddingBottom: RFValue(28), gap: RFValue(16) },
	sectionTitle: { fontSize: RFValue(18), fontWeight: '700', marginBottom: RFValue(4) },
	row: { justifyContent: 'space-between' },
	cardWrapper: { width: '48.5%', gap: RFValue(6) },
	cardThumb: { width: '100%', aspectRatio: 4 / 3, borderRadius: RFValue(12), overflow: 'hidden' },
	cardImage: { width: '100%', height: '100%' },
	badge: {
		position: 'absolute', top: RFValue(8), left: RFValue(8),
		paddingHorizontal: RFValue(8), paddingVertical: RFValue(4), borderRadius: RFValue(6),
		flexDirection: 'row', alignItems: 'center', gap: RFValue(4),
	},
	badgeText: { fontSize: RFValue(8), fontWeight: '700', letterSpacing: 0.3 },
	moreBtn: {
		position: 'absolute', top: RFValue(8), right: RFValue(8),
		width: RFValue(28), height: RFValue(28), borderRadius: RFValue(14),
		backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
	},
	cardName: { fontSize: RFValue(12), fontWeight: '600' },
	emptyState: { paddingVertical: RFValue(40), alignItems: 'center' },
	emptyText: { fontSize: RFValue(14), fontWeight: '400' },

	// ── Details Bottom Sheet ──
	detailsContainer: { gap: RFValue(8) },
	detailsHero: {
		width: '100%', aspectRatio: 2.2, borderRadius: RFValue(10), overflow: 'hidden',
	},
	detailsHeroImage: { width: '100%', height: '100%' },
	favoriteBtn: {
		position: 'absolute', top: RFValue(8), right: RFValue(8),
		width: RFValue(32), height: RFValue(32), borderRadius: RFValue(16),
		backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
	},
	detailsName: { fontSize: RFValue(20), fontWeight: '700' },
	detailsProvider: { fontSize: RFValue(12), fontWeight: '500', marginTop: RFValue(-4) },
	tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: RFValue(6) },
	tag: { fontSize: RFValue(11), fontWeight: '400' },
	statsSection: { gap: RFValue(6) },
	statsTitle: { fontSize: RFValue(10), fontWeight: '700', letterSpacing: 0.8 },
	statsGrid: {
		flexDirection: 'row', borderWidth: 1, borderRadius: RFValue(8), overflow: 'hidden',
	},
	statCell: {
		flex: 1, alignItems: 'center', paddingVertical: RFValue(8), gap: RFValue(4), borderRightWidth: 1,
	},
	statLabel: { fontSize: RFValue(8), fontWeight: '600', letterSpacing: 0.5 },
	statValue: { fontSize: RFValue(14), fontWeight: '700' },
	volatilityRow: { flexDirection: 'row', gap: RFValue(2) },
	similarSection: { gap: RFValue(6) },
	similarScroll: { gap: RFValue(10) },
	similarCard: { width: RFValue(100), gap: RFValue(4) },
	similarThumb: {
		width: RFValue(100), height: RFValue(65), borderRadius: RFValue(8), overflow: 'hidden',
	},
	similarImage: { width: '100%', height: '100%' },
	similarName: { fontSize: RFValue(10), fontWeight: '600' },
	playBtn: {
		height: RFValue(46), borderRadius: RFValue(12),
		alignItems: 'center', justifyContent: 'center',
	},
	playBtnText: { fontSize: RFValue(15), fontWeight: '700', letterSpacing: 1 },
});
