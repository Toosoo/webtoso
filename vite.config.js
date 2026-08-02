import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { prerender } from "./plugins/prerender.js";
import { seo } from "./plugins/seo.js";
import { sections } from "./src/content/index.js";
import { LOCALES, t } from "./src/i18n.js";

const root = __dirname;

/**
 * Locale pages are generated, never authored.
 *
 * Each lesson has exactly one source of truth — `lessons/<slug>/index.html`,
 * custom markup and all (see the loading-manager overlay) — and it is emitted
 * once per locale into `<locale>/lessons/<slug>/index.html`. Those generated
 * trees are the actual Vite entry points and are gitignored.
 *
 * They live in the project root rather than a `.generated/` folder on purpose:
 * Vite derives an HTML file's output path from its input path relative to the
 * root, so entries at `ar/lessons/lights/index.html` land at
 * `dist/ar/lessons/lights/index.html` with no post-processing.
 */
const write = (file, contents) => {
	mkdirSync(dirname(file), { recursive: true });
	writeFileSync(file, contents);
};

/**
 * Lesson pages stay `dir="ltr"` even in Arabic.
 *
 * Their bodies are canvases and demo markup laid out left-to-right, and
 * flipping the document would break them — the loading-manager overlay being
 * the obvious case. Only the chrome bar flips, and it sets its own `dir` at
 * runtime from the locale in the path. The hub, which is all prose, flips fully.
 */
const setLang = (html, locale, { rtlDocument }) =>
	html.replace(
		/<html[^>]*>/,
		`<html lang="${t[locale].htmlLang}" dir="${rtlDocument ? t[locale].dir : "ltr"}">`,
	);

/**
 * A generated page no longer sits next to its item's `main.js`, so relative
 * references have to become root-absolute. Vite resolves a leading `/` from the
 * project root in both dev and build.
 *
 * Both spellings of "relative" have to be caught. This used to match `./x`
 * only, which silently shipped 12 lesson pages with a 404 stylesheet: a bare
 * `href="style.css"` was left alone, so it resolved against the *generated*
 * page at `/<locale>/<section>/<slug>/`, where nothing but `index.html` exists.
 * The build stayed green and the pages returned 200 — only the CSS was missing.
 *
 * The negative lookahead is what keeps this safe: anything already absolute
 * (`/src/global-style.css`), external (`https://`, `//`), or non-navigational
 * (`#`, `data:`, `mailto:`) is left exactly as it is.
 */
const absolutise = (html, sectionId, slug) =>
	html.replace(
		/(src|href)="(?!https?:|\/\/|\/|#|data:|mailto:)(?:\.\/)?([^"]+)"/g,
		(_match, attr, path) => `${attr}="/${sectionId}/${slug}/${path}"`,
	);

function generateLocaleEntries() {
	const input = {};
	const hub = readFileSync(resolve(root, "index.html"), "utf8");

	for (const locale of LOCALES) {
		const hubOut = resolve(root, locale, "index.html");
		write(hubOut, setLang(hub, locale, { rtlDocument: true }));
		input[`hub-${locale}`] = hubOut;

		for (const section of sections) {
			/**
			 * The course index at `/<locale>/<section>/`, built from the same hub
			 * template. The app reads `routeFromPath()` to decide whether to render
			 * the landing page or this course's grid, so one bundle serves both and
			 * there is no router. These pages are all prose, so they flip fully RTL.
			 */
			const indexOut = resolve(root, locale, section.id, "index.html");
			write(indexOut, setLang(hub, locale, { rtlDocument: true }));
			input[`${locale}-${section.id}-index`] = indexOut;

			for (const item of section.items) {
				const from = resolve(root, section.id, item.slug, "index.html");
				const source = readFileSync(from, "utf8");
				const out = resolve(root, locale, section.id, item.slug, "index.html");
				write(
					out,
					absolutise(
						setLang(source, locale, { rtlDocument: false }),
						section.id,
						item.slug,
					),
				);
				input[`${locale}-${section.id}-${item.slug}`] = out;
			}
		}
	}

	return input;
}

export default defineConfig({
	plugins: [react(), tailwindcss(), seo(), prerender()],
	server: {
		port: 3000,
		host: true,
	},
	build: {
		rollupOptions: {
			input: generateLocaleEntries(),
		},
	},
});
