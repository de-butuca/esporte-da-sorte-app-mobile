import { useAppNavigation } from '@/navigation/hooks';
import React, { useCallback, useEffect } from 'react';
import { HeaderStyles as HS } from './styles';
import { ArrowLeft, Feather } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { Alert, BackHandler } from 'react-native';

interface IHeaderRouterProps {
	title?: string;
	back?: any;
}

export function HeaderRouter({ back, title }: IHeaderRouterProps) {
	const navigation = useAppNavigation();
	const { theme } = useTheme();

	const handlerGoBack = useCallback(() => {
		navigation.goBack();
	}, []);

	const onBackPress = () => {
		// return false;
		Alert.alert('Sair', 'Tem certeza que deseja voltar?', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Sim',
				onPress: () => navigation.goBack(),
			},
		]);

		return true; // 🔴 impede o comportamento padrão
	};

	useEffect(() => {
		const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

		return () => subscription.remove(); // 🧹 remove ao desmontar
	}, [navigation]);

	if (back)
		return (
			<HS.Container>
				{/* <Logo source={require("@assets/images/logoHorizontal.png")} resizeMode="contain" /> */}
				<HS.ContainerBackIcon onPress={handlerGoBack}>
					<ArrowLeft size={42} color={theme.colors.primary} />
				</HS.ContainerBackIcon>
				<HS.Body>{title && <HS.Text>{title}</HS.Text>}</HS.Body>
			</HS.Container>
		);

	if (title)
		return (
			<HS.Container>
				<HS.Body>
					<HS.Text>{title}</HS.Text>
				</HS.Body>
			</HS.Container>
		);

	return <></>;
}
