import { useCallback, useRef } from 'react';
import { BPM_MAX, BPM_MIN } from '../constants/bpm';
import { useMetronomeStore } from '../store/metronomeStore';

const MAX_TAPS = 8;
const TAP_RESET_MS = 2000;

export function useTapTempo() {
  const setBpm = useMetronomeStore((s) => s.setBpm);
  const tapsRef = useRef<number[]>([]);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tap = useCallback(() => {
    const now = Date.now();

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      tapsRef.current = [];
    }, TAP_RESET_MS);

    tapsRef.current.push(now);
    if (tapsRef.current.length > MAX_TAPS) {
      tapsRef.current = tapsRef.current.slice(-MAX_TAPS);
    }

    const taps = tapsRef.current;
    if (taps.length < 2) return;

    let totalInterval = 0;
    for (let i = 1; i < taps.length; i++) {
      totalInterval += taps[i] - taps[i - 1];
    }
    const avgInterval = totalInterval / (taps.length - 1);
    const bpm = Math.round(60000 / avgInterval);

    if (bpm >= BPM_MIN && bpm <= BPM_MAX) {
      setBpm(bpm);
    }
  }, [setBpm]);

  return { tap };
}
