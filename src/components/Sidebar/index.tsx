import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	ClipboardList,
	Dices,
	Gift,
	HelpCircle,
	House,
	LogOut,
	Settings,
	Trophy,
	X,
} from 'lucide-react-native';
import { Styled } from 'stampd/styled';
import { lightColors } from '@/stampd.config';
import { useAppNavigation } from '@/navigation/hooks';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface SidebarProps {
	onClose: () => void;
}

interface NavItem {
	key: string;
	label: string;
	Icon: typeof House;
	onPress: () => void;
}

const SS = {
	root: Styled.View({
		style: ({ theme }) => ({
			flex: 1,
			backgroundColor: theme.colors.bgNav,
		}),
	}),

	header: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p5,
			paddingBottom: theme.spacing.p4,
			borderBottomWidth: 1,
			borderBottomColor: 'rgba(160,160,200,0.12)',
			gap: theme.spacing.gap3,
		}),
	}),

	closeBtn: Styled.TouchableOpacity({
		style: { alignSelf: 'flex-end' },
		attrs: { activeOpacity: 0.7 },
	}),

	userSection: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.gap3,
		}),
	}),

	avatar: Styled.View({
		style: ({ theme }) => ({
			width: theme.size.s12,
			height: theme.size.s12,
			borderRadius: theme.radius.roundedFull,
			backgroundColor: theme.colors.primary,
			alignItems: 'center',
			justifyContent: 'center',
		}),
	}),

	avatarInitial: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xl,
			color: theme.colors.textPrimary,
		}),
	}),

	userName: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.textPrimary,
		}),
	}),

	userSubtitle: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
		}),
	}),

	navItem: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.gap4,
			paddingVertical: theme.spacing.p3,
			paddingHorizontal: theme.spacing.p4,
			borderRadius: theme.radius.roundedMd,
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	navLabel: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.medium,
			fontSize: theme.fonts.sizes.sm,
			color: theme.colors.textSecondary,
		}),
	}),

	divider: Styled.View({
		style: ({ theme }) => ({
			height: 1,
			marginHorizontal: theme.spacing.p5,
			marginVertical: theme.spacing.p2,
			backgroundColor: 'rgba(160,160,200,0.12)',
		}),
	}),

	footer: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p2,
			paddingTop: theme.spacing.p2,
		}),
	}),
};

export function Sidebar({ onClose }: SidebarProps) {
	const insets = useSafeAreaInsets();
	const { navigate } = useAppNavigation();
	const user = useSessionStore((s) => s.user);
	const signOut = useSessionStore((s) => s.signOut);
	const { requireAuth } = useRequireAuth();

	const handleSignOut = useCallback(() => {
		onClose();
		signOut();
	}, [onClose, signOut]);

	const NAV_ITEMS: NavItem[] = [
		{
			key: 'home',
			label: 'Início',
			Icon: House,
			onPress: () => { onClose(); navigate('Home'); },
		},
		{
			key: 'cassino',
			label: 'Cassino',
			Icon: Dices,
			onPress: () => { onClose(); navigate('Home'); },
		},
		{
			key: 'esportes',
			label: 'Esportes',
			Icon: Trophy,
			onPress: () => { onClose(); navigate('GameHome'); },
		},
		{
			key: 'apostas',
			label: 'Apostas',
			Icon: ClipboardList,
			onPress: () => { requireAuth(() => { onClose(); }); },
		},
		{
			key: 'promocoes',
			label: 'Promoções',
			Icon: Gift,
			onPress: () => { requireAuth(() => { onClose(); navigate('Promotions'); }); },
		},
		{
			key: 'support',
			label: 'Suporte',
			Icon: HelpCircle,
			onPress: () => { onClose(); navigate('Support'); },
		},
	];

	const initial = user?.name?.[0]?.toUpperCase() ?? '?';

	return (
		<SS.root>
			<SS.header style={{ paddingTop: Math.max(insets.top, 16) + 8 }}>
				<SS.closeBtn onPress={onClose}>
					<X size={20} color={lightColors.textMuted} strokeWidth={2} />
				</SS.closeBtn>

				<SS.userSection>
					<SS.avatar>
						<SS.avatarInitial>{initial}</SS.avatarInitial>
					</SS.avatar>
					<SS.root style={styles.flex}>
						<SS.userName numberOfLines={1}>
							{user?.name ?? 'Visitante'}
						</SS.userName>
						<SS.userSubtitle numberOfLines={1}>
							{user ? 'Minha conta' : 'Faça login para continuar'}
						</SS.userSubtitle>
					</SS.root>
				</SS.userSection>
			</SS.header>

			<ScrollView
				style={styles.flex}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{NAV_ITEMS.map((item) => (
					<SS.navItem key={item.key} onPress={item.onPress}>
						<item.Icon size={20} color={lightColors.textSecondary} strokeWidth={1.8} />
						<SS.navLabel>{item.label}</SS.navLabel>
					</SS.navItem>
				))}

				<SS.divider />

				<SS.navItem onPress={() => { requireAuth(() => { onClose(); }); }}>
					<Settings size={20} color={lightColors.textMuted} strokeWidth={1.8} />
					<SS.navLabel>Configurações</SS.navLabel>
				</SS.navItem>
			</ScrollView>

			<SS.footer style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
				<SS.divider />
				<TouchableOpacity
					style={styles.logoutBtn}
					activeOpacity={0.7}
					onPress={handleSignOut}
				>
					<LogOut size={20} color={lightColors.error} strokeWidth={1.8} />
					<SS.navLabel style={styles.logoutLabel}>Sair</SS.navLabel>
				</TouchableOpacity>
			</SS.footer>
		</SS.root>
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	scrollContent: {
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	logoutBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	logoutLabel: {
		color: lightColors.error,
	},
});
