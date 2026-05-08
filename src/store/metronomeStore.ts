import { create } from 'zustand';
import { BPM_DEFAULT, BPM_MAX, BPM_MIN } from '../constants/bpm';
import { MetronomeState, SoundVariant, TimeSignature } from '../types';

export const useMetronomeStore = create<MetronomeState>((set) => ({
  bpm: BPM_DEFAULT,
  isPlaying: false,
  soundVariant: 'classic',
  timeSignature: 4,
  currentBeat: 0,

  setBpm: (bpm: number) =>
    set({ bpm: Math.min(BPM_MAX, Math.max(BPM_MIN, Math.round(bpm))) }),

  togglePlay: () =>
    set((s) => ({ isPlaying: !s.isPlaying, currentBeat: 0 })),

  stop: () => set({ isPlaying: false, currentBeat: 0 }),

  setSoundVariant: (soundVariant: SoundVariant) => set({ soundVariant }),

  setTimeSignature: (timeSignature: TimeSignature) =>
    set({ timeSignature, currentBeat: 0 }),

  setBeat: (currentBeat: number) => set({ currentBeat }),
}));
