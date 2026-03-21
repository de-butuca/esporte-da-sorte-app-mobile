import { PS } from './styles';

export function PropagandaScreen() {
	return (
		<PS.Container>
			<PS.Background
				onPress={() => {
					console.log('voltou');
				}}
			></PS.Background>
			<PS.Content>
				<PS.TextHeader>propaganda</PS.TextHeader>
			</PS.Content>
		</PS.Container>
	);
}
