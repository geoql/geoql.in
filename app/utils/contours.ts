export interface Contour {
  d: string;
  /** Every fourth line is an index contour, drawn heavier. */
  index: boolean;
}

export interface ContourOptions {
  cx: number;
  cy: number;
  count: number;
  /** Radius of the innermost line. */
  r0: number;
  /** Radius step between neighbouring lines. */
  step: number;
  /** Points sampled per line. */
  samples?: number;
}

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * Deterministic topographic contour lines around one summit. Each line is a
 * closed curve whose radius wobbles with a few low-frequency harmonics; the
 * wobble grows outward so the terrain looks eroded, not concentric. Output is
 * plain SVG path data, rendered at build/SSR time — no runtime randomness.
 */
export function contourLines(options: ContourOptions): Contour[] {
  const { cx, cy, count, r0, step, samples = 64 } = options;
  const harmonics = [
    { k: 2, amp: 0.09, phase: 0.6 },
    { k: 3, amp: 0.06, phase: 2.1 },
    { k: 5, amp: 0.025, phase: 4.0 },
  ];

  return Array.from({ length: count }, (_, line) => {
    const base = r0 + line * step;
    const spread = 0.6 + line / count;
    const points = Array.from({ length: samples }, (_, i) => {
      const t = (i / samples) * Math.PI * 2;
      const wobble = harmonics.reduce(
        (sum, h) =>
          sum + h.amp * spread * Math.sin(h.k * t + h.phase + line * 0.17),
        0,
      );
      const r = base * (1 + wobble);
      return [cx + r * Math.cos(t), cy + r * 0.82 * Math.sin(t)] as const;
    });
    return { d: smoothClosedPath(points), index: line % 4 === 3 };
  });
}

/** Catmull-Rom spline through closed points, emitted as cubic Béziers. */
function smoothClosedPath(points: ReadonlyArray<readonly [number, number]>) {
  const n = points.length;
  const at = (i: number) => points[((i % n) + n) % n]!;
  const [x0, y0] = at(0);
  let d = `M${round(x0)} ${round(y0)}`;
  for (let i = 0; i < n; i++) {
    const [ax, ay] = at(i - 1);
    const [bx, by] = at(i);
    const [cx, cy] = at(i + 1);
    const [dx, dy] = at(i + 2);
    const c1x = bx + (cx - ax) / 6;
    const c1y = by + (cy - ay) / 6;
    const c2x = cx - (dx - bx) / 6;
    const c2y = cy - (dy - by) / 6;
    d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(cx)} ${round(cy)}`;
  }
  return `${d}Z`;
}
