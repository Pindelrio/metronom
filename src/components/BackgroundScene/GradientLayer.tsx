import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { GradientDef } from '../../constants/gradients';

interface Props {
  gradient: GradientDef;
  opacity: Animated.Value;
}

export function GradientLayer({ gradient, opacity }: Props) {
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
      <LinearGradient
        colors={gradient.colors as [string, string, ...string[]]}
        start={gradient.start}
        end={gradient.end}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}
