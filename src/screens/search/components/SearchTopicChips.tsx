import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/stampd.config';

interface SearchTopicChipsProps {
	topics: string[];
	onPressTopic: (topic: string) => void;
}

export function SearchTopicChips({ topics, onPressTopic }: SearchTopicChipsProps) {
	if (!topics.length) return null;

	return (
		<View style={styles.wrapper}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.content}
			>
				{topics.map((topic) => (
					<TouchableOpacity
						key={topic}
						style={styles.chip}
						onPress={() => onPressTopic(topic)}
						activeOpacity={0.8}
					>
						<Text style={styles.label}>{topic}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginHorizontal: RFValue(-20),
	},
	content: {
		paddingHorizontal: RFValue(20),
		gap: RFValue(10),
	},
	chip: {
		paddingHorizontal: RFValue(14),
		paddingVertical: RFValue(10),
		borderRadius: RFValue(10),
		backgroundColor: '#171F31',
	},
	label: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: lightColors.textPrimary,
	},
});
