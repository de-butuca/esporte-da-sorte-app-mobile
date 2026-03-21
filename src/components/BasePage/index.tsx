import {
	Keyboard,
	KeyboardAvoidingViewProps,
	Platform,
	RefreshControl,
	ScrollViewProps,
	TouchableWithoutFeedback,
} from "react-native"
import { BPS } from "./styles"

type BasePageType = "view" | "scroll" | "form"

interface BasePageProps {
	children?: React.ReactNode
	type?: BasePageType
	refreshing?: boolean
	onRefresh?: () => void
	scrollProps?: ScrollViewProps
	keyboardProps?: KeyboardAvoidingViewProps
	padding?: number
}

export function BasePage({
	children,
	type = "view",
	refreshing = false,
	onRefresh,
	scrollProps,
	keyboardProps,
	padding = 12,
}: BasePageProps) {
	if (type === "scroll") {
		return (
			<BPS.ScrollView
				contentContainerStyle={{ padding }}
				refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
				keyboardShouldPersistTaps="handled"
				{...scrollProps}
			>
				{children}
			</BPS.ScrollView>
		)
	}

	if (type === "form") {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<BPS.KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "padding"}
					style={{ flex: 1, padding }}
					{...keyboardProps}
				>
					{children}
				</BPS.KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		)
	}

	return <BPS.View style={{ padding }}>{children}</BPS.View>
}
