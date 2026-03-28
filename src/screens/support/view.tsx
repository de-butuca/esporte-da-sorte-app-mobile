import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft, Search } from 'lucide-react-native';
import { SectionHeader } from '@/components/SectionHeader';
import { PromotionsSupportCard } from '@/screens/promotions/components/PromotionsSupportCard';
import { fontFamily, lightColors } from '@/stampd.config';
import Logo from '@assets/esporteDaSorteCompleto.svg';
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
					<Text style={styles.faqTitle}>Perguntas frequentes</Text>
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
	backButton: {
		width: RFValue(40),
		height: RFValue(40),
		borderRadius: RFValue(12),
		borderWidth: 1,
		borderColor: '#1A2340',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerSpacer: {
		width: RFValue(40),
	},
	content: {
		paddingHorizontal: 16,
		paddingBottom: RFValue(28),
		paddingTop: 32,
		gap: RFValue(22),
	},
	searchCard: {
		backgroundColor: '#1A2332',
		borderRadius: 12,
		padding: RFValue(18),
		gap: RFValue(14),
	},
	searchTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 20,
		lineHeight: 30,
		color: lightColors.textPrimary,
	},
	searchField: {
		height: RFValue(44),
		borderRadius: 12,
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
		backgroundColor: '#1A2332',
		alignItems: 'center',
		justifyContent: 'center',
	},
	shortcutChipActive: {
		backgroundColor: 'rgba(56,230,125,0.16)',
		borderColor: 'rgba(56,230,125,0.34)',
	},
	shortcutLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 14,
		lineHeight: 21,
		color: lightColors.textPrimary,
	},
	shortcutLabelActive: {
		fontFamily: fontFamily.bold,
		color: lightColors.textPrimary,
	},
	faqTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 16,
		lineHeight: 24,
		color: lightColors.textPrimary,
		paddingLeft: 4,
	},
	faqCard: {
		backgroundColor: '#1A2332',
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
