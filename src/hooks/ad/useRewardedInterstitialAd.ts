import { useEffect, useState, useRef, useCallback } from 'react';
import {
	RewardedInterstitialAd,
	RewardedAdEventType,
	AdEventType,
	TestIds,
	InterstitialAd,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

export function useRewardedInterstitialAd() {
	const [loaded, setLoaded] = useState(false);
	const adRef = useRef<RewardedInterstitialAd | null>(null);

	useEffect(() => {
		const ad = RewardedInterstitialAd.createForAdRequest(adUnitId);

		adRef.current = ad;

		const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
			console.log('✅ Ad carregado');
			setLoaded(true);
		});

		const unsubscribeReward = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
			console.log('🎁 Reward ganho:', reward);
		});

		const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, (error) => {
			console.log('❌ ERRO NO AD:', {
				error: error,
				message: error.message,
				stack: error.stack,
			});

			setLoaded(false);

			// retry automático
			setTimeout(() => {
				ad.load();
			}, 2000);
		});

		ad.load();

		return () => {
			unsubscribeLoaded();
			unsubscribeReward();
			unsubscribeError();
		};
	}, []);

	const show = useCallback(() => {
		if (loaded && adRef.current) {
			adRef.current.show();
		} else {
			console.log('⚠️ Ad não está pronto ainda');
		}
	}, [loaded]);

	return { loaded, show };
}
