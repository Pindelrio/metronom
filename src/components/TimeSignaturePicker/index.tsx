import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BRAND_BLUE, TEXT_PRIMARY, TEXT_SECONDARY } from '../../constants/colors';
import { RADIUS_MD, SPACING_SM } from '../../constants/layout';
import { useMetronomeStore } from '../../store/metronomeStore';
import { TimeSignature } from '../../types';

const OPTIONS: TimeSignature[] = [2, 3, 4, 6];
const LABELS: Record<TimeSignature, string> = {
  2: '2/4',
  3: '3/4',
  4: '4/4',
  6: '6/8',
};

export function TimeSignaturePicker() {
  const ts = useMetronomeStore((s) => s.timeSignature);
  const setTs = useMetronomeStore((s) => s.setTimeSignature);

  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={18} color={TEXT_SECONDARY} style={styles.title} />
      <View style={styles.row}>
        {OPTIONS.map((opt) => (
          <Pressable
            key={opt}
            style={[styles.pill, ts === opt && styles.activePill]}
            onPress={() => setTs(opt)}
          >
            <Text style={[styles.pillText, ts === opt && styles.activePillText]}>
              {LABELS[opt]}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    alignItems: 'center',
  },
  title: {
    marginBottom: SPACING_SM,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING_SM,
    justifyContent: 'center',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS_MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  activePill: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  pillText: {
    color: TEXT_SECONDARY,
    fontSize: 14,
    fontWeight: '600',
  },
  activePillText: {
    color: TEXT_PRIMARY,
  },
});
