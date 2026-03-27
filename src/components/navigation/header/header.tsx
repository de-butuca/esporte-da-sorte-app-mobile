import { useAppNavigation } from '@/navigation/hooks';
import React, { useCallback, useEffect } from 'react';
import { HeaderStyles as HS } from './styles';
import { ArrowLeft } from 'lucide-react-native';
import { Alert, BackHandler } from 'react-native';
import Logo from '@assets/images/logo-square.svg';
import { ButtonBase } from '@/components/Button';
import { useStampdUI } from 'stampd/context';

interface IHeaderRouterProps {
	title?: string;
	back?: any;
}

const NOOP = () => {};

export function HeaderRouter({ back, title }: IHeaderRouterProps) {
	const navigation = useAppNavigation();
	const { theme } = useStampdUI();

	const handlerGoBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const onBackPress = useCallback(() => {
		Alert.alert('Sair', 'Tem certeza que deseja voltar?', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Sim',
				onPress: () => navigation.goBack(),
			},
		]);

		return true;
	}, [navigation]);

	useEffect(() => {
		const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

		return () => subscription.remove();
	}, [onBackPress]);

	if (back)
		return (
			<HS.Container>
				<Logo width={40} height={40} />
				<HS.ContainerBackIcon onPress={handlerGoBack}>
					<ArrowLeft size={42} color={theme.colors.onBackground} />
				</HS.ContainerBackIcon>
				<HS.Body>{title && <HS.Text>{title}</HS.Text>}</HS.Body>
			</HS.Container>
		);

	return (
		<HS.Container>
			<HS.Body>
				<HS.BodyStart>
					<Logo width={32} height={32} />
				</HS.BodyStart>

				<HS.BodyMiddle>{/* centro */}</HS.BodyMiddle>

				<HS.BodyEnd>
					<ButtonBase text="Entrar" onPress={NOOP} size="sm" />
				</HS.BodyEnd>
			</HS.Body>
		</HS.Container>
	);
}
