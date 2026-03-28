import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SHS } from '../screens/home/Pages/homeCassino/homeCassino.styled';

interface SectionHeaderProps {
	title: string;
	count?: number;
	hasLive?: boolean;
	onSeeAll?: () => void;
}

export function SectionHeader({ title, count, hasLive, onSeeAll }: SectionHeaderProps) {
	return (
		<SHS.container>
			<SHS.titleRow>
				{hasLive && <SHS.liveDot />}
				<SHS.title>{title}</SHS.title>
			</SHS.titleRow>
			{count !== undefined && (
				<TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
					<SHS.seeAll>Ver todos →</SHS.seeAll>
				</TouchableOpacity>
			)}
		</SHS.container>
	);
}
