import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Styled } from 'stampd/styled';

interface ReelsHeaderProps {
	currentIndex: number;
	totalMatches: number;
	isLoading: boolean;
	onProgressEnd: () => void;
}

const Container = Styled.View({
	style: ({ theme }) => ({
		paddingHorizontal: theme.spacing.p4,
		paddingVertical: theme.spacing.p3,
		gap: theme.spacing.p2,
	}),
});

const ProgressContainer = Styled.View({
	style: ({ theme }) => ({
		flexDirection: 'row',
		gap: theme.spacing.p2,
	}),
});

const ProgressBar = Styled.View({
	style: ({ theme }) => ({
		flex: 1,
		height: 2,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: theme.radius.roundedFull,
		overflow: 'hidden',
	}),
});

const InfoContainer = Styled.View({
	style: ({ theme }) => ({
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: theme.spacing.p2,
	}),
});

const StoreLabel = Styled.Text({
	style: ({ theme }) => ({
		fontSize: theme.fonts.sizes.xs,
		fontFamily: theme.fonts.family.medium,
		color: theme.colors.textPrimary,
		textTransform: 'uppercase',
	}),
});

const IndexText = Styled.Text({
	style: ({ theme }) => ({
		fontSize: theme.fonts.sizes.xs,
		color: theme.colors.textSecondary,
	}),
});

const DURATION = 5000; // 5 seconds per reel

export function ReelsHeader({ currentIndex, totalMatches, isLoading, onProgressEnd }: ReelsHeaderProps) {
	const progress = useSharedValue(0);

	useEffect(() => {
		// Reset and restart progress
		progress.value = 0;
		progress.value = withTiming(100, { duration: DURATION });
	}, [currentIndex, progress]);

	useEffect(() => {
		// Notify when progress ends
		const timer = setTimeout(() => {
			onProgressEnd();
		}, DURATION);

		return () => clearTimeout(timer);
	}, [currentIndex, onProgressEnd]);

	const animatedProgressStyle = useAnimatedStyle(() => ({
		width: `${progress.value}%`,
	}));

	return (
		<Container>
			{/* Progress bars for each match */}
			<ProgressContainer>
				{Array.from({ length: totalMatches }).map((_, index) => (
					<ProgressBar key={index}>
						{index === currentIndex && (
							<Animated.View
								style={[
									{
										flex: 1,
										backgroundColor: 'white',
										height: '100%',
									},
									animatedProgressStyle,
								]}
							/>
						)}
						{index < currentIndex && <View style={{ flex: 1, backgroundColor: 'white', height: '100%' }} />}
					</ProgressBar>
				))}
			</ProgressContainer>

			{/* Info row */}
			{/* <InfoContainer>
				<StoreLabel></StoreLabel>
				<IndexText>
					{currentIndex + 1} / {totalMatches}
				</IndexText>
			</InfoContainer> */}
		</Container>
	);
}
