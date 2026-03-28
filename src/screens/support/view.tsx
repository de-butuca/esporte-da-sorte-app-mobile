import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft, Search } from 'lucide-react-native';
import { SectionHeader } from '@/components/SectionHeader';
import { PromotionsSupportCard } from '@/screens/promotions/components/PromotionsSupportCard';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import Logo from '@assets/esporteDaSorteCompleto.svg';
import { SupportFaqItem } from './components/SupportFaqItem';
import { useSupportViewModel } from './viewmodel';

export default function SupportScreen() {
	const insets = useSafeAreaInsets();
	const colors = useAuthThemeStore((s) => s.colors);
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
		<View style={[styles.root, { backgroundColor: colors.background }]}>
			<View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors.bgSecondary }]}>
				<View style={styles.headerRow}>
					<TouchableOpacity onPress={handleBack} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
						<ArrowLeft size={RFValue(20)} color={colors.textPrimary} strokeWidth={2} />
					</TouchableOpacity>
					<Logo width={149} height={16} />
					<View style={{ width: RFValue(20) }} />
				</View>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
			>
				<View style={[styles.searchCard, { backgroundColor: colors.surface1 }]}>
					<Text style={[styles.searchTitle, { color: colors.textPrimary }]}>Como podemos ajudar?</Text>

					<View style={[styles.searchField, { borderColor: `${colors.accent}48`, backgroundColor: colors.surface2 }]}>
						<Search size={RFValue(18)} color={colors.textMuted} strokeWidth={2} />
						<TextInput
							value={searchQuery}
							onChangeText={setSearchQuery}
							placeholder="Buscar por assunto"
							placeholderTextColor={colors.textDisabled}
							style={[styles.searchInput, { color: colors.textPrimary }]}
							cursorColor={colors.accent}
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
									style={[
										styles.shortcutChip,
										{ backgroundColor: colors.surface1 },
										isActive && { backgroundColor: `${colors.accent}28` },
									]}
									onPress={() => toggleShortcut(shortcut.tag)}
									activeOpacity={0.8}
								>
									<Text
										style={[
											styles.shortcutLabel,
											{ color: colors.textPrimary },
											isActive && styles.shortcutLabelActive,
										]}
									>
										{shortcut.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				<View style={styles.sectionBlock}>
					<Text style={[styles.faqTitle, { color: colors.textPrimary }]}>Perguntas frequentes</Text>
					<View style={[styles.faqCard, { backgroundColor: colors.surface1 }]}>
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
								<Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Nada encontrado</Text>
								<Text style={[styles.emptyDescription, { color: colors.textMuted }]}>
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
	},
	header: {
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
	content: {
		paddingHorizontal: 16,
		paddingBottom: RFValue(28),
		paddingTop: 32,
		gap: RFValue(22),
	},
	searchCard: {
		borderRadius: 12,
		padding: RFValue(18),
		gap: RFValue(14),
	},
	searchTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 20,
		lineHeight: 30,
	},
	searchField: {
		height: RFValue(44),
		borderRadius: 12,
		borderWidth: 1.5,
		paddingHorizontal: RFValue(16),
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
	},
	searchInput: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
	},
	sectionBlock: {
		gap: RFValue(14),
	},
	sectionHeaderWrap: {
		marginHorizontal: -16,
	},
	shortcuts: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	shortcutChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 9999,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shortcutLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 14,
		lineHeight: 21,
	},
	shortcutLabelActive: {
		fontFamily: fontFamily.bold,
	},
	faqTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 16,
		lineHeight: 24,
		paddingLeft: 4,
	},
	faqCard: {
		borderRadius: 12,
		overflow: 'hidden',
	},
	supportCardWrap: {},
	emptyState: {
		padding: RFValue(20),
		alignItems: 'center',
	},
	emptyTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		marginBottom: RFValue(8),
	},
	emptyDescription: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		textAlign: 'center',
	},
});
