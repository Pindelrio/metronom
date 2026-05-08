import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BRAND_BLUE, TEXT_SECONDARY } from '../../constants/colors';
import { BPM_MAX, BPM_MIN } from '../../constants/bpm';
import { useMetronomeStore } from '../../store/metronomeStore';

export function BpmSlider() {
  const bpm = useMetronomeStore((s) => s.bpm);
  const setBpm = useMetronomeStore((s) => s.setBpm);

  return (
    <View style={styles.wrapper}>
      <Slider
        style={styles.slider}
        minimumValue={BPM_MIN}
        maximumValue={BPM_MAX}
        step={1}
        value={bpm}
        onValueChange={setBpm}
        minimumTrackTintColor={BRAND_BLUE}
        maximumTrackTintColor="rgba(255,255,255,0.2)"
        thumbTintColor={BRAND_BLUE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
