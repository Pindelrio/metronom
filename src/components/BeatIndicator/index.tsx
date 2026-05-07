import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  BEAT_COLOR_ACCENT,
  BEAT_COLOR_NORMAL,
} from '../../constants/colors';
import { BEAT_INDICATOR_SIZE } from '../../constants/layout';

interface Props {
  beatFlash: Animated.Value;
  accentFlash: Animated.Value;
}

export function BeatIndicator({ beatFlash, accentFlash }: Props) {
  const normalOpacity = beatFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 1],
  });
  const normalScale = beatFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.1],
  });

  const accentOpacity = accentFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const accentScale = accentFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.15],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { backgroundColor: BEAT_COLOR_NORMAL },
          { opacity: normalOpacity, transform: [{ scale: normalScale }] },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          styles.accentCircle,
          { backgroundColor: BEAT_COLOR_ACCENT },
          { opacity: accentOpacity, transform: [{ scale: accentScale }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BEAT_INDICATOR_SIZE,
    height: BEAT_INDICATOR_SIZE,
    alignSelf: 'center',
    marginBottom: 16,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BEAT_INDICATOR_SIZE / 2,
  },
  accentCircle: {
    position: 'absolute',
  },
});
