import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  GRADIENT_BEACH,
  GRADIENT_CITY,
  GRADIENT_FIRE,
  GRADIENT_MOUNTAIN,
} from '../../constants/gradients';
import { GradientLayer } from './GradientLayer';

interface Props {
  beach: Animated.Value;
  mountain: Animated.Value;
  city: Animated.Value;
  fire: Animated.Value;
}

export function BackgroundScene({ beach, mountain, city, fire }: Props) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <GradientLayer gradient={GRADIENT_BEACH} opacity={beach} />
      <GradientLayer gradient={GRADIENT_MOUNTAIN} opacity={mountain} />
      <GradientLayer gradient={GRADIENT_CITY} opacity={city} />
      <GradientLayer gradient={GRADIENT_FIRE} opacity={fire} />
    </View>
  );
}
