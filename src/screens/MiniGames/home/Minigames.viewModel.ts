import { useAppNavigation } from '@/navigation/hooks'
import { GamePages } from '@/navigation/types'

export function useMiniGamesViewModel() {
	const { navigate } = useAppNavigation()

	function SendToPage(page: keyof GamePages) {
		navigate(page)
	}

	return { SendToPage }
}
