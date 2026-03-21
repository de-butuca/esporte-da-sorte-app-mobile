import { BasePage } from '@/components/BasePage';

import { useMiniGamesViewModel } from './Minigames.viewModel';
import { GamePages } from '@/navigation/types';
import { MGS } from './styles';
import { useRewardedInterstitialAd } from '@/hooks/ad/useRewardedInterstitialAd';
import mobileAds, {
	AdEventType,
	InterstitialAd,
	MaxAdContentRating,
	RewardedAdEventType,
	RewardedInterstitialAd,
	TestIds,
} from 'react-native-google-mobile-ads';
import { View } from 'react-native';
import { useState, useEffect } from 'react';

const GameList: { id: string; name: string; path: keyof GamePages }[] = [
	{ id: 'flap', name: 'Flap game', path: 'flapGame' },
	{ id: 'snake', name: 'Snake game', path: 'snakeGame' },
];

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
	keywords: ['fashion', 'clothing'],
});

export default function MiniGamesScreen() {
	const { SendToPage } = useMiniGamesViewModel();

	const { show, loaded } = useRewardedInterstitialAd();

	// const [loaded, setLoaded] = useState(false);
	// const [ad, setAd] = useState<RewardedInterstitialAd | null>(null);

	// useEffect(() => {
	// 	async function initAds() {
	// 		// 1️⃣ Configurar
	// 		await mobileAds().setRequestConfiguration({
	// 			maxAdContentRating: MaxAdContentRating.G,
	// 			tagForChildDirectedTreatment: true,
	// 			tagForUnderAgeOfConsent: true,
	// 		});

	// 		console.log('Mobile Ads configured');

	// 		// 2️⃣ Inicializar (OBRIGATÓRIO)
	// 		await mobileAds().initialize();
	// 		console.log('MobileAds inicializado');

	// 		// 3️⃣ Criar o ad DEPOIS do initialize
	// 		const rewarded = RewardedInterstitialAd.createForAdRequest(
	// 			__DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-xxx/yyy'
	// 		);

	// 		// 4️⃣ Eventos
	// 		rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
	// 			console.log('✅ LOADED');
	// 			setLoaded(true);
	// 		});

	// 		rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
	// 			console.log('🎁 REWARD', reward);
	// 		});

	// 		rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
	// 			console.log('❌ ERROR causa', error.cause);
	// 			console.log('❌ ERROR stack', error.stack);
	// 			console.log('❌ ERROR mensagem', error.message);
	// 		});

	// 		// 5️⃣ Carregar
	// 		rewarded.load();

	// 		setAd(rewarded);
	// 	}

	// 	initAds();
	// }, []);
	return (
		<BasePage type="view">
			<MGS.Container>
				{GameList.map((game) => (
					<MGS.GameItem
						key={game.id}
						onPress={() => {
							SendToPage(game.path);
						}}
					>
						{/* <MGS.Text>{loaded ? 'carregou' : 'n carregou'}</MGS.Text> */}
						<MGS.Text>{game.name}</MGS.Text>
					</MGS.GameItem>
				))}
			</MGS.Container>
		</BasePage>
	);
}
