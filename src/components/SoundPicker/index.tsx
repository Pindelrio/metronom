import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BRAND_BLUE, TEXT_PRIMARY, TEXT_SECONDARY } from '../../constants/colors';
import { RADIUS_MD, SPACING_SM } from '../../constants/layout';
import { useMetronomeStore } from '../../store/metronomeStore';
import { SoundVariant } from '../../types';
import { SecondaryText } from '../ui/Typography';

const OPTIONS: { variant: SoundVariant; label: string }[] = [
  { variant: 'classic', label: 'Clàssic' },
  { variant: 'wood', label: 'Fusta' },
  { variant: 'digital', label: 'Digital' },
];

export function SoundPicker() {
  const variant = useMetronomeStore((s) => s.soundVariant);
  const setVariant = useMetronomeStore((s) => s.setSoundVariant);

  return (
    <View style={styles.container}>
      <SecondaryText style={styles.title}>So</SecondaryText>
      <View style={styles.row}>
        {OPTIONS.map(({ variant: v, label }) => (
          <Pressable
            key={v}
            style={[styles.pill, variant === v && styles.activePill]}
            onPress={() => setVariant(v)}
          >
            <Text style={[styles.pillText, variant === v && styles.activePillText]}>
              {label}
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
  },
  title: {
    marginBottom: SPACING_SM,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: SPACING_SM,
    justifyContent: 'center',
  },
  pill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS_MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
  },
  activePill: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  pillText: {
    color: TEXT_SECONDARY,
    fontSize: 13,
    fontWeight: '600',
  },
  activePillText: {
    color: TEXT_PRIMARY,
  },
});
