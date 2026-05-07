import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SPACING_SM } from '../../constants/layout';
import { BpmSlider } from './BpmSlider';
import { BpmStepButtons } from './BpmStepButtons';
import { BpmTextInput } from './BpmTextInput';
import { TapTempoButton } from './TapTempoButton';

export function BpmControl() {
  return (
    <View style={styles.container}>
      <BpmTextInput />
      <BpmSlider />
      <View style={styles.row}>
        <BpmStepButtons />
      </View>
      <View style={styles.tapRow}>
        <TapTempoButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING_SM,
  },
  row: {
    alignItems: 'center',
  },
  tapRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
