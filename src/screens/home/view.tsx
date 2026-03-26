import { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { BasePage } from '@/components/BasePage';
import { Roulette } from '@/components/Roulette';
import { useAppNavigation } from '@/navigation/hooks';
import { ChevronRight } from 'lucide-react-native';

const CAMPO_IMG = require('@assets/images/campo.png');
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function HomeScreen() {
	const [showRoulette, setShowRoulette] = useState(false);
	const { navigate } = useAppNavigation();

	return (
		<BasePage type="scroll">
			{/* Card jogo ao vivo */}
			<Pressable style={styles.matchCard} onPress={() => navigate('GameHome')}>
				<Image source={CAMPO_IMG} style={styles.matchImage} resizeMode="cover" />
				<View style={styles.matchOverlay}>
					<View style={styles.liveTag}>
						<View style={styles.liveDot} />
						<Text style={styles.liveText}>AO VIVO</Text>
					</View>
					<Text style={styles.matchTitle}>Brasil vs Argentina</Text>
					<Text style={styles.matchSub}>Copa América 2026 - Final</Text>
					<View style={styles.matchFooter}>
						<Text style={styles.matchScore}>2 x 1</Text>
						<View style={styles.matchArrow}>
							<ChevronRight size={18} color="#fff" />
						</View>
					</View>
				</View>
			</Pressable>

			{/* Botão roleta */}
			<View style={styles.centerWrap}>
				<Pressable style={styles.openButton} onPress={() => setShowRoulette(true)}>
					<Text style={styles.openButtonText}>Girar Roleta</Text>
				</Pressable>
			</View>

			<Roulette
				visible={showRoulette}
				onClose={() => setShowRoulette(false)}
				onResult={(item) => {
					console.log(`Prize: ${item.label} (${item.value})`);
				}}
			/>
		</BasePage>
	);
}

const styles = StyleSheet.create({
	matchCard: {
		marginHorizontal: 16,
		marginTop: 16,
		borderRadius: 16,
		overflow: 'hidden',
		height: 180,
		backgroundColor: '#0a0e2a',
	},
	matchImage: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		opacity: 0.6,
	},
	matchOverlay: {
		flex: 1,
		padding: 16,
		justifyContent: 'flex-end',
	},
	liveTag: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(255,59,48,0.9)',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 5,
		marginBottom: 8,
		gap: 5,
	},
	liveDot: {
		width: 5,
		height: 5,
		borderRadius: 3,
		backgroundColor: '#fff',
	},
	liveText: {
		fontFamily: 'Inter_700Bold',
		fontSize: 10,
		color: '#fff',
		letterSpacing: 0.8,
	},
	matchTitle: {
		fontFamily: 'Inter_700Bold',
		fontSize: 18,
		color: '#fff',
		marginBottom: 2,
	},
	matchSub: {
		fontSize: 12,
		color: 'rgba(255,255,255,0.5)',
		marginBottom: 8,
	},
	matchFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	matchScore: {
		fontFamily: 'Inter_700Bold',
		fontSize: 22,
		color: '#fff',
	},
	matchArrow: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(255,255,255,0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerWrap: {
		marginTop: 24,
		alignItems: 'center',
	},
	openButton: {
		backgroundColor: '#2EE683',
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 12,
	},
	openButtonText: {
		fontFamily: 'Inter_700Bold',
		color: '#02003A',
		fontSize: 16,
	},
});
