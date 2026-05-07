import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { GLASS_BORDER, BACKGROUND_DARK } from '../../constants/colors';
import { RADIUS_LG, SPACING_LG } from '../../constants/layout';

interface Props extends ViewProps {
  children: React.ReactNode;
}

export function GlassCard({ children, style, ...props }: Props) {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.border} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS_LG,
    overflow: 'hidden',
    backgroundColor: 'rgba(15,23,42,0.5)',
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS_LG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
  },
  content: {
    padding: SPACING_LG,
  },
});
