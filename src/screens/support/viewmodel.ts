import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useAppNavigation } from '@/navigation/hooks';
import { SupportFaqItemViewModel, SupportShortcut } from './support.types';

const SUPPORT_SHORTCUTS: SupportShortcut[] = [
	{ id: 'login', label: 'Problemas com login', tag: 'login' },
	{ id: 'payments', label: 'Depósitos e saques', tag: 'payments' },
	{ id: 'bets', label: 'Apostas e resultados', tag: 'bets' },
	{ id: 'security', label: 'Conta e segurança', tag: 'security' },
];

const SUPPORT_FAQS: SupportFaqItemViewModel[] = [
	{
		id: 'cannot-login',
		question: 'Não consigo entrar na conta',
		answer:
			'Verifique se seu e-mail e senha estão corretos. Se esqueceu sua senha, clique em "Esqueci minha senha" na tela de login. Caso o problema persista, entre em contato conosco.',
		tags: ['login', 'security'],
	},
	{
		id: 'forgot-password',
		question: 'Esqueci minha senha',
		answer:
			'Na tela de login, clique em "Esqueci minha senha" e siga as instruções. Você receberá um e-mail com um link para redefinir sua senha.',
		tags: ['login', 'security'],
	},
	{
		id: 'deposit-missing',
		question: 'Meu depósito não caiu',
		answer:
			'Os depósitos podem levar até 15 minutos para serem processados. Verifique seu histórico de transações. Se após 24 horas o valor não aparecer, abra um chamado com comprovante.',
		tags: ['payments'],
	},
	{
		id: 'notifications',
		question: 'Como ativar notificações de jogos?',
		answer:
			'Vá em Configurações > Notificações e ative as opções desejadas. Certifique-se de que as notificações estão permitidas nas configurações do seu dispositivo.',
		tags: ['bets', 'security'],
	},
	{
		id: 'contact-support',
		question: 'Como falar com atendimento?',
		answer:
			'Você pode abrir um chamado através do formulário abaixo ou entrar em contato via chat ao vivo. Nossa equipe responde em até 24 horas.',
		tags: ['login', 'payments', 'bets', 'security'],
	},
];

export function useSupportViewModel() {
	const navigation = useAppNavigation();
	const [searchQuery, setSearchQuery] = useState('');
	const [activeShortcut, setActiveShortcut] = useState<string | null>(null);
	const [expandedFaqIds, setExpandedFaqIds] = useState<string[]>([]);

	const visibleFaqs = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase();

		return SUPPORT_FAQS.filter((item) => {
			const matchesShortcut = activeShortcut ? item.tags.includes(activeShortcut) : true;
			const matchesQuery = normalizedQuery
				? `${item.question} ${item.answer}`.toLowerCase().includes(normalizedQuery)
				: true;

			return matchesShortcut && matchesQuery;
		});
	}, [activeShortcut, searchQuery]);

	function toggleShortcut(tag: string) {
		setActiveShortcut((currentTag) => (currentTag === tag ? null : tag));
	}

	function toggleFaq(id: string) {
		setExpandedFaqIds((currentIds) =>
			currentIds.includes(id)
				? currentIds.filter((currentId) => currentId !== id)
				: [...currentIds, id],
		);
	}

	function handleBack() {
		if (navigation.canGoBack()) {
			navigation.goBack();
			return;
		}

		navigation.navigate('Home');
	}

	function handleHelpPress() {
		Alert.alert(
			'Fala com a gente',
			'Canal preparado para receber integração com chat e abertura de chamado em uma próxima etapa.',
		);
	}

	return {
		title: 'Suporte',
		searchQuery,
		setSearchQuery,
		shortcuts: SUPPORT_SHORTCUTS,
		activeShortcut,
		visibleFaqs,
		expandedFaqIds,
		handleBack,
		handleHelpPress,
		toggleShortcut,
		toggleFaq,
	};
}
