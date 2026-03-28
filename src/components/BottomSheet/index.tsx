import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import GorhomBottomSheet, {
	BottomSheetBackdrop,
	BottomSheetScrollView,
	BottomSheetView,
	type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { X } from 'lucide-react-native';
import { useStampdUI } from 'stampd/context';

interface AppBottomSheetProps {
	/** Title shown in the header */
	title?: string;
	/** Snap points (e.g. ['50%', '90%']) */
	snapPoints?: (string | number)[];
	/** Children rendered inside the sheet */
	children: React.ReactNode;
	/** Whether content should be scrollable */
	scrollable?: boolean;
	/** Called when the sheet is dismissed */
	onDismiss?: () => void;
	/** Footer rendered below the content */
	footer?: React.ReactNode;
	/** Enable dynamic sizing instead of snap points */
	enableDynamicSizing?: boolean;
}

export const AppBottomSheet = forwardRef<BottomSheetMethods, AppBottomSheetProps>(
	function AppBottomSheet(
		{
			title,
			snapPoints: snapPointsProp,
			children,
			scrollable = true,
			onDismiss,
			footer,
			enableDynamicSizing = false,
		},
		ref
	) {
		const { theme } = useStampdUI();
		const insets = useSafeAreaInsets();

		const snapPoints = useMemo(
			() => snapPointsProp ?? ['50%', '90%'],
			[snapPointsProp]
		);

		const renderBackdrop = useCallback(
			(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
					{...props}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					opacity={0.6}
					pressBehavior="close"
				/>
			),
			[]
		);

		const handleStyle = useMemo(
			() => [styles.handle, { backgroundColor: theme.colors.bgCard }],
			[theme.colors.bgCard]
		);

		const handleIndicatorStyle = useMemo(
			() => ({ backgroundColor: theme.colors.textMuted, width: 40 }),
			[theme.colors.textMuted]
		);

		const sheetStyle = useMemo(
			() => ({ backgroundColor: theme.colors.bgCard }),
			[theme.colors.bgCard]
		);

		const ContentWrapper = scrollable ? BottomSheetScrollView : BottomSheetView;

		return (
			<GorhomBottomSheet
				ref={ref}
				index={-1}
				snapPoints={enableDynamicSizing ? undefined : snapPoints}
				enableDynamicSizing={enableDynamicSizing}
				enablePanDownToClose
				backdropComponent={renderBackdrop}
				handleStyle={handleStyle}
				handleIndicatorStyle={handleIndicatorStyle}
				backgroundStyle={sheetStyle}
				onClose={onDismiss}
			>
				{title ? (
					<View style={styles.header}>
						<Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
						<TouchableOpacity
							onPress={() => (ref as React.RefObject<BottomSheetMethods>)?.current?.close()}
							activeOpacity={0.7}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						>
							<X size={RFValue(20)} color={theme.colors.textPrimary} strokeWidth={2} />
						</TouchableOpacity>
					</View>
				) : null}

				<ContentWrapper
					style={styles.content}
					contentContainerStyle={[
						styles.contentContainer,
						{ paddingBottom: footer ? 0 : insets.bottom + RFValue(16) },
					]}
				>
					{children}
				</ContentWrapper>

				{footer ? (
					<View
						style={[
							styles.footer,
							{
								backgroundColor: theme.colors.bgCard,
								paddingBottom: insets.bottom + RFValue(8),
								borderTopColor: 'rgba(255,255,255,0.08)',
							},
						]}
					>
						{footer}
					</View>
				) : null}
			</GorhomBottomSheet>
		);
	}
);

const styles = StyleSheet.create({
	handle: {
		borderTopLeftRadius: RFValue(16),
		borderTopRightRadius: RFValue(16),
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(16),
	},
	title: {
		fontSize: RFValue(18),
		fontWeight: '700',
	},
	content: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: RFValue(20),
	},
	footer: {
		paddingHorizontal: RFValue(20),
		paddingTop: RFValue(12),
		borderTopWidth: 1,
	},
});

export type { BottomSheetMethods };
