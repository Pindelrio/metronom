export const BPM_MIN = 20;
export const BPM_MAX = 220;
export const BPM_DEFAULT = 100;
export const BPM_STEP = 1;

export const BPM_ZONE_SLOW_MAX = 79;
export const BPM_ZONE_MED_MAX = 139;

export type BpmZone = 'slow' | 'medium' | 'fast';

export function getBpmZone(bpm: number): BpmZone {
  if (bpm <= BPM_ZONE_SLOW_MAX) return 'slow';
  if (bpm <= BPM_ZONE_MED_MAX) return 'medium';
  return 'fast';
}

export const ZONE_INDEX: Record<BpmZone, number> = {
  slow: 0,
  medium: 1,
  fast: 2,
};
