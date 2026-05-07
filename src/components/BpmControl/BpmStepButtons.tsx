import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BRAND_BLUE, TEXT_PRIMARY } from '../../constants/colors';
import { RADIUS_MD, STEP_BUTTON_SIZE } from '../../constants/layout';
import { useMetronomeStore } from '../../store/metronomeStore';

export function BpmStepButtons() {
  const bpm = useMetronomeStore((s) => s.bpm);
  const setBpm = useMetronomeStore((s) => s.setBpm);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = (delta: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setBpm(bpm + delta);
  };

  const startHold = (delta: number) => {
    holdTimerRef.current = setInterval(() => {
      setBpm(useMetronomeStore.getState().bpm + delta);
    }, 100);
  };

  const stopHold = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  return (
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        onPress={() => step(-1)}
        onLongPress={() => startHold(-1)}
        onPressOut={stopHold}
      >
        <Text style={styles.label}>−</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        onPress={() => step(1)}
        onLongPress={() => startHold(1)}
        onPressOut={stopHold}
      >
        <Text style={styles.label}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginVertical: 4,
  },
  btn: {
    width: STEP_BUTTON_SIZE,
    height: STEP_BUTTON_SIZE,
    borderRadius: RADIUS_MD,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: BRAND_BLUE,
  },
  label: {
    color: TEXT_PRIMARY,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});
