export type SoundVariant = 'classic' | 'wood' | 'digital';

export type TimeSignature = 2 | 3 | 4 | 6;

export type BpmZone = 'slow' | 'medium' | 'fast';

export interface MetronomeState {
  bpm: number;
  isPlaying: boolean;
  soundVariant: SoundVariant;
  timeSignature: TimeSignature;
  currentBeat: number;
  setBpm: (bpm: number) => void;
  togglePlay: () => void;
  setSoundVariant: (v: SoundVariant) => void;
  setTimeSignature: (ts: TimeSignature) => void;
  setBeat: (beat: number) => void;
  stop: () => void;
}
