<script setup lang="ts">
  import { contourLines } from '~/utils/contours';

  const SUMMIT = { x: 640, y: 380 };
  const ACCENT_LINE = 7;

  const lines = contourLines({
    cx: SUMMIT.x,
    cy: SUMMIT.y,
    count: 24,
    r0: 26,
    step: 34,
  });
</script>

<template>
  <svg
    class="pointer-events-none absolute inset-0 h-full w-full"
    viewBox="0 0 1000 1000"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(line, i) in lines"
      :key="i"
      :d="line.d"
      fill="none"
      vector-effect="non-scaling-stroke"
      :stroke="i === ACCENT_LINE ? 'var(--accent)' : 'var(--contour)'"
      :stroke-width="i === ACCENT_LINE ? 1.5 : line.index ? 1.25 : 0.75"
    />
    <g :transform="`translate(${SUMMIT.x} ${SUMMIT.y})`">
      <path d="M0 -9 L8 6 L-8 6 Z" fill="var(--accent)" />
      <circle r="1.6" cy="1" fill="var(--paper)" />
    </g>
  </svg>
</template>
