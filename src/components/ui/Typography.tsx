import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { TEXT_PRIMARY, TEXT_SECONDARY } from '../../constants/colors';
import { FONT_SIZE_MD, FONT_SIZE_SM } from '../../constants/layout';

export function Label({ style, ...props }: TextProps) {
  return <Text style={[styles.label, style]} {...props} />;
}

export function SecondaryText({ style, ...props }: TextProps) {
  return <Text style={[styles.secondary, style]} {...props} />;
}

const styles = StyleSheet.create({
  label: {
    color: TEXT_PRIMARY,
    fontSize: FONT_SIZE_MD,
    fontWeight: '600',
  },
  secondary: {
    color: TEXT_SECONDARY,
    fontSize: FONT_SIZE_SM,
  },
});
