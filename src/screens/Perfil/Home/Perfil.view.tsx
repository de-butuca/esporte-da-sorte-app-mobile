import { BasePage } from '@/components/BasePage';
import { ButtonBase } from '@/components/Button';
import { useSessionStore } from '@/core/session/useSessionStore';

export function PerfilScreen() {
	const { signOut } = useSessionStore();
	function LogoutHandler() {
		signOut();
	}
	return (
		<BasePage type="scroll">
			<ButtonBase text="Sair da conta" onPress={LogoutHandler} />
		</BasePage>
	);
}
