<script setup lang="ts">
  import type { NuxtError } from '#app';

  const props = defineProps<{ error: NuxtError }>();

  useSeoMeta({
    title: `${props.error.statusCode} — GeoQL`,
    robots: 'noindex',
  });
</script>

<template>
  <main
    class="mx-auto flex min-h-dvh max-w-[90rem] flex-col justify-center px-5 sm:px-8 lg:px-12"
  >
    <p class="font-mono text-xs tracking-wider text-accent-ink">
      {{ props.error.statusCode }}
    </p>
    <h1
      class="mt-4 font-display text-[clamp(3rem,10vw,7rem)] leading-[0.9] font-semibold tracking-tight"
    >
      Off the map.
    </h1>
    <p class="mt-5 max-w-[44ch] text-lg text-ink-2">
      There is nothing at this address. Every GeoQL project is listed on the
      index.
    </p>
    <a
      href="/"
      class="mt-8 inline-flex h-12 w-fit items-center bg-ink px-6 font-medium text-paper transition-colors hover:bg-accent-ink"
    >
      Back to the index
    </a>
  </main>
</template>
