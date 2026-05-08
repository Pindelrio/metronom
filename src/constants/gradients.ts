export type GradientDef = {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export const GRADIENT_BEACH: GradientDef = {
  colors: ['#0EA5E9', '#38BDF8', '#BAE6FD', '#FDE68A'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
};

export const GRADIENT_MOUNTAIN: GradientDef = {
  colors: ['#1E293B', '#334155', '#4ADE80', '#86EFAC'],
  start: { x: 0, y: 0 },
  end: { x: 0.3, y: 1 },
};

export const GRADIENT_CITY: GradientDef = {
  colors: ['#1E293B', '#475569', '#F59E0B', '#DC2626'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
};

export const GRADIENT_FIRE: GradientDef = {
  colors: ['#7F1D1D', '#DC2626', '#F97316', '#FDE047'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
};
