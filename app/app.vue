<script setup lang="ts">
  import { PUBLIC_SECTIONS, SECTIONS } from '~/data/projects';
  import { SITE } from '~/data/site';
  import { structuredData } from '~/utils/structured-data';

  const PROMINENT = new Set(['maps', 'quality']);
  const internal = SECTIONS.filter((section) => section.internal);

  useSeoMeta({
    title: SITE.title,
    description: SITE.description,
    ogType: 'website',
    ogSiteName: SITE.name,
    ogUrl: `${SITE.url}/`,
    ogTitle: SITE.title,
    ogDescription: SITE.description,
    ogImage: SITE.ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt:
      'GeoQL — open-source maps and code-quality tools for Vue and Nuxt',
    twitterCard: 'summary_large_image',
    twitterTitle: SITE.title,
    twitterDescription: SITE.description,
    twitterImage: SITE.ogImage,
  });

  useHead({
    link: [{ rel: 'canonical', href: `${SITE.url}/` }],
    meta: [
      {
        name: 'theme-color',
        content: '#f8f6f1',
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: '#14161c',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData()),
      },
    ],
  });
</script>

<template>
  <div id="top">
    <a
      href="#maps"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Skip to the index
    </a>
    <SiteHeader />
    <main>
      <SiteHero />
      <div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <ProjectSection
          v-for="(section, i) in PUBLIC_SECTIONS"
          :key="section.id"
          :section="section"
          :number="i + 1"
          :prominent="PROMINENT.has(section.id)"
        />
        <InternalSection
          v-for="section in internal"
          :key="section.id"
          :section="section"
        />
      </div>
    </main>
    <div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
      <SiteFooter />
    </div>
  </div>
</template>
