<script setup lang="ts">
  import type { Section } from '~/data/projects';
  import { hostOf } from '~/data/projects';

  const props = defineProps<{ section: Section }>();
</script>

<template>
  <section
    :id="props.section.id"
    :aria-labelledby="`${props.section.id}-title`"
    class="grid scroll-mt-20 gap-x-10 gap-y-6 border-t border-rule py-12 lg:grid-cols-12"
  >
    <header class="lg:col-span-4">
      <h2
        :id="`${props.section.id}-title`"
        class="font-mono text-xs tracking-wider text-ink-3 uppercase"
      >
        {{ props.section.title }}
      </h2>
      <p class="mt-2 max-w-xs text-sm text-ink-3">
        {{ props.section.gloss }}.
        <span
          class="mt-3 block w-fit border border-rule px-2 py-0.5 font-mono text-[0.6875rem] tracking-wide text-ink-3"
        >
          sign-in required
        </span>
      </p>
    </header>

    <ul
      class="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3"
      role="list"
    >
      <li
        v-for="project in props.section.projects"
        :key="project.url"
        class="border-b border-rule py-3"
      >
        <OutboundLink
          :href="project.url"
          :section="props.section.id"
          class="group block text-sm text-ink-2 transition-colors hover:text-ink"
        >
          <span class="font-medium">{{ project.name }}</span>
          <span class="text-ink-3"> · {{ project.description }}</span>
          <span class="mt-1 block font-mono text-xs text-ink-3">
            {{ hostOf(project.url) }}
          </span>
        </OutboundLink>
      </li>
    </ul>
  </section>
</template>
