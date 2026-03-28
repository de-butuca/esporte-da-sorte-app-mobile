import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Animated,
	Easing,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ArrowLeft, Check, X as XIcon, RotateCcw } from 'lucide-react-native';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import { useAppNavigation } from '@/navigation/hooks';

type CaptureState = 'positioning' | 'capturing' | 'processing' | 'success' | 'error';

const STATUS_CONFIG: Record<CaptureState, { label: string; hint: string }> = {
	positioning: {
		label: 'Posicione seu rosto',
		hint: 'Centralize na moldura oval',
	},
	capturing: {
		label: 'Mantenha-se imóvel',
		hint: 'Capturando...',
	},
	processing: {
		label: 'Processando',
		hint: 'Verificando sua identidade...',
	},
	success: {
		label: 'Verificação concluída',
		hint: 'Identidade confirmada com sucesso',
	},
	error: {
		label: 'Falha na verificação',
		hint: 'Tente novamente em um ambiente iluminado',
	},
};

export default function FaceCaptureScreen() {
	const insets = useSafeAreaInsets();
	const colors = useAuthThemeStore((s) => s.colors);
	const { goBack } = useAppNavigation();

	const [state, setState] = useState<CaptureState>('positioning');
	const pulseAnim = useRef(new Animated.Value(1)).current;
	const scanLineAnim = useRef(new Animated.Value(0)).current;

	const c = {
		bg: colors.background,
		text: colors.textPrimary,
		muted: colors.textSecondary,
		accent: colors.accent,
		error: colors.error,
	};

	// Pulse animation for the oval frame
	useEffect(() => {
		if (state !== 'positioning') return;
		const pulse = Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnim, { toValue: 1.04, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
				Animated.timing(pulseAnim, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
			])
		);
		pulse.start();
		return () => pulse.stop();
	}, [state, pulseAnim]);

	// Scan line animation during capturing
	useEffect(() => {
		if (state !== 'capturing') return;
		const scan = Animated.loop(
			Animated.sequence([
				Animated.timing(scanLineAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
				Animated.timing(scanLineAnim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
			])
		);
		scan.start();
		return () => scan.stop();
	}, [state, scanLineAnim]);

	const handleCapture = useCallback(() => {
		setState('capturing');
		setTimeout(() => {
			setState('processing');
			setTimeout(() => {
				// Simula sucesso (70%) ou erro (30%)
				setState(Math.random() > 0.3 ? 'success' : 'error');
			}, 2000);
		}, 2000);
	}, []);

	const handleRetry = useCallback(() => {
		setState('positioning');
	}, []);

	const handleFinish = useCallback(() => {
		goBack();
	}, [goBack]);

	const borderColor =
		state === 'success' ? c.accent
		: state === 'error' ? c.error
		: state === 'capturing' ? c.accent
		: 'rgba(255,255,255,0.3)';

	const config = STATUS_CONFIG[state];

	const scanLineTranslate = scanLineAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [-RFValue(100), RFValue(100)],
	});

	return (
		<View style={[styles.root, { backgroundColor: c.bg }]}>
			{/* Header */}
			<View style={[styles.header, { paddingTop: insets.top + RFValue(10) }]}>
				<TouchableOpacity onPress={goBack} activeOpacity={0.7}>
					<ArrowLeft size={RFValue(22)} color={c.text} strokeWidth={2} />
				</TouchableOpacity>
				<Text style={[styles.headerTitle, { color: c.text }]}>Verificação Facial</Text>
				<View style={{ width: RFValue(22) }} />
			</View>

			{/* Camera area (simulated) */}
			<View style={styles.cameraArea}>
				<View style={[styles.cameraSimulated, { backgroundColor: '#0a0e1a' }]}>
					{/* Oval frame */}
					<Animated.View
						style={[
							styles.ovalFrame,
							{
								borderColor,
								transform: [{ scale: state === 'positioning' ? pulseAnim : 1 }],
							},
						]}
					>
						{/* Corner markers */}
						<View style={[styles.cornerTL, { borderColor }]} />
						<View style={[styles.cornerTR, { borderColor }]} />
						<View style={[styles.cornerBL, { borderColor }]} />
						<View style={[styles.cornerBR, { borderColor }]} />

						{/* Scan line */}
						{state === 'capturing' && (
							<Animated.View
								style={[
									styles.scanLine,
									{
										backgroundColor: c.accent,
										transform: [{ translateY: scanLineTranslate }],
									},
								]}
							/>
						)}

						{/* Status icon overlay */}
						{state === 'processing' && (
							<ActivityIndicator size="large" color={c.accent} />
						)}
						{state === 'success' && (
							<View style={[styles.statusIcon, { backgroundColor: c.accent }]}>
								<Check size={RFValue(32)} color={c.bg} strokeWidth={3} />
							</View>
						)}
						{state === 'error' && (
							<View style={[styles.statusIcon, { backgroundColor: c.error }]}>
								<XIcon size={RFValue(32)} color="#FFFFFF" strokeWidth={3} />
							</View>
						)}
					</Animated.View>
				</View>
			</View>

			{/* Status text */}
			<View style={styles.statusBlock}>
				<Text style={[styles.statusLabel, { color: c.text }]}>{config.label}</Text>
				<Text style={[styles.statusHint, { color: c.muted }]}>{config.hint}</Text>
			</View>

			{/* Action buttons */}
			<View style={[styles.footer, { paddingBottom: insets.bottom + RFValue(24) }]}>
				{state === 'positioning' && (
					<TouchableOpacity
						style={[styles.captureBtn, { borderColor: c.accent }]}
						activeOpacity={0.8}
						onPress={handleCapture}
					>
						<View style={[styles.captureBtnInner, { backgroundColor: c.accent }]} />
					</TouchableOpacity>
				)}

				{state === 'success' && (
					<TouchableOpacity
						style={[styles.actionBtn, { backgroundColor: c.accent }]}
						activeOpacity={0.8}
						onPress={handleFinish}
					>
						<Text style={[styles.actionBtnText, { color: c.bg }]}>Continuar</Text>
					</TouchableOpacity>
				)}

				{state === 'error' && (
					<TouchableOpacity
						style={[styles.actionBtn, { backgroundColor: c.accent }]}
						activeOpacity={0.8}
						onPress={handleRetry}
					>
						<RotateCcw size={RFValue(18)} color={c.bg} strokeWidth={2} />
						<Text style={[styles.actionBtnText, { color: c.bg }]}>Tentar Novamente</Text>
					</TouchableOpacity>
				)}

				{(state === 'capturing' || state === 'processing') && (
					<View style={styles.processingDots}>
						<ActivityIndicator size="small" color={c.accent} />
					</View>
				)}
			</View>
		</View>
	);
}

const OVAL_W = RFValue(220);
const OVAL_H = RFValue(280);

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(16),
	},
	headerTitle: {
		fontSize: RFValue(16),
		fontWeight: '700',
	},
	cameraArea: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cameraSimulated: {
		width: '100%',
		aspectRatio: 3 / 4,
		maxHeight: '70%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ovalFrame: {
		width: OVAL_W,
		height: OVAL_H,
		borderRadius: OVAL_W / 2,
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	cornerTL: {
		position: 'absolute',
		top: RFValue(20),
		left: RFValue(20),
		width: RFValue(30),
		height: RFValue(30),
		borderTopWidth: 4,
		borderLeftWidth: 4,
		borderTopLeftRadius: RFValue(8),
	},
	cornerTR: {
		position: 'absolute',
		top: RFValue(20),
		right: RFValue(20),
		width: RFValue(30),
		height: RFValue(30),
		borderTopWidth: 4,
		borderRightWidth: 4,
		borderTopRightRadius: RFValue(8),
	},
	cornerBL: {
		position: 'absolute',
		bottom: RFValue(20),
		left: RFValue(20),
		width: RFValue(30),
		height: RFValue(30),
		borderBottomWidth: 4,
		borderLeftWidth: 4,
		borderBottomLeftRadius: RFValue(8),
	},
	cornerBR: {
		position: 'absolute',
		bottom: RFValue(20),
		right: RFValue(20),
		width: RFValue(30),
		height: RFValue(30),
		borderBottomWidth: 4,
		borderRightWidth: 4,
		borderBottomRightRadius: RFValue(8),
	},
	scanLine: {
		position: 'absolute',
		width: '80%',
		height: 2,
		opacity: 0.6,
	},
	statusIcon: {
		width: RFValue(60),
		height: RFValue(60),
		borderRadius: RFValue(30),
		alignItems: 'center',
		justifyContent: 'center',
	},
	statusBlock: {
		alignItems: 'center',
		gap: RFValue(6),
		paddingHorizontal: RFValue(40),
		paddingVertical: RFValue(20),
	},
	statusLabel: {
		fontSize: RFValue(20),
		fontWeight: '700',
		textAlign: 'center',
	},
	statusHint: {
		fontSize: RFValue(14),
		fontWeight: '400',
		textAlign: 'center',
		lineHeight: RFValue(20),
	},
	footer: {
		alignItems: 'center',
		paddingHorizontal: RFValue(24),
	},
	captureBtn: {
		width: RFValue(72),
		height: RFValue(72),
		borderRadius: RFValue(36),
		borderWidth: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	captureBtnInner: {
		width: RFValue(56),
		height: RFValue(56),
		borderRadius: RFValue(28),
	},
	actionBtn: {
		width: '100%',
		height: RFValue(48),
		borderRadius: RFValue(12),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: RFValue(8),
	},
	actionBtnText: {
		fontSize: RFValue(16),
		fontWeight: '600',
	},
	processingDots: {
		height: RFValue(48),
		alignItems: 'center',
		justifyContent: 'center',
	},
});
