# geoql.in

**[Live site](https://geoql.in?utm_source=github&utm_medium=readme&utm_campaign=geoql.in)**

The one-page index of every GeoQL project and demo: [geoql.in](https://geoql.in).

GeoQL — open-source maps and code-quality tools for Vue and Nuxt.

## Stack

- Nuxt 4 on Cloudflare Workers (`cloudflare_module` preset, Worker `geoql-in`)
- Tailwind CSS v4 with OKLCH tokens in `app/assets/css/main.css`
- `@nuxtjs/color-mode` (cookie-backed) for the theme — never VueUse `useDark`
- Analytics: GA4, Plausible and OpenPanel
- oxlint, oxfmt, vue-tsc, vite-plus (`vp test`)

## Edit the index

All links live in one typed array: [`app/data/projects.ts`](app/data/projects.ts).
The page, JSON-LD, and `/llms.txt` render from it.

## Scripts

| Command             | What it does                               |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Nuxt dev server                            |
| `pnpm lint`         | oxlint                                     |
| `pnpm format:check` | oxfmt check                                |
| `pnpm typecheck`    | vue-tsc via `nuxt typecheck`               |
| `pnpm test`         | unit tests (`vp test run`)                 |
| `pnpm build`        | production build to `.output/`             |
| `pnpm preview`      | build, then `wrangler dev` the real Worker |
| `pnpm deploy`       | build, then `wrangler deploy`              |

Node `>=26.12.1` and pnpm 12 (from `packageManager`).

## More from the author

- [v-maplibre](https://v-maplibre.geoql.in?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) — Vue 3 MapLibre GL components
- [mapcn-vue](https://mapcn-vue.geoql.in?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) — shadcn-vue map components (MapLibre)
- [nxui](https://nxui.geoql.in?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) — Vue port of Paper Shaders + animated components (shadcn-vue registry)
- [the-doctor.report](https://the-doctor.report?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) — Vue/Nuxt code health auditor
- [tileserver.app](https://tileserver.app?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) — Rust tile server
- [mdr](https://mdr.geoql.in?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) — persistent memory for AI coding agents

See every project at [vinayakkulkarni.dev/projects](https://vinayakkulkarni.dev/projects?utm_source=github&utm_medium=readme&utm_campaign=geoql.in) and [geoql.in](https://geoql.in?utm_source=github&utm_medium=readme&utm_campaign=geoql.in).

## License

MIT © [Vinayak Kulkarni](https://vinayakkulkarni.dev)
