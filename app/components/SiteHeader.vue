<script setup lang="ts">
  import { SECTIONS } from '~/data/projects';
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md"
  >
    <div
      class="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
    >
      <a
        href="#top"
        class="font-display text-lg font-semibold tracking-tight"
        aria-label="GeoQL, back to top"
      >
        Geo<span class="font-serif font-normal text-accent italic">QL</span>
      </a>

      <nav aria-label="Sections" class="hidden lg:block">
        <ul
          class="flex items-center gap-7 font-mono text-xs whitespace-nowrap text-ink-2"
        >
          <li v-for="(section, i) in SECTIONS" :key="section.id">
            <a
              :href="`#${section.id}`"
              class="transition-colors hover:text-ink"
            >
              <span class="text-ink-3">{{
                String(i + 1).padStart(2, '0')
              }}</span>
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>

      <ThemeToggle />
    </div>
  </header>
</template>
