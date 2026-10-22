export type SectionId = 'maps' | 'quality' | 'agents' | 'demos' | 'internal';

export interface Project {
  /** Display name. */
  name: string;
  /** Live site. Every URL was checked for HTTP 200 on 2026-10-22. */
  url: string;
  /** One-line description, sentence case, no trailing period. */
  description: string;
  /** Public source repository, when there is one. */
  repo?: string;
}

export interface Section {
  id: SectionId;
  title: string;
  /** Short serif-italic gloss shown beside the title. */
  gloss: string;
  /** Internal tools: muted, compact, marked as sign-in required. */
  internal?: boolean;
  projects: Project[];
}

export const SECTIONS: Section[] = [
  {
    id: 'maps',
    title: 'Maps for Vue',
    gloss: 'MapLibre GL and Apple MapKit, as Vue 3 components',
    projects: [
      {
        name: 'v-maplibre',
        url: 'https://v-maplibre.geoql.in',
        description: 'Vue 3 components for MapLibre GL',
        repo: 'https://github.com/geoql/v-maplibre',
      },
      {
        name: 'mapcn-vue',
        url: 'https://mapcn-vue.geoql.in',
        description: 'Beautiful maps for Vue',
        repo: 'https://github.com/geoql/v-maplibre',
      },
      {
        name: 'v-mapkit',
        url: 'https://v-mapkit.geoql.in',
        description: 'Vue 3 components for Apple MapKit JS',
        repo: 'https://github.com/geoql/v-mapkit',
      },
      {
        name: 'mapkit-cn',
        url: 'https://mapkit-cn.geoql.in',
        description: 'Beautiful Apple Maps for Vue',
        repo: 'https://github.com/geoql/v-mapkit',
      },
    ],
  },
  {
    id: 'quality',
    title: 'UI and code quality',
    gloss: 'components to ship, and checks that catch what you missed',
    projects: [
      {
        name: 'nxui',
        url: 'https://nxui.geoql.in',
        description: 'Animated copy-paste UI components for Vue',
        repo: 'https://github.com/vinayakkulkarni/nxui',
      },
      {
        name: 'shadscan-vue',
        url: 'https://shadscan-vue.geoql.in',
        description: 'Find the UI fundamentals your shadcn-vue app forgot',
        repo: 'https://github.com/vinayakkulkarni/shadscan-vue',
      },
      {
        name: 'the-doctor.report',
        url: 'https://the-doctor.report',
        description: 'Audit Vue 3 and Nuxt 4 apps for bad code',
        repo: 'https://github.com/geoql/doctor',
      },
      {
        name: 'vue-nuxt-best-practices',
        url: 'https://vue-nuxt-best-practices.geoql.in',
        description: 'Vue and Nuxt skills for Claude Code',
        repo: 'https://github.com/vinayakkulkarni/vue-nuxt-best-practices',
      },
    ],
  },
  {
    id: 'agents',
    title: 'Agent tooling',
    gloss: 'memory that outlives the session',
    projects: [
      {
        name: 'mdr',
        url: 'https://mdr.geoql.in',
        description: 'Persistent layered memory for coding agents',
        repo: 'https://github.com/geoql/mdr',
      },
    ],
  },
  {
    id: 'demos',
    title: 'Demos',
    gloss: 'small apps built on the components above',
    projects: [
      {
        name: 'restaurants',
        url: 'https://restaurants.geoql.in',
        description: 'Find restaurants nearby',
        repo: 'https://github.com/geoql/restaurants',
      },
      {
        name: 'expenses',
        url: 'https://expenses.geoql.in',
        description: 'Map your expenses',
      },
    ],
  },
  {
    id: 'internal',
    title: 'Internal',
    gloss: 'self-hosted tools that run this estate',
    internal: true,
    projects: [
      {
        name: 'Plausible',
        url: 'https://analytics.geoql.in',
        description: 'Web analytics',
      },
      {
        name: 'OpenPanel',
        url: 'https://events.geoql.in',
        description: 'Product analytics',
      },
      {
        name: 'Canonry',
        url: 'https://aeo.geoql.in',
        description: 'Answer-engine visibility',
      },
      {
        name: 'Wakapi',
        url: 'https://wakapi.geoql.in',
        description: 'Coding time stats',
      },
      {
        name: 'Vaultwarden',
        url: 'https://vault.geoql.in',
        description: 'Password vault',
      },
    ],
  },
];

export const PUBLIC_SECTIONS = SECTIONS.filter((section) => !section.internal);

export const PUBLIC_PROJECTS = PUBLIC_SECTIONS.flatMap(
  (section) => section.projects,
);

export function hostOf(url: string): string {
  return new URL(url).host;
}
