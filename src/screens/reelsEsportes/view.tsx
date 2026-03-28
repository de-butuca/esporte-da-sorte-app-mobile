import React from 'react';
import { ActivityIndicator, View, Pressable } from 'react-native';
import { X, MapPin, Tv, Clock, Bell, BellOff } from 'lucide-react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useReelsEsportesViewModel } from './viewmodel';
import { RES } from './reelsEsportes.styled';
import { BasePage } from '@/components/BasePage';
import { ReelsHeader } from './ReelsHeader';
import { useMatchReminder } from '@/hooks/useMatchReminder';

export default function ReelsEsportesScreen() {
	const {
		currentMatch,
		currentIndex,
		matches,
		isLoading,
		handlePreviousMatch,
		handleNextMatch,
		handleDismiss,
		handleBetNow,
	} = useReelsEsportesViewModel();

	const { isReminderActive, toggleReminder } = useMatchReminder(
		currentMatch?.id || '',
		currentMatch?.homeTeam || '',
		currentMatch?.awayTeam || ''
	);

	if (isLoading) {
		return (
			<RES.container>
				<ActivityIndicator size="large" color="#38E67D" />
			</RES.container>
		);
	}

	if (!currentMatch) {
		return (
			<RES.container>
				<RES.noMatchText>Nenhuma partida disponível</RES.noMatchText>
			</RES.container>
		);
	}

	const swipeGesture = Gesture.Fling()
		.direction(1) // Right swipe
		.onEnd(() => {
			handlePreviousMatch();
		})
		.runOnJS(true);

	const swipeLeftGesture = Gesture.Fling()
		.direction(2) // Left swipe
		.onEnd(() => {
			handleNextMatch();
		})
		.runOnJS(true);

	const combinedGesture = Gesture.Exclusive(swipeGesture, swipeLeftGesture);

	return (
		<BasePage fullscreen>
			<GestureDetector gesture={combinedGesture}>
				<View style={{ flex: 1 }} collapsable={false}>
					{/* Left tap area */}
					<Pressable
						onPress={handlePreviousMatch}
						style={{
							position: 'absolute',
							left: 0,
							top: 60,
							bottom: 0,
							width: '15%',
							zIndex: 5,
						}}
					/>

					{/* Right tap area */}
					<Pressable
						onPress={handleNextMatch}
						style={{
							position: 'absolute',
							right: 0,
							top: 60,
							bottom: 0,
							width: '15%',
							zIndex: 5,
						}}
					/>

					<RES.background source={currentMatch.backgroundImage} resizeMode="cover">
						{/* Dark overlay filter */}
						<View
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'rgba(0, 0, 0, 0.6)',
							}}
						/>

						{/* Content */}
						<RES.content>
							{/* Progress Header */}
							<ReelsHeader
								currentIndex={currentIndex}
								totalMatches={matches.length}
								isLoading={isLoading}
								onProgressEnd={handleNextMatch}
							/>

							{/* Header */}
							<RES.header>
								<RES.branding>
									<RES.statusIndicator />
									<React.Fragment>
										<RES.brandText>Próximas Partidas</RES.brandText>
										<RES.brandSubtext>Esportes da Sorte</RES.brandSubtext>
									</React.Fragment>
								</RES.branding>
								<RES.closeButton onPress={handleDismiss}>
									<X size={24} color="white" />
								</RES.closeButton>
							</RES.header>

							{/* Match Info */}
							<RES.matchInfo>
								<RES.leagueLabel>{currentMatch.leagueName}</RES.leagueLabel>

								<RES.teamMatchup>
									<RES.teamName>{currentMatch.homeTeam}</RES.teamName>
									<RES.versus>vs</RES.versus>
									<RES.teamName>{currentMatch.awayTeam}</RES.teamName>
								</RES.teamMatchup>

								<RES.timeContainer>
									<RES.timeText>Hoje, 20:30</RES.timeText>
								</RES.timeContainer>

								<RES.countdownBadge>
									<Clock size={16} color="white" />
									<RES.countdownText>Começa em: {currentMatch.countdownMinutes}m</RES.countdownText>
								</RES.countdownBadge>

								<RES.infoContainer>
									<RES.infoRow>
										<MapPin size={16} color="white" />
										<RES.infoText>{currentMatch.location}</RES.infoText>
									</RES.infoRow>
									<RES.infoRow>
										<Tv size={16} color="white" />
										<RES.infoText>{currentMatch.broadcast}</RES.infoText>
									</RES.infoRow>
								</RES.infoContainer>

								<RES.buttonsContainer>
									{isReminderActive ? (
										<RES.buttonReminderActive onPress={toggleReminder}>
											<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
												<BellOff size={16} color="white" style={{ marginRight: 6 }} />
												<RES.buttonReminderActiveText>Lembrete Ativo ✓</RES.buttonReminderActiveText>
											</View>
										</RES.buttonReminderActive>
									) : (
										<RES.buttonOutline onPress={toggleReminder}>
											<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
												<Bell size={16} color="#38E67D" style={{ marginRight: 6 }} />
												<RES.buttonTextOutline>Ativar Lembrete</RES.buttonTextOutline>
											</View>
										</RES.buttonOutline>
									)}
									<RES.buttonFilled onPress={handleBetNow}>
										<RES.buttonTextFilled>Apostar agora</RES.buttonTextFilled>
									</RES.buttonFilled>
								</RES.buttonsContainer>
							</RES.matchInfo>
						</RES.content>
					</RES.background>
				</View>
			</GestureDetector>
		</BasePage>
	);
}
