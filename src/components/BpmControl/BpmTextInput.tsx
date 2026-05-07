import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { BRAND_BLUE, GLASS_BORDER, TEXT_PRIMARY } from '../../constants/colors';
import { BPM_MAX, BPM_MIN } from '../../constants/bpm';
import { FONT_SIZE_BPM, RADIUS_MD } from '../../constants/layout';
import { useMetronomeStore } from '../../store/metronomeStore';

export function BpmTextInput() {
  const bpm = useMetronomeStore((s) => s.bpm);
  const setBpm = useMetronomeStore((s) => s.setBpm);
  const [text, setText] = useState(String(bpm));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setText(String(bpm));
  }, [bpm, focused]);

  const commit = () => {
    const val = parseInt(text, 10);
    if (!isNaN(val)) {
      setBpm(val);
    } else {
      setText(String(bpm));
    }
    setFocused(false);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onFocus={() => setFocused(true)}
        onBlur={commit}
        onSubmitEditing={commit}
        keyboardType="number-pad"
        maxLength={3}
        selectTextOnFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 4,
  },
  input: {
    color: TEXT_PRIMARY,
    fontSize: FONT_SIZE_BPM,
    fontWeight: '700',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: BRAND_BLUE,
    paddingHorizontal: 16,
    minWidth: 140,
  },
});
