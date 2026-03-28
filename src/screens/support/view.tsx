import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft, Search } from 'lucide-react-native';
import { SectionHeader } from '@/components/SectionHeader';
import { PromotionsSupportCard } from '@/screens/promotions/components/PromotionsSupportCard';
import { fontFamily, lightColors } from '@/stampd.config';
import { SupportFaqItem } from './components/SupportFaqItem';
import { useSupportViewModel } from './viewmodel';

export default function SupportScreen() {
	const insets = useSafeAreaInsets();
	const {
		title,
		searchQuery,
		setSearchQuery,
		shortcuts,
		activeShortcut,
		visibleFaqs,
		expandedFaqIds,
		handleBack,
		handleHelpPress,
		toggleShortcut,
		toggleFaq,
	} = useSupportViewModel();

	return (
		<View style={[styles.root, { paddingTop: insets.top + RFValue(10) }]}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
					<ArrowLeft size={RFValue(18)} color={lightColors.textPrimary} strokeWidth={2.2} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>{title}</Text>
				<View style={styles.headerSpacer} />
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.searchCard}>
					<Text style={styles.searchTitle}>Como podemos ajudar?</Text>

					<View style={styles.searchField}>
						<Search size={RFValue(18)} color={lightColors.textMuted} strokeWidth={2} />
						<TextInput
							value={searchQuery}
							onChangeText={setSearchQuery}
							placeholder="Buscar por assunto"
							placeholderTextColor={lightColors.textInactive}
							style={styles.searchInput}
							cursorColor={lightColors.accent}
						/>
					</View>
				</View>

				<View style={styles.sectionBlock}>
					<View style={styles.sectionHeaderWrap}>
						<SectionHeader title="Atalhos rápidos" />
					</View>
					<View style={styles.shortcuts}>
						{shortcuts.map((shortcut) => {
							const isActive = activeShortcut === shortcut.tag;
							return (
								<TouchableOpacity
									key={shortcut.id}
									style={[styles.shortcutChip, isActive && styles.shortcutChipActive]}
									onPress={() => toggleShortcut(shortcut.tag)}
									activeOpacity={0.8}
								>
									<Text style={[styles.shortcutLabel, isActive && styles.shortcutLabelActive]}>{shortcut.label}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				<View style={styles.sectionBlock}>
					<View style={styles.sectionHeaderWrap}>
						<SectionHeader title="Perguntas frequentes" />
					</View>
					<View style={styles.faqCard}>
						{visibleFaqs.length ? (
							visibleFaqs.map((item, index) => (
								<SupportFaqItem
									key={item.id}
									item={item}
									isExpanded={expandedFaqIds.includes(item.id)}
									isLastItem={index === visibleFaqs.length - 1}
									onPress={() => toggleFaq(item.id)}
								/>
							))
						) : (
							<View style={styles.emptyState}>
								<Text style={styles.emptyTitle}>Nada encontrado</Text>
								<Text style={styles.emptyDescription}>
									Tente outro assunto ou limpe os atalhos para ver todas as perguntas.
								</Text>
							</View>
						)}
					</View>
				</View>

				<View style={styles.supportCardWrap}>
					<PromotionsSupportCard
						support={{
							title: 'Fala com a gente',
							description: 'Não encontrou o que procurava?',
							buttonLabel: 'Preciso de ajuda',
							helperText: 'Atendimento 24/7 • Chat ao vivo em breve',
						}}
						onPress={handleHelpPress}
					/>
				</View>
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
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(14),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	backButton: {
		width: RFValue(36),
		height: RFValue(36),
		borderRadius: RFValue(12),
		backgroundColor: 'rgba(255,255,255,0.08)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(20),
		color: lightColors.textPrimary,
	},
	headerSpacer: {
		width: RFValue(36),
	},
	content: {
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(28),
		gap: RFValue(22),
	},
	searchCard: {
		backgroundColor: '#1A2336',
		borderRadius: RFValue(18),
		padding: RFValue(22),
		gap: RFValue(18),
	},
	searchTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(22),
		lineHeight: RFValue(30),
		color: lightColors.textPrimary,
	},
	searchField: {
		height: RFValue(56),
		borderRadius: RFValue(12),
		borderWidth: 1.5,
		borderColor: 'rgba(56,230,125,0.28)',
		backgroundColor: '#1C2538',
		paddingHorizontal: RFValue(16),
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
	},
	searchInput: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		color: lightColors.textPrimary,
	},
	sectionBlock: {
		gap: RFValue(14),
	},
	sectionHeaderWrap: {
		marginHorizontal: RFValue(-20),
	},
	shortcuts: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: RFValue(10),
		justifyContent: 'space-between',
	},
	shortcutChip: {
		width: '48%',
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(12),
		borderRadius: RFValue(999),
		backgroundColor: '#1A2336',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.04)',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: RFValue(48),
	},
	shortcutChipActive: {
		backgroundColor: 'rgba(56,230,125,0.16)',
		borderColor: 'rgba(56,230,125,0.34)',
	},
	shortcutLabel: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: lightColors.textSecondary,
		textAlign: 'center',
	},
	shortcutLabelActive: {
		fontFamily: fontFamily.bold,
		color: lightColors.textPrimary,
	},
	faqCard: {
		backgroundColor: '#1A2336',
		borderRadius: RFValue(18),
		overflow: 'hidden',
	},
	supportCardWrap: {
		marginHorizontal: RFValue(-20),
	},
	emptyState: {
		padding: RFValue(20),
		alignItems: 'center',
	},
	emptyTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		color: lightColors.textPrimary,
		marginBottom: RFValue(8),
	},
	emptyDescription: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
	},
});
