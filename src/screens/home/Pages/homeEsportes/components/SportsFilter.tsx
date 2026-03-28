import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Styled } from 'stampd/styled';

interface Sport {
	id: string;
	label: string;
}

interface SportsFilterProps {
	sports: Sport[];
	onSelect?: (sportId: string) => void;
}

const SF = {
	container: Styled.View({
		style: {
			paddingVertical: 12,
		},
	}),

	scrollContent: Styled.View({
		style: {
			flexDirection: 'row',
			gap: 10,
			paddingHorizontal: 16,
		},
	}),

	filterButton: Styled.TouchableOpacity({
		style: ({ theme, selected }) => ({
			paddingHorizontal: theme.spacing.p3,
			paddingVertical: theme.spacing.p2,
			borderRadius: theme.radius.roundedFull,
			backgroundColor: selected ? theme.colors.accent : 'rgba(160, 160, 200, 0.12)',
			borderWidth: 1,
			borderColor: selected ? theme.colors.accent : 'transparent',
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	filterText: Styled.Text({
		style: ({ theme, selected }) => ({
			fontSize: theme.fonts.sizes.sm,
			fontFamily: theme.fonts.family.medium,
			color: selected ? theme.colors.background : theme.colors.textSecondary,
		}),
	}),
};

export function SportsFilter({ sports, onSelect }: SportsFilterProps) {
	const [selected, setSelected] = useState<string>(sports[0]?.id || '');

	const handleSelect = (sportId: string) => {
		setSelected(sportId);
		onSelect?.(sportId);
	};

	return (
		<SF.container>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<SF.scrollContent>
					{sports.map((sport) => (
						<SF.filterButton
							key={sport.id}
							selected={selected === sport.id}
							onPress={() => handleSelect(sport.id)}
						>
							<SF.filterText selected={selected === sport.id}>
								{sport.label}
							</SF.filterText>
						</SF.filterButton>
					))}
				</SF.scrollContent>
			</ScrollView>
		</SF.container>
	);
}
