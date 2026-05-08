import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BACKGROUND_DARK } from '../constants/colors';
import { SPACING_LG, SPACING_MD } from '../constants/layout';
import { useMetronomeStore } from '../store/metronomeStore';
import { useBackgroundZone } from '../hooks/useBackgroundZone';
import { useSoundLoader } from '../hooks/useSoundLoader';
import { useMetronome } from '../hooks/useMetronome';
import { BackgroundScene } from '../components/BackgroundScene';
import { BeatIndicator } from '../components/BeatIndicator';
import { BpmControl } from '../components/BpmControl';
import { GlassCard } from '../components/ui/GlassCard';
import { PlayButton } from '../components/PlayButton';
import { SoundPicker } from '../components/SoundPicker';
import { TimeSignaturePicker } from '../components/TimeSignaturePicker';

export function MetronomeScreen() {
  const bpm = useMetronomeStore((s) => s.bpm);
  const { beach, mountain, city, fire } = useBackgroundZone(bpm);
  const { soundBankRef } = useSoundLoader();
  const { beatFlash, accentFlash } = useMetronome(soundBankRef);

  return (
    <View style={styles.root}>
      <BackgroundScene beach={beach} mountain={mountain} city={city} fire={fire} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.indicatorWrapper}>
              <BeatIndicator beatFlash={beatFlash} accentFlash={accentFlash} />
            </View>

            <GlassCard style={styles.card}>
              <BpmControl />
              <View style={styles.divider} />
              <TimeSignaturePicker />
              <View style={styles.divider} />
              <SoundPicker />
              <PlayButton />
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: SPACING_LG,
    paddingBottom: SPACING_LG,
  },
  indicatorWrapper: {
    alignItems: 'center',
    marginBottom: SPACING_LG,
  },
  card: {
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: SPACING_MD,
  },
});
