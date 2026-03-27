import { BasePage } from '@/components/BasePage';
import { ButtonBase } from '@/components/Button';
import { useSessionStore } from '@/core/session/useSessionStore';

export function PerfilScreen() {
	const signOut = useSessionStore((s) => s.signOut);

	return (
		<BasePage type="scroll">
			<ButtonBase text="Sair da conta" onPress={signOut} />
		</BasePage>
	);
}
