# AGENTS.md

## Project overview

DevFest Nantes 2027 conference website. **Astro 6** static site with React islands, built to `out/` and deployed to **Google App Engine** via GitHub Actions.

Despite the README saying Next.js (stale boilerplate), this is an **Astro** project. Trust `package.json` and `astro.config.mjs`.

## Commands

```bash
npm ci              # install (use ci, not install -- CI does this)
npm run dev         # astro dev server
npm run build       # astro build + postbuild redirect generator
npm run preview     # serve built site locally
npm run lint        # eslint (prettier-only rules)
```

There are **no tests**. No test framework is configured.

## Build pipeline

1. `astro build` outputs static HTML to `out/`
2. `postbuild` runs `generate-redirects.js` -- creates redirect HTML pages so locale-less URLs (e.g. `/team`) redirect to the default locale (`/fr/team`) via `<meta http-equiv="refresh">`
3. CI copies `.appengine/app.yaml` into `out/` and deploys as an App Engine static site

## i18n -- critical to get right

- **Two locales**: `fr` (default), `en`
- Astro's built-in i18n with `prefixDefaultLocale: true` -- both `/fr/` and `/en/` URLs are prefixed
- Root `/` redirects to `/fr` via `src/pages/index.astro`
- Pages are **duplicated per locale**: `src/pages/fr/` and `src/pages/en/` are separate directories with parallel structure. There is no dynamic `[locale]` routing.
- Translation strings live in `src/locales/{fr,en}/translation.json`, loaded via i18next (`src/i18n/i18n.ts`)
- When adding a page, you must create it in **both** `src/pages/fr/` and `src/pages/en/`

## Key directories

| Path                           | What                                                                                                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/{fr,en}/`           | Astro page files (one per locale)                                                                                                                                    |
| `src/components/astro/`        | Astro components (Navbar, Footer)                                                                                                                                    |
| `src/components/react/`        | React islands (`client:load` / `client:only`)                                                                                                                        |
| `src/layouts/BaseLayout.astro` | Single shared layout -- takes `locale` prop                                                                                                                          |
| `src/locales/{fr,en}/`         | i18next translation JSON                                                                                                                                             |
| `src/i18n/`                    | i18next setup; `getTranslation(locale)` is the main API                                                                                                              |
| `src/layout/`                  | SCSS partials for navbar/footer + `globals.scss`                                                                                                                     |
| `src/styles/`                  | Page-level SCSS (`home.scss`, `jumbo.scss`)                                                                                                                          |
| `data/`                        | Conference data: sessions (YAML), speakers (YAML), partners/categories/slots (JSON), blog (MDX)                                                                      |
| `scripts/`                     | Standalone Node tools (separate `package.json`). `data-transformer.ts` imports from a planning export and generates `data/speakers/` and `data/sessions/` YAML files |
| `infra/terraform/`             | GCP App Engine + GitHub OIDC infra                                                                                                                                   |
| `.appengine/app.yaml`          | App Engine static serving config                                                                                                                                     |

## Style / conventions

- **Prettier**: single quotes, trailing commas (es5), semi, 2-space indent, JSX single quotes
- **SCSS**: uses `sass` with `modern-compiler` API (configured in `astro.config.mjs` vite section)
- **Path alias**: `@/*` maps to `./src/*` (tsconfig paths)
- **MUI + Emotion**: Material UI v7 with Emotion for React components
- **Fonts**: Roboto (body) + Bebas Neue (headings), loaded via `@fontsource`
- **CSS variables** defined in `BaseLayout.astro`: `--primary`, `--secondary`, `--tertiary`, `--md-breakpoint`

## Data files

- Sessions: `data/sessions/*.yml` -- each file is one talk with `key`, `title`, `speakers` (list of speaker keys), `slot`, `room`, `tags`, `abstract`
- Speakers: `data/speakers/*.yml` -- `key`, `name`, `company`, `photoUrl`, `socials`, `bio`
- These YAML files are **generated** by `scripts/data-transformer.ts` from an export file. Edit the source export or the transformer, not the YAML directly (unless making quick fixes).

## tsconfig exclusions

Files matching `**/*.off.tsx` and `**/*.off.astro` are excluded from TypeScript compilation. This is the convention for temporarily disabling files.

## Deployment

- Every push triggers deploy via `.github/workflows/deploy.yml`
- Tagged pushes (`v*`) promote to production; other pushes deploy as `vdev` (non-promoted)
- GCP project: `devfest2027`, auth via Workload Identity Federation
- Pushes to `main` also trigger `update-graphql.yml` (POST to confetti-app)

## Agent workflow preferences

- **Prefer Bash tool** for running commands (build, lint, dev server, git, npm, etc.) rather than other tool alternatives. The shell is PowerShell on Windows.
- **MCP servers** available via `opencode.json`:
  - **Context7** -- query up-to-date library/framework documentation and code examples. Use it to look up Astro, React, MUI, i18next APIs instead of guessing.
  - **Chrome DevTools** -- interact with the browser: take snapshots/screenshots, inspect the DOM, run Lighthouse audits, trace performance, click/fill elements. Use it to visually verify changes or debug rendering issues.

## Gotchas

- The `out/` directory is gitignored but is the Astro build output (configured via `outDir` in `astro.config.mjs`), not Next.js output
- React components using browser-only APIs (like Leaflet) must use `client:only="react"` instead of `client:load`
- `scripts/` has its own `package.json` and `tsconfig.json` -- it is a separate tool, not part of the main Astro build
