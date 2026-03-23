import { Button } from 'react-native';
import { useSessionStore } from '../../core/session/useSessionStore';
import { BasePage } from '@/components/BasePage';
import { ButtonBase } from '@/components/Button';

export default function HomeScreen() {
	return (
		<BasePage>
			<ButtonBase text="teste" onPress={() => {}} size="sm" />
		</BasePage>
	);
}
