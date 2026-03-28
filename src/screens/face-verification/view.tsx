import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft, MessageSquare, Camera, ScanFace, ShieldCheck } from 'lucide-react-native';
import { useStampdUI } from 'stampd/context';
import { useAppNavigation } from '@/navigation/hooks';
import Logo from '@assets/images/logo-square.svg';

interface InstructionCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	colors: { card: string; text: string; muted: string };
}

function InstructionCard({ icon, title, description, colors }: InstructionCardProps) {
	return (
		<View style={[styles.card, { backgroundColor: colors.card }]}>
			<View style={styles.cardIconWrap}>
				{icon}
			</View>
			<View style={styles.cardContent}>
				<Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
				<Text style={[styles.cardDescription, { color: colors.muted }]}>{description}</Text>
			</View>
		</View>
	);
}

export default function FaceVerificationScreen() {
	const insets = useSafeAreaInsets();
	const { theme } = useStampdUI();
	const { goBack, canGoBack } = useAppNavigation();

	const c = {
		bg: theme.colors.background,
		nav: theme.colors.bgNav,
		card: theme.colors.bgCard,
		text: theme.colors.textPrimary,
		muted: theme.colors.textSecondary,
		accent: theme.colors.accent,
	};

	return (
		<View style={[styles.root, { backgroundColor: c.bg }]}>
			{/* Header */}
			<View style={[styles.header, { backgroundColor: c.nav, paddingTop: insets.top }]}>
				<View style={styles.headerRow}>
					{canGoBack() ? (
						<TouchableOpacity
							onPress={goBack}
							activeOpacity={0.7}
							style={[styles.headerBtn, { borderColor: 'rgba(255,255,255,0.08)' }]}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						>
							<ArrowLeft size={RFValue(20)} color={c.text} strokeWidth={2} />
						</TouchableOpacity>
					) : (
						<View style={{ width: RFValue(40) }} />
					)}
					<Logo width={RFValue(100)} height={RFValue(16)} />
					<TouchableOpacity
						activeOpacity={0.7}
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					>
						<MessageSquare size={RFValue(20)} color={c.text} strokeWidth={2} />
					</TouchableOpacity>
				</View>
			</View>

			{/* Content */}
			<View style={styles.content}>
				{/* Icon */}
				<View style={[styles.iconCircle, { backgroundColor: c.accent }]}>
					<ScanFace size={RFValue(40)} color={c.bg} strokeWidth={1.5} />
				</View>

				{/* Title */}
				<View style={styles.titleBlock}>
					<Text style={[styles.title, { color: c.text }]}>Verificação Facial</Text>
					<Text style={[styles.subtitle, { color: c.muted }]}>
						Última etapa para sua segurança
					</Text>
				</View>

				{/* Instruction Cards */}
				<View style={styles.cardsBlock}>
					<InstructionCard
						icon={<Camera size={RFValue(20)} color={c.accent} strokeWidth={2} />}
						title="Prepare-se para a foto"
						description="Remova óculos, bonés e certifique-se de estar em um ambiente bem iluminado"
						colors={{ card: c.card, text: c.text, muted: c.muted }}
					/>
					<InstructionCard
						icon={<ScanFace size={RFValue(20)} color={c.accent} strokeWidth={2} />}
						title="Posicione seu rosto"
						description="Centralize seu rosto na moldura oval e mantenha-se imóvel"
						colors={{ card: c.card, text: c.text, muted: c.muted }}
					/>
					<InstructionCard
						icon={<ShieldCheck size={RFValue(20)} color={c.accent} strokeWidth={2} />}
						title="Seus dados estão seguros"
						description="A imagem será criptografada e usada apenas para verificação"
						colors={{ card: c.card, text: c.text, muted: c.muted }}
					/>
				</View>
			</View>

			{/* Button */}
			<View style={[styles.footer, { paddingBottom: insets.bottom + RFValue(16) }]}>
				<TouchableOpacity
					style={[styles.primaryBtn, { backgroundColor: c.accent }]}
					activeOpacity={0.8}
					onPress={() => {
						// TODO: integrar com câmera/SDK de verificação facial
						if (__DEV__) console.log('Iniciar verificação facial');
					}}
				>
					<Text style={[styles.primaryBtnText, { color: c.bg }]}>Iniciar Verificação</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	header: {
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(14),
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: RFValue(14),
	},
	headerBtn: {
		width: RFValue(40),
		height: RFValue(40),
		borderRadius: RFValue(12),
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: RFValue(24),
		paddingTop: RFValue(32),
		gap: RFValue(32),
	},
	iconCircle: {
		width: RFValue(80),
		height: RFValue(80),
		borderRadius: RFValue(40),
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleBlock: {
		alignItems: 'center',
		gap: RFValue(8),
	},
	title: {
		fontSize: RFValue(24),
		fontWeight: '800',
		letterSpacing: 0.07,
		lineHeight: RFValue(36),
		textAlign: 'center',
	},
	subtitle: {
		fontSize: RFValue(14),
		fontWeight: '400',
		lineHeight: RFValue(21),
		letterSpacing: -0.15,
		textAlign: 'center',
	},
	cardsBlock: {
		width: '100%',
		gap: RFValue(16),
	},
	card: {
		flexDirection: 'row',
		borderRadius: RFValue(12),
		padding: RFValue(20),
		gap: RFValue(12),
		alignItems: 'flex-start',
	},
	cardIconWrap: {
		width: RFValue(40),
		height: RFValue(40),
		borderRadius: RFValue(12),
		backgroundColor: 'rgba(0,232,120,0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContent: {
		flex: 1,
		gap: RFValue(4),
	},
	cardTitle: {
		fontSize: RFValue(15),
		fontWeight: '700',
		letterSpacing: -0.23,
		lineHeight: RFValue(22),
	},
	cardDescription: {
		fontSize: RFValue(13),
		fontWeight: '400',
		letterSpacing: -0.08,
		lineHeight: RFValue(19),
	},
	footer: {
		paddingHorizontal: RFValue(24),
	},
	primaryBtn: {
		height: RFValue(48),
		borderRadius: RFValue(12),
		alignItems: 'center',
		justifyContent: 'center',
	},
	primaryBtnText: {
		fontSize: RFValue(16),
		fontWeight: '600',
		letterSpacing: -0.31,
		lineHeight: RFValue(24),
	},
});
