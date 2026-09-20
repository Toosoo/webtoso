---
name: new-lesson
description: Scaffold a new lesson or lab demo from templates/ into threejs/, gsap/ or lab/ and register it in src/content/. Use when the user asks to prepare, scaffold or start a new lesson or demo — e.g. "/new-lesson for gsap course called scrolltrigger", "prepare new lesson in threejs called Post processing", "new lab demo called Sticky cards".
---

# New lesson

Copy a starter from `templates/`, rename it, and add one manifest entry. Nothing
else is hand-listed — build entries, numbering, URLs, SEO and the sitemap all
derive from `src/content/`.

## Parse the request

- **section** — `threejs`, `gsap` or `lab`. Named in the sentence ("for gsap
  course", "in threejs", "lab demo"). If it isn't, ask.
- **name** — the quoted or trailing phrase. `title` is this in sentence case
  with library names kept as they're spelled (`ScrollTrigger`, `useGSAP()`,
  `three.js`). `slug` is kebab-case of it.

## Fill the entry

`tags` and `category` — guess from the name and say what you picked. Ask only
when the name gives you nothing, or when the user already stated them.

`category` must be an id that already exists in `src/i18n.js`, in both locales:

| section | allowed `category` |
| --- | --- |
| threejs | `foundations` · `textures-light` · `animations` |
| gsap | `core` · `scroll` · `plugins` · `react` |
| lab | `scroll` · `components` · `sites` |

Never invent one. A new category means editing `src/i18n.js` — stop and ask.

`tags` are free strings shown on the hub card. Match the spelling already used:
`three.js`, `gsap`, `ScrollTrigger`, `SplitText`, `lil-gui`, `react`.

## Steps

1. If `<section>/<slug>/` exists, stop and ask for a different name.
2. `cp -R templates/<section>/ <section>/<slug>/`
3. Set `<title>` in `index.html` to the lesson title. No number — `plugins/seo.js`
   rewrites the tag at build time, and the numbers in existing lessons are
   YouTube episode numbers, not manifest positions.
4. Append the entry to the end of the array in `src/content/<section>.js`:

   ```js
   {
       slug: "post-processing",
       title: "Post processing",
       tags: ["three.js"],
       category: "animations",
   },
   ```

   Array order is course order, so append — never insert.
5. Report the created paths and the URL. Stop there.

## Don't

- Don't add `youtubeUrl`. The page exists before the video does; the user pastes
  it later. `src/components/LessonCard.jsx` already handles its absence.
- Don't create `public/assets/<slug>/`. Only 13 of 48 lessons have one and git
  drops empty directories.
- Don't write comments in the copied files.
- Don't run `pnpm check` or the dev server unless asked.
- Don't touch any other lesson, or `src/i18n.js`.
