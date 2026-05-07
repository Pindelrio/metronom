import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { BRAND_BLUE, TEXT_PRIMARY } from '../../constants/colors';
import { RADIUS_MD, TAP_BUTTON_HEIGHT } from '../../constants/layout';
import { useTapTempo } from '../../hooks/useTapTempo';

export function TapTempoButton() {
  const { tap } = useTapTempo();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    tap();
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      onPress={handlePress}
    >
      <Text style={styles.label}>TAP</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: TAP_BUTTON_HEIGHT,
    borderRadius: RADIUS_MD,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: 'rgba(59,130,246,0.3)',
  },
  label: {
    color: BRAND_BLUE,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
