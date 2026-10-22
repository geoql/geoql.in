import tailwindcss from '@tailwindcss/vite';

// Cloudflare compatibility date — keep the two copies below in sync.
const COMPATIBILITY_DATE = '2026-10-22';

export default defineNuxtConfig({
  compatibilityDate: COMPATIBILITY_DATE,

  modules: ['@nuxtjs/color-mode', '@nuxt/scripts', '@openpanel/nuxt'],

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Cookie-backed so the server renders the right class on <html>; the
  // module's inline head script resolves "system" before first paint.
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'geoql-color-mode',
  },

  // Public IDs ship in the HTML; they are not secrets. Override per env with
  // NUXT_PUBLIC_GTAG_ID, NUXT_PUBLIC_PLAUSIBLE_SCRIPT_ID, etc.
  runtimeConfig: {
    buildDate: new Date().toISOString().slice(0, 10),
    public: {
      gtagId: 'G-CQJ84W064L',
      plausibleScriptId: 'PKiVMSEyfxLh_tiZFHm0r',
      plausibleApiHost: 'https://analytics.geoql.in',
    },
  },

  openpanel: {
    clientId: '041cbac5-f5b2-45f2-a242-45f77c6f8815',
    apiUrl: 'https://events.geoql.in/api',
    trackScreenViews: true,
    trackOutgoingLinks: true,
    trackAttributes: true,
    proxy: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          href: '/fonts/clash-display-600.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/satoshi-400.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
    },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
      // Merged into the generated .output/server/wrangler.json.
      wrangler: {
        name: 'geoql-in',
        compatibility_date: COMPATIBILITY_DATE,
        workers_dev: true,
        preview_urls: false,
        routes: [{ pattern: 'geoql.in', custom_domain: true }],
        observability: { enabled: true },
      },
    },
  },

  typescript: {
    strict: true,
  },
});
