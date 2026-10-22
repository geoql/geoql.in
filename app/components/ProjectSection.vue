<script setup lang="ts">
  import type { Section } from '~/data/projects';
  import { hostOf } from '~/data/projects';

  const props = defineProps<{
    section: Section;
    /** 1-based position, printed as the section number. */
    number: number;
    /** Primary sections get the large row treatment. */
    prominent?: boolean;
  }>();

  const label = computed(() => String(props.number).padStart(2, '0'));
</script>

<template>
  <section
    :id="props.section.id"
    :aria-labelledby="`${props.section.id}-title`"
    class="grid scroll-mt-20 gap-x-10 gap-y-8 border-t border-rule py-14 sm:py-20 lg:grid-cols-12"
  >
    <header class="lg:col-span-4">
      <div class="lg:sticky lg:top-24">
        <p class="font-mono text-xs tracking-wider text-accent-ink">
          {{ label }}
        </p>
        <h2
          :id="`${props.section.id}-title`"
          class="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ props.section.title }}
        </h2>
        <p class="mt-3 max-w-xs font-serif text-xl text-ink-2 italic">
          {{ props.section.gloss }}
        </p>
      </div>
    </header>

    <ol class="border-t border-rule lg:col-span-8 lg:border-t-0">
      <li
        v-for="(project, i) in props.section.projects"
        :key="project.url"
        class="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 border-b border-rule py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-x-6 lg:first:pt-0"
      >
        <span class="pt-2 font-mono text-xs text-ink-3 tabular-nums">
          {{ props.number }}.{{ i + 1 }}
        </span>

        <div class="min-w-0">
          <OutboundLink
            :href="project.url"
            :section="props.section.id"
            class="font-display font-semibold tracking-tight [overflow-wrap:anywhere] transition-colors after:absolute after:inset-0 group-hover:text-accent-ink focus-visible:outline-offset-4"
            :class="
              props.prominent
                ? 'text-[clamp(1.5rem,5.4vw,2.5rem)] leading-[1.05]'
                : 'text-[clamp(1.375rem,4.6vw,1.875rem)] leading-[1.1]'
            "
          >
            {{ project.name }}
          </OutboundLink>
          <p class="mt-2 text-base text-ink-2 sm:text-lg">
            {{ project.description }}
          </p>
          <p class="mt-2 font-mono text-xs text-ink-3">
            {{ hostOf(project.url) }}
          </p>
        </div>

        <div
          class="relative z-10 col-start-2 mt-4 flex items-center gap-5 sm:col-start-3 sm:mt-2 sm:self-start"
        >
          <OutboundLink
            v-if="project.repo"
            :href="project.repo"
            :section="props.section.id"
            :aria-label="`${project.name} source on GitHub`"
            class="font-mono text-xs text-ink-3 underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-3"
          >
            source
          </OutboundLink>
          <svg
            class="pointer-events-none hidden size-5 text-ink-3 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent sm:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </div>
      </li>
    </ol>
  </section>
</template>
