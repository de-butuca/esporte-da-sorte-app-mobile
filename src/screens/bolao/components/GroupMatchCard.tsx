import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import type { Match, PickResult } from '../bolao.types';
import { TeamButton } from './TeamButton';
import { DrawButton } from './DrawButton';

interface GroupMatchCardProps {
  match: Match;
  currentPick: PickResult | undefined;
  onPick: (matchId: string, pick: PickResult) => void;
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function GroupMatchCardInner({ match, currentPick, onPick }: GroupMatchCardProps) {
  const homeCode = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
  const awayCode = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

  const handlePickHome = useCallback(() => {
    onPick(match.id, homeCode);
  }, [onPick, match.id, homeCode]);

  const handlePickDraw = useCallback(() => {
    onPick(match.id, 'draw');
  }, [onPick, match.id]);

  const handlePickAway = useCallback(() => {
    onPick(match.id, awayCode);
  }, [onPick, match.id, awayCode]);

  const [, month, day] = match.date.split('-');
  const formattedDate = `${day} ${MONTHS[parseInt(month, 10) - 1]}`;

  return (
    <View style={styles.matchRow}>
      <Text style={styles.dateText}>
        {formattedDate} {'\u00B7'} {match.time}
      </Text>
      <View style={styles.picksRow}>
        <TeamButton
          team={match.homeTeam}
          isSelected={currentPick === homeCode}
          side="home"
          onPress={handlePickHome}
        />
        <DrawButton
          isSelected={currentPick === 'draw'}
          onPress={handlePickDraw}
        />
        <TeamButton
          team={match.awayTeam}
          isSelected={currentPick === awayCode}
          side="away"
          onPress={handlePickAway}
        />
      </View>
    </View>
  );
}

export const GroupMatchCard = React.memo(GroupMatchCardInner);

const styles = StyleSheet.create({
  matchRow: {
    gap: RFValue(8),
  },
  dateText: {
    fontFamily: fontFamily.regular,
    fontSize: RFValue(11),
    color: '#94A3B8',
    includeFontPadding: false,
  },
  picksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
