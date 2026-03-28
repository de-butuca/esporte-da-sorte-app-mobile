import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClipboardList, Dices, Gift, HelpCircle, House, LogOut, Settings, Trophy, X } from 'lucide-react-native';
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
			padding: theme.spacing.m4,
			position: 'relative',
		}),
	}),

	header: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingVertical: theme.spacing.p3,
			minHeight: 56,
		}),
	}),

	logo: Styled.Image({
		style: {
			width: 40,
			height: 40,
			resizeMode: 'contain',
		},
	}),

	closeBtn: Styled.TouchableOpacity({
		style: {
			width: 44,
			height: 44,
			justifyContent: 'center',
			alignItems: 'center',
		},
		attrs: { activeOpacity: 0.7 },
	}),

	userSection: Styled.View({
		style: ({ theme }) => ({
			gap: theme.spacing.p1,
		}),
	}),

	userName: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xl2,
			color: theme.colors.textPrimary,
		}),
	}),

	userSubtitle: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
			fontFamily: theme.fonts.family.regular,
		}),
	}),

	navItem: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.p3,
			// paddingVertical: theme.spacing.p3,
			// paddingHorizontal: theme.spacing.p4,
			borderRadius: theme.radius.roundedMd,
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	navLabel: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.textSecondary,
			flex: 1,
		}),
	}),

	divider: Styled.View({
		style: ({ theme }) => ({
			height: 1,
			marginHorizontal: 0,
			marginVertical: theme.spacing.p3,
			backgroundColor: 'rgba(160,160,200,0.12)',
		}),
	}),

	footer: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p4,
			paddingTop: theme.spacing.p3,
		}),
	}),

	logoutBtn: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: theme.spacing.p3,
			paddingVertical: theme.spacing.p4,
			paddingHorizontal: theme.spacing.p5,
			borderRadius: theme.radius.roundedMd,
			backgroundColor: 'rgba(179, 38, 30, 0.15)',
			borderWidth: 1.5,
			borderColor: theme.colors.error,
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	logoutLabel: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.error,
		}),
	}),
};

import LogoImage from '@assets/images/logo-text.svg';

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
			onPress: () => {
				onClose();
				navigate('Home');
			},
		},
		{
			key: 'cassino',
			label: 'Cassino',
			Icon: Dices,
			onPress: () => {
				onClose();
				navigate('Home');
			},
		},
		{
			key: 'esportes',
			label: 'Esportes',
			Icon: Trophy,
			onPress: () => {
				onClose();
				navigate('GameHome');
			},
		},
		{
			key: 'apostas',
			label: 'Apostas',
			Icon: ClipboardList,
			onPress: () => {
				requireAuth(() => {
					onClose();
				});
			},
		},
		{
			key: 'promocoes',
			label: 'Promoções',
			Icon: Gift,
			onPress: () => {
				requireAuth(() => {
					onClose();
					navigate('Promotions');
				});
			},
		},
		{
			key: 'support',
			label: 'Suporte',
			Icon: HelpCircle,
			onPress: () => {
				onClose();
				navigate('Support');
			},
		},
	];

	const initial = user?.name?.[0]?.toUpperCase() ?? '?';

	return (
		<SS.root>
			<SS.header style={{ paddingTop: Math.max(insets.top, 12) }}>
				<LogoImage width={95} height={32} />

				<SS.closeBtn onPress={onClose}>
					<X size={28} color={lightColors.textMuted} strokeWidth={2} />
				</SS.closeBtn>
			</SS.header>

			<ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				{NAV_ITEMS.map((item) => (
					<SS.navItem key={item.key} onPress={item.onPress}>
						<item.Icon size={20} color={lightColors.textSecondary} strokeWidth={1.8} />
						<SS.navLabel>{item.label}</SS.navLabel>
					</SS.navItem>
				))}

				<SS.divider />

				<SS.navItem
					onPress={() => {
						onClose();
						navigate('Settings' as any);
					}}
				>
					<Settings size={20} color={lightColors.textMuted} strokeWidth={1.8} />
					<SS.navLabel>Configurações</SS.navLabel>
				</SS.navItem>
			</ScrollView>

			<SS.footer style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
				<SS.divider />
				<SS.logoutBtn onPress={handleSignOut}>
					<LogOut size={24} color={lightColors.error} strokeWidth={2} />
					<SS.logoutLabel>Sair</SS.logoutLabel>
				</SS.logoutBtn>
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
		gap: 18,
	},
});
