import React, { useCallback } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Image } from 'expo-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search as SearchIcon, X, MoreVertical } from 'lucide-react-native';
import { useStampdUI } from 'stampd/context';
import { useSearchGamesViewModel } from './search-games.viewmodel';
import type { SearchGame, GameBadge } from './search-games.types';

const BADGE_LABELS: Record<GameBadge, string | null> = {
	exclusivo: 'EXCLUSIVO',
	compra_bonus: 'COMPRA DE BÔNUS',
	novo: 'NOVO',
	live: 'AO VIVO',
	none: null,
};

function GameGridCard({ game, theme }: { game: SearchGame; theme: any }) {
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
						<Text style={[styles.badgeText, { color: game.badge === 'compra_bonus' ? theme.colors.bgNav : '#FFFFFF' }]}>
							{badgeLabel}
						</Text>
					</View>
				)}

				<TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
					<MoreVertical size={RFValue(16)} color="#FFFFFF" strokeWidth={2} />
				</TouchableOpacity>
			</View>
			<Text style={[styles.cardName, { color: theme.colors.textPrimary }]} numberOfLines={1}>
				{game.name}
			</Text>
		</View>
	);
}

export default function SearchGamesScreen() {
	const insets = useSafeAreaInsets();
	const { theme } = useStampdUI();
	const {
		searchValue,
		filteredGames,
		handleSearchChange,
		handleClearSearch,
		handleBack,
	} = useSearchGamesViewModel();

	const renderItem = useCallback(
		({ item }: { item: SearchGame }) => <GameGridCard game={item} theme={theme} />,
		[theme]
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

			{/* Content */}
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
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(14),
	},
	backButton: {
		width: RFValue(36),
		height: RFValue(36),
		borderRadius: RFValue(12),
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBar: {
		flex: 1,
		height: RFValue(40),
		borderRadius: RFValue(10),
		borderWidth: 1,
		paddingHorizontal: RFValue(12),
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(10),
	},
	searchInput: {
		flex: 1,
		paddingVertical: 0,
		fontSize: RFValue(12),
		fontWeight: '400',
	},
	gridContent: {
		paddingHorizontal: RFValue(16),
		paddingBottom: RFValue(28),
		gap: RFValue(16),
	},
	sectionTitle: {
		fontSize: RFValue(18),
		fontWeight: '700',
		marginBottom: RFValue(4),
	},
	row: {
		justifyContent: 'space-between',
	},
	cardWrapper: {
		width: '48.5%',
		gap: RFValue(6),
	},
	cardThumb: {
		width: '100%',
		aspectRatio: 4 / 3,
		borderRadius: RFValue(12),
		overflow: 'hidden',
	},
	cardImage: {
		width: '100%',
		height: '100%',
	},
	badge: {
		position: 'absolute',
		top: RFValue(8),
		left: RFValue(8),
		paddingHorizontal: RFValue(8),
		paddingVertical: RFValue(4),
		borderRadius: RFValue(6),
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(4),
	},
	badgeText: {
		fontSize: RFValue(8),
		fontWeight: '700',
		letterSpacing: 0.3,
	},
	moreBtn: {
		position: 'absolute',
		top: RFValue(8),
		right: RFValue(8),
		width: RFValue(28),
		height: RFValue(28),
		borderRadius: RFValue(14),
		backgroundColor: 'rgba(0,0,0,0.4)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardName: {
		fontSize: RFValue(12),
		fontWeight: '600',
	},
	emptyState: {
		paddingVertical: RFValue(40),
		alignItems: 'center',
	},
	emptyText: {
		fontSize: RFValue(14),
		fontWeight: '400',
	},
});
