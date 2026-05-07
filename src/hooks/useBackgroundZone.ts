import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { getBpmZone } from '../constants/bpm';

const TRANSITION_MS = 800;
const SLOW_CYCLE_MS = 15000;

export function useBackgroundZone(bpm: number) {
  const beach = useRef(new Animated.Value(1)).current;
  const mountain = useRef(new Animated.Value(0)).current;
  const city = useRef(new Animated.Value(0)).current;
  const fire = useRef(new Animated.Value(0)).current;
  const slowCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slowLayerRef = useRef<'beach' | 'mountain'>('beach');

  const fadeTo = (target: Record<string, number>) => {
    Animated.parallel(
      Object.entries(target).map(([key, val]) => {
        const anim = { beach, mountain, city, fire }[key]!;
        return Animated.timing(anim, {
          toValue: val,
          duration: TRANSITION_MS,
          useNativeDriver: true,
        });
      })
    ).start();
  };

  useEffect(() => {
    const zone = getBpmZone(bpm);

    if (zone === 'slow') {
      fadeTo({
        beach: slowLayerRef.current === 'beach' ? 1 : 0,
        mountain: slowLayerRef.current === 'mountain' ? 1 : 0,
        city: 0,
        fire: 0,
      });
      if (!slowCycleRef.current) {
        slowCycleRef.current = setInterval(() => {
          const next = slowLayerRef.current === 'beach' ? 'mountain' : 'beach';
          slowLayerRef.current = next;
          fadeTo({
            beach: next === 'beach' ? 1 : 0,
            mountain: next === 'mountain' ? 1 : 0,
            city: 0,
            fire: 0,
          });
        }, SLOW_CYCLE_MS);
      }
    } else {
      if (slowCycleRef.current) {
        clearInterval(slowCycleRef.current);
        slowCycleRef.current = null;
      }
      if (zone === 'medium') fadeTo({ beach: 0, mountain: 0, city: 1, fire: 0 });
      else fadeTo({ beach: 0, mountain: 0, city: 0, fire: 1 });
    }
  }, [bpm]);

  useEffect(() => {
    return () => {
      if (slowCycleRef.current) clearInterval(slowCycleRef.current);
    };
  }, []);

  return { beach, mountain, city, fire };
}
