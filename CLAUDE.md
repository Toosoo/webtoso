# webtoso

Bilingual (`/ar` + `/en`) static course platform — three.js and GSAP lessons plus
a lab of demos. Vite multi-page build, deployed to Vercel from `main`.

**pnpm only** — no `package-lock.json`, `packageManager` is pinned.

```
pnpm dev | build | preview | lint | format
```

## Architecture

`src/content/index.js` is the spine — build entries, numbering, URLs, SEO,
sitemap and chrome-bar links all derive from it. Adding a lesson = one manifest
entry + a folder. Nothing is listed by hand.

44 items → `(1 home + 3 indexes) × 2 locales + 44 items` = **52 pages**.
Hub pages are per-locale; lessons are built once, at `/<section>/<slug>/`.

Build: `vite.config.js` generates the `ar/` + `en/` trees → `plugins/seo.js`
injects meta and emits sitemap/robots → `plugins/prerender.js` renders the 8 hub
pages into `<div id="root">` → `src/main.jsx` hydrates.

The 8 hub pages hold all the site's prose. The 44 lesson pages have none, by
design.

## Never

- Edit `ar/` or `en/` — generated, gitignored.
- Reformat `threejs/`, `gsap/`, `lab/` — published teaching material matching
  videos, including the comments and commented-out code. Biome excludes them.
- Use `npm`.

## Traps

Each of these produced a **green build and a broken site**.

- **CSS base resets must be in `@layer base`.** Unlayered CSS beats Tailwind's
  layered utilities regardless of specificity — an unlayered `min-height: 100vh`
  silently killed scrolling on six lessons.
- **`hubData.js` reads `location` at module scope**, so `prerender.js` must call
  `moduleGraph.invalidateAll()` between pages, or all 8 render in one locale.
- **`pnpm lint` passing ≠ build passing.** A dangling `/**` once swallowed an
  `export`: valid syntax, clean lint, failed build. Always run `pnpm build`.
- **`dist/assets/` mixes two things** — flat files are hashed build output,
  subdirectories are unhashed copies of `public/assets/`. `vercel.json` caches
  them differently by path depth.
- **Vercel `:path*` matches zero segments** (use `:path+` for "at least one")
  **and never matches a bare trailing slash** — `/x/` needs its own rule.
- **`gsap/react` and `gsap/use-gsap` load no stylesheet.** Anything on every
  lesson must be self-contained — hence `lessonChrome.js` and `public/404.html`
  hand-copy their colours from `hub.css`, with nothing syncing them.

## Verify a change

```bash
pnpm lint && pnpm build
find dist -name index.html | wc -l     # 52
grep -c '<loc>' dist/sitemap.xml       # 52

# every hub page must have real text — 0 means prerender silently broke
for loc in ar en; do for p in "" threejs/ gsap/ lab/; do
  printf "%s%s " "$loc" "$p"
  sed -n '/<body/,/<\/body>/p' "dist/$loc/${p}index.html" |
    sed 's/<[^>]*>/ /g' | tr -s ' \n' ' ' | wc -w   # expect 100-260
done; done
```

Then `pnpm preview` and in the browser: console clean (hydration errors appear
only here), click a filter chip to confirm React attached, check **both**
locales (`/ar/` is RTL), and for lesson work check one scroll-driven
(`lab/image-sequence`) and one canvas (`threejs/lights`) lesson.

`vercel.json` changes cannot be tested locally — verify with `curl -sI` against
the deployed site.

## Conventions

- **Comments: almost none.** Only a constraint that would otherwise be silently
  broken, in one or two lines. Never narrate a change — that goes in the commit.
- Arabic: MSA for headings/meta, Egyptian in body prose; code and lesson names
  stay English. All strings in `src/i18n.js` (imported by build *and* browser —
  no Node APIs).
- Slugs carry no numbers; order lives in the manifest.
- Work on `features`, PR into `main`. Never force-push.

## Context

`PLAN.md` (local, gitignored) holds the numbered decisions, open questions and
remaining work. Read it before assuming something is an oversight — most of the
surprising choices are deliberate and recorded there.

Building the code viewer? Lesson source has three shapes: `main.js` (36),
inline `<script>` in `index.html` (7, all `gsap/`), and a `src/` folder (2).
