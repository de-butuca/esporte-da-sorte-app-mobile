import { Button } from 'react-native';
import { useSessionStore } from '../../core/session/useSessionStore';

export default function HomeScreen() {
	const signOut = useSessionStore((s) => s.signOut);

	return <Button title="Sair" onPress={signOut} />;
}
