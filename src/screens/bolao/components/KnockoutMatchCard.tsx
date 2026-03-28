import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import type { Match, PhaseId, PickResult } from '../bolao.types';
import { TeamButton } from './TeamButton';

interface KnockoutMatchCardProps {
  match: Match;
  currentPick: PickResult | undefined;
  onPick: (matchId: string, pick: PickResult) => void;
  phaseId: PhaseId;
}

function KnockoutMatchCardInner({ match, currentPick, onPick, phaseId }: KnockoutMatchCardProps) {
  const homeCode = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
  const awayCode = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

  const handlePickHome = useCallback(() => {
    onPick(match.id, homeCode);
  }, [onPick, match.id, homeCode]);

  const handlePickAway = useCallback(() => {
    onPick(match.id, awayCode);
  }, [onPick, match.id, awayCode]);

  const [, month, day] = match.date.split('-');
  const formattedDate = `${day} ${MONTHS[parseInt(month, 10) - 1]}`;

  const isFinal = phaseId === 'final';
  const isThirdPlace = phaseId === 'thirdPlace';
  const showChip = isFinal || isThirdPlace;

  const cardBorderColor = isFinal
    ? '#00E878'
    : isThirdPlace
      ? '#2D2387'
      : 'rgba(148,163,184,0.2)';

  return (
    <View style={[styles.card, { borderColor: cardBorderColor }]}>
      {showChip && (
        <View
          style={[
            styles.phaseChip,
            isFinal ? styles.phaseChipFinal : styles.phaseChipThird,
          ]}
        >
          <Text
            style={[
              styles.phaseChipText,
              isFinal ? styles.phaseChipTextFinal : styles.phaseChipTextThird,
            ]}
          >
            {PHASE_LABELS[phaseId]}
          </Text>
        </View>
      )}

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
        <Text style={styles.vsText}>VS</Text>
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

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const PHASE_LABELS: Record<string, string> = {
  round16: 'OITAVAS',
  quarters: 'QUARTAS',
  semi: 'SEMIFINAL',
  thirdPlace: '3\u00BA LUGAR',
  final: 'FINAL',
};

export const KnockoutMatchCard = React.memo(KnockoutMatchCardInner);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#243447',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  phaseChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(3),
    borderRadius: RFValue(6),
    marginBottom: RFValue(8),
  },
  phaseChipFinal: {
    backgroundColor: 'rgba(0,232,120,0.15)',
  },
  phaseChipThird: {
    backgroundColor: 'rgba(45,35,135,0.15)',
  },
  phaseChipText: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(10),
    includeFontPadding: false,
  },
  phaseChipTextFinal: {
    color: '#00E878',
  },
  phaseChipTextThird: {
    color: '#B0A8F0',
  },
  dateText: {
    fontFamily: fontFamily.regular,
    fontSize: RFValue(11),
    color: '#94A3B8',
    marginBottom: RFValue(10),
    includeFontPadding: false,
  },
  picksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vsText: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(12),
    color: '#475569',
    textAlign: 'center',
    width: RFValue(48),
    includeFontPadding: false,
  },
});
