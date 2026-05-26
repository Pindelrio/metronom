import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BRAND_BLUE, TEXT_PRIMARY, TEXT_SECONDARY } from '../../constants/colors';
import { RADIUS_MD, SPACING_SM } from '../../constants/layout';
import { useMetronomeStore } from '../../store/metronomeStore';
import { SoundVariant } from '../../types';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const OPTIONS: { variant: SoundVariant; icon: IoniconName }[] = [
  { variant: 'classic', icon: 'musical-notes-outline' },
  { variant: 'wood',    icon: 'leaf-outline' },
  { variant: 'digital', icon: 'pulse-outline' },
];

export function SoundPicker() {
  const variant = useMetronomeStore((s) => s.soundVariant);
  const setVariant = useMetronomeStore((s) => s.setSoundVariant);

  return (
    <View style={styles.container}>
      <Ionicons name="volume-medium-outline" size={18} color={TEXT_SECONDARY} style={styles.title} />
      <View style={styles.row}>
        {OPTIONS.map(({ variant: v, icon }) => (
          <Pressable
            key={v}
            style={[styles.pill, variant === v && styles.activePill]}
            onPress={() => setVariant(v)}
          >
            <Ionicons
              name={icon}
              size={20}
              color={variant === v ? TEXT_PRIMARY : TEXT_SECONDARY}
            />
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
    alignSelf: 'stretch',
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
});
