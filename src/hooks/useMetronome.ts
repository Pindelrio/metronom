import { useEffect, useRef } from 'react';
import { Animated, AppState } from 'react-native';
import { MetronomeScheduler } from '../engine/scheduler';
import { useMetronomeStore } from '../store/metronomeStore';
import { SoundBank } from './useSoundLoader';

export function useMetronome(soundBankRef: React.RefObject<SoundBank | null>) {
  const { bpm, isPlaying, timeSignature } = useMetronomeStore();
  const schedulerRef = useRef(new MetronomeScheduler());
  const beatFlash = useRef(new Animated.Value(0)).current;
  const accentFlash = useRef(new Animated.Value(0)).current;

  const handleBeatRef = useRef((beatIndex: number) => {
    const { soundVariant } = useMetronomeStore.getState();
    const bank = soundBankRef.current;
    if (bank) {
      const player = beatIndex === 0 ? bank[soundVariant].accent : bank[soundVariant].beat;
      player.seekTo(0).then(() => player.play()).catch(() => {});
    }
    useMetronomeStore.getState().setBeat(beatIndex);

    if (beatIndex === 0) {
      accentFlash.setValue(1);
      Animated.timing(accentFlash, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      beatFlash.setValue(1);
      Animated.timing(beatFlash, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  });

  useEffect(() => {
    const scheduler = schedulerRef.current;
    if (isPlaying) {
      scheduler.start(bpm, timeSignature, (idx) => handleBeatRef.current(idx));
    } else {
      scheduler.stop();
    }
    return () => scheduler.stop();
  }, [isPlaying]);

  // JS timers are throttled or suspended while the app is in background, so
  // pause the scheduler there and restart it cleanly when the app comes back.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      const scheduler = schedulerRef.current;
      const { isPlaying: playing, bpm: currentBpm, timeSignature: currentTs } =
        useMetronomeStore.getState();
      if (state === 'active') {
        if (playing && !scheduler.isRunning()) {
          scheduler.start(currentBpm, currentTs, (idx) => handleBeatRef.current(idx));
        }
      } else {
        scheduler.stop();
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (isPlaying) schedulerRef.current.setBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    if (isPlaying) schedulerRef.current.setBeatsPerMeasure(timeSignature);
  }, [timeSignature]);

  return { beatFlash, accentFlash };
}
