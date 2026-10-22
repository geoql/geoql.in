<script setup lang="ts">
  import { PUBLIC_PROJECTS, PUBLIC_SECTIONS } from '~/data/projects';
  import { SITE } from '~/data/site';
</script>

<template>
  <section
    aria-labelledby="hero-title"
    class="relative isolate overflow-hidden"
  >
    <div
      class="absolute inset-y-0 -right-1/2 -z-10 w-[170%] sm:-right-[15%] sm:w-[95%] lg:-right-[4%] lg:w-[64%]"
    >
      <ContourField />
    </div>

    <div
      class="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[90rem] flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12"
    >
      <p class="font-mono text-xs tracking-wider text-ink-3">
        geoql.in — an index of everything we ship
      </p>

      <h1
        id="hero-title"
        class="mt-5 font-display text-[clamp(5.5rem,21vw,17rem)] leading-[0.82] font-semibold tracking-[-0.045em]"
      >
        Geo<span
          class="font-serif font-normal tracking-[-0.02em] text-accent italic"
          >QL</span
        >
      </h1>

      <div class="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p
            class="max-w-[25ch] font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.1] font-medium tracking-tight"
          >
            Open-source maps and code&#8209;quality tools for Vue and Nuxt.
          </p>
          <p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-2">
            MapLibre GL and Apple MapKit components, animated UI, audits that
            catch bad Vue and Nuxt code, and memory for coding agents.
          </p>
        </div>

        <div class="flex flex-col gap-5 lg:col-span-5 lg:items-end">
          <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#maps"
              class="inline-flex h-12 items-center gap-3 bg-ink px-6 text-base font-medium text-paper transition-colors hover:bg-accent-ink"
            >
              Browse the index
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                aria-hidden="true"
              >
                <path d="M12 4v15M6 13l6 6 6-6" />
              </svg>
            </a>
            <OutboundLink
              :href="SITE.github"
              section="hero"
              class="font-mono text-sm text-ink-2 underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-3"
            >
              github.com/geoql
            </OutboundLink>
          </div>
          <p class="font-mono text-xs text-ink-3 tabular-nums">
            {{ PUBLIC_PROJECTS.length }} public projects ·
            {{ PUBLIC_SECTIONS.length }} sections · {{ SITE.tagline }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
