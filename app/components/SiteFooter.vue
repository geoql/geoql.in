<script setup lang="ts">
  import { SITE } from '~/data/site';
</script>

<template>
  <footer class="border-t border-ink py-12 sm:py-16">
    <div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <p
          class="font-display text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Geo<span class="font-serif font-normal text-accent italic">QL</span>
        </p>
        <p class="mt-3 font-serif text-xl text-ink-2 italic">
          {{ SITE.tagline }}
        </p>
      </div>
      <ul class="grid gap-4 text-base lg:col-span-5" role="list">
        <li>
          <OutboundLink
            :href="SITE.github"
            section="footer"
            class="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule pb-3 transition-colors hover:text-accent-ink"
          >
            <span>GitHub organisation</span>
            <span class="font-mono text-xs text-ink-3">github.com/geoql</span>
          </OutboundLink>
        </li>
        <li>
          <OutboundLink
            :href="SITE.maintainer.url"
            section="footer"
            class="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule pb-3 transition-colors hover:text-accent-ink"
          >
            <span>Maintained by {{ SITE.maintainer.name }}</span>
            <span class="font-mono text-xs text-ink-3"
              >vinayakkulkarni.dev</span
            >
          </OutboundLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
