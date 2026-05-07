import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useEffect, useRef, useState } from 'react';
import { SoundVariant } from '../types';

const SOURCES = {
  classic: {
    accent: require('../../assets/sounds/classic/accent.wav') as number,
    beat: require('../../assets/sounds/classic/beat.wav') as number,
  },
  wood: {
    accent: require('../../assets/sounds/wood/accent.wav') as number,
    beat: require('../../assets/sounds/wood/beat.wav') as number,
  },
  digital: {
    accent: require('../../assets/sounds/digital/accent.wav') as number,
    beat: require('../../assets/sounds/digital/beat.wav') as number,
  },
} as const;

export type SoundEntry = { accent: AudioPlayer; beat: AudioPlayer };
export type SoundBank = Record<SoundVariant, SoundEntry>;

export function useSoundLoader() {
  const soundBankRef = useRef<SoundBank | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const players: AudioPlayer[] = [];

    async function load() {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });

      const variants: SoundVariant[] = ['classic', 'wood', 'digital'];
      const bank: Partial<SoundBank> = {};

      for (const v of variants) {
        const accent = createAudioPlayer(SOURCES[v].accent);
        const beat = createAudioPlayer(SOURCES[v].beat);
        players.push(accent, beat);
        bank[v] = { accent, beat };
      }

      if (mounted) {
        soundBankRef.current = bank as SoundBank;
        setReady(true);
      }
    }

    load().catch(console.warn);

    return () => {
      mounted = false;
      players.forEach((p) => p.remove());
    };
  }, []);

  return { soundBankRef, ready };
}
