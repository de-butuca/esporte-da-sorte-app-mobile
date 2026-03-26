import { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import { BasePage } from '@/components/BasePage';
import { Roulette } from '@/components/Roulette';

const { height: SCREEN_H } = Dimensions.get('window');

export default function HomeScreen() {
	const [showRoulette, setShowRoulette] = useState(false);

	return (
		<BasePage type="scroll">
			<View style={styles.centerWrap}>
				<Pressable style={styles.openButton} onPress={() => setShowRoulette(true)}>
					<Text style={styles.openButtonText}>🎰 Girar Roleta</Text>
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
	centerWrap: {
		height: SCREEN_H * 0.75,
		justifyContent: 'center',
		alignItems: 'center',
	},
	openButton: {
		backgroundColor: '#37E67D',
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 30,
	},
	openButtonText: {
		color: '#023697',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
