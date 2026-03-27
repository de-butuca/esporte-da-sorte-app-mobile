import React from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react-native';
import { ButtonBase } from '@/components/Button';
import { SectionHeader } from '@/screens/home/Pages/homeCassino/components/SectionHeader';
import { fontFamily, lightColors } from '@/stampd.config';
import { SearchEmptyState } from './components/SearchEmptyState';
import { SearchLeagueCard } from './components/SearchLeagueCard';
import { SearchRecentItem } from './components/SearchRecentItem';
import { SearchSportTabs } from './components/SearchSportTabs';
import { SearchTopicChips } from './components/SearchTopicChips';
import { useSearchViewModel } from './viewmodel';

export default function SearchScreen() {
	const insets = useSafeAreaInsets();
	const {
		searchValue,
		trimmedSearchValue,
		sports,
		activeSportSlug,
		searchResults,
		highlightedLeagues,
		trendingTopics,
		recentSearches,
		hasTypedSearch,
		isLoading,
		isError,
		refetch,
		handleBack,
		handleSearchChange,
		handleClearSearch,
		handleSubmitSearch,
		handleSelectSport,
		handleSelectTrendingTopic,
		handleSelectRecentSearch,
		handleClearRecentSearches,
		handleOpenLeague,
	} = useSearchViewModel();

	return (
		<View style={[styles.root, { paddingTop: insets.top + RFValue(10) }]}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
					<ArrowLeft size={RFValue(18)} color={lightColors.textPrimary} strokeWidth={2.2} />
				</TouchableOpacity>

				<View style={styles.searchBar}>
					<SearchIcon size={RFValue(16)} color={lightColors.textInactive} strokeWidth={2.2} />
					<TextInput
						value={searchValue}
						onChangeText={handleSearchChange}
						onSubmitEditing={handleSubmitSearch}
						placeholder="Buscar times, ligas, jogos..."
						placeholderTextColor={lightColors.textInactive}
						style={styles.searchInput}
						cursorColor={lightColors.accent}
						autoCapitalize="none"
						autoCorrect={false}
						returnKeyType="search"
						autoFocus
					/>
					{searchValue ? (
						<TouchableOpacity onPress={handleClearSearch} activeOpacity={0.8}>
							<X size={RFValue(16)} color={lightColors.textSecondary} strokeWidth={2.2} />
						</TouchableOpacity>
					) : null}
				</View>
			</View>

			<SearchSportTabs
				sports={sports}
				selectedSportSlug={activeSportSlug}
				onSelectSport={handleSelectSport}
			/>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
			>
				{isLoading ? (
					<View style={styles.feedbackCard}>
						<ActivityIndicator size="large" color={lightColors.accent} />
						<Text style={styles.feedbackTitle}>Carregando busca</Text>
						<Text style={styles.feedbackDescription}>
							Estamos preparando ligas, jogos e sugestoes para voce.
						</Text>
					</View>
				) : null}

				{!isLoading && isError ? (
					<View style={styles.feedbackCard}>
						<Text style={styles.feedbackTitle}>Nao foi possivel carregar a busca</Text>
						<Text style={styles.feedbackDescription}>
							Tente novamente para recarregar os dados mockados da tela.
						</Text>
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

				{!isLoading && !isError && hasTypedSearch ? (
					<>
						<Text style={styles.resultsLabel}>
							{`${searchResults.length} resultados para "${trimmedSearchValue}"`}
						</Text>

						{searchResults.length ? (
							<View style={styles.cardsList}>
								{searchResults.map((league) => (
									<SearchLeagueCard
										key={league.id}
										league={league}
										onPress={handleOpenLeague}
									/>
								))}
							</View>
						) : (
							<SearchEmptyState onClearSearch={handleClearSearch} />
						)}
					</>
				) : null}

				{!isLoading && !isError && !hasTypedSearch ? (
					<>
						{recentSearches.length ? (
							<View style={styles.sectionBlock}>
								<View style={styles.inlineHeader}>
									<View style={styles.inlineHeaderTitleWrap}>
										<Text style={styles.inlineHeaderTitle}>Buscas recentes</Text>
									</View>
									<TouchableOpacity
										onPress={handleClearRecentSearches}
										activeOpacity={0.8}
									>
										<Text style={styles.inlineHeaderAction}>Limpar tudo</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.recentList}>
									{recentSearches.map((searchTerm) => (
										<SearchRecentItem
											key={searchTerm}
											label={searchTerm}
											onPress={handleSelectRecentSearch}
										/>
									))}
								</View>
							</View>
						) : null}

						<View style={styles.sectionBlock}>
							<View style={styles.sectionHeaderWrap}>
								<SectionHeader title="Em alta agora" hasLive />
							</View>
							<SearchTopicChips
								topics={trendingTopics}
								onPressTopic={handleSelectTrendingTopic}
							/>
						</View>

						<View style={styles.sectionBlock}>
							<View style={styles.sectionHeaderWrap}>
								<SectionHeader title="Ligas em destaque" />
							</View>
							<View style={styles.cardsList}>
								{highlightedLeagues.map((league) => (
									<SearchLeagueCard
										key={league.id}
										league={league}
										onPress={handleOpenLeague}
									/>
								))}
							</View>
						</View>
					</>
				) : null}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: lightColors.background,
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
		backgroundColor: 'rgba(255,255,255,0.08)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBar: {
		flex: 1,
		height: RFValue(40),
		borderRadius: RFValue(10),
		backgroundColor: '#182133',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.06)',
		paddingHorizontal: RFValue(12),
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(10),
	},
	searchInput: {
		flex: 1,
		paddingVertical: 0,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		color: lightColors.textPrimary,
	},
	content: {
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(28),
		paddingTop: RFValue(18),
		gap: RFValue(20),
	},
	feedbackCard: {
		backgroundColor: '#1A2336',
		borderRadius: RFValue(18),
		paddingHorizontal: RFValue(24),
		paddingVertical: RFValue(28),
		alignItems: 'center',
		gap: RFValue(12),
	},
	feedbackTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		color: lightColors.textPrimary,
		textAlign: 'center',
	},
	feedbackDescription: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
	},
	resultsLabel: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		color: lightColors.textInactive,
	},
	sectionBlock: {
		gap: RFValue(12),
	},
	sectionHeaderWrap: {
		marginHorizontal: RFValue(-20),
	},
	inlineHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	inlineHeaderTitleWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(8),
	},
	inlineHeaderTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		color: lightColors.textPrimary,
	},
	inlineHeaderAction: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: lightColors.accent,
	},
	recentList: {
		gap: RFValue(10),
	},
	cardsList: {
		gap: RFValue(10),
	},
});
