import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { prerender } from "./plugins/prerender.js";
import { seo } from "./plugins/seo.js";
import { sections } from "./src/content/index.js";
import { DEFAULT_LOCALE, LOCALES, t } from "./src/i18n.js";

const root = import.meta.dirname;

function rootRedirect() {
	const redirect = (req, res, next) => {
		if (req.url === "/" || req.url === "/index.html") {
			res.writeHead(302, { Location: `/${DEFAULT_LOCALE}/` });
			res.end();
			return;
		}
		next();
	};

	/* Block bodies: a value returned from these hooks is treated as a post-hook
	   and called with no arguments, which crashes the server on startup. */
	return {
		name: "root-redirect",
		configureServer(server) {
			server.middlewares.use(redirect);
		},
		configurePreviewServer(server) {
			server.middlewares.use(redirect);
		},
	};
}

/**
 * Locale trees are generated, gitignored, and live in the project root because
 * Vite derives an HTML file's output path from its path relative to the root.
 */
const write = (file, contents) => {
	mkdirSync(dirname(file), { recursive: true });
	writeFileSync(file, contents);
};

/** Lesson pages stay `dir="ltr"` even in Arabic — flipping breaks their layout. */
const setLang = (html, locale, { rtlDocument }) =>
	html.replace(
		/<html[^>]*>/,
		`<html lang="${t[locale].htmlLang}" dir="${rtlDocument ? t[locale].dir : "ltr"}">`,
	);

/**
 * Generated pages don't sit next to their `main.js`, so relative refs become
 * root-absolute. Must catch BOTH `./x` and bare `x` — matching only `./x` once
 * shipped 12 lessons with a 404 stylesheet and a green build.
 */
const absolutise = (html, sectionId, slug) =>
	html.replace(
		/(src|href)="(?!https?:|\/\/|\/|#|data:|mailto:)(?:\.\/)?([^"]+)"/g,
		(_match, attr, path) => `${attr}="/${sectionId}/${slug}/${path}"`,
	);

const lessonOut = (locale, sectionId, slug) =>
	resolve(root, locale, sectionId, slug, "index.html");

/** Both locale copies of one lesson page. The dev watcher reuses this, so the
    transform can never drift between the build and a live edit. */
function writeLessonPage(sectionId, slug) {
	const source = readFileSync(
		resolve(root, sectionId, slug, "index.html"),
		"utf8",
	);

	for (const locale of LOCALES) {
		write(
			lessonOut(locale, sectionId, slug),
			absolutise(
				setLang(source, locale, { rtlDocument: false }),
				sectionId,
				slug,
			),
		);
	}
}

function generateLocaleEntries() {
	const input = {};
	const hub = readFileSync(resolve(root, "index.html"), "utf8");

	for (const locale of LOCALES) {
		const hubOut = resolve(root, locale, "index.html");
		write(hubOut, setLang(hub, locale, { rtlDocument: true }));
		input[`hub-${locale}`] = hubOut;

		for (const section of sections) {
			const indexOut = resolve(root, locale, section.id, "index.html");
			write(indexOut, setLang(hub, locale, { rtlDocument: true }));
			input[`${locale}-${section.id}-index`] = indexOut;

			for (const item of section.items) {
				input[`${locale}-${section.id}-${item.slug}`] = lessonOut(
					locale,
					section.id,
					item.slug,
				);
			}
		}
	}

	for (const section of sections) {
		for (const item of section.items) {
			writeLessonPage(section.id, item.slug);
		}
	}

	return input;
}

/**
 * `generateLocaleEntries()` runs once, when this config loads, so dev serves a
 * snapshot of every lesson's `index.html`. Editing one changed nothing until the
 * server was restarted — and for the seven lessons whose script is inline, that
 * is the entire lesson. `main.js` and `style.css` were never affected: the
 * generated page points at their real paths.
 */
function watchLessonPages() {
	const sectionIds = new Set(sections.map((section) => section.id));

	return {
		name: "watch-lesson-pages",
		configureServer(server) {
			server.watcher.on("change", (file) => {
				/* Three segments, so the generated `ar/…` and `en/…` copies never
				   match — rewriting on those would feed the watcher its own writes. */
				const parts = relative(root, file).split(sep);

				if (parts.length === 1 && parts[0] === "index.html") {
					generateLocaleEntries();
				} else if (
					parts.length === 3 &&
					sectionIds.has(parts[0]) &&
					parts[2] === "index.html"
				) {
					writeLessonPage(parts[0], parts[1]);
				} else {
					return;
				}

				(server.hot ?? server.ws).send({ type: "full-reload", path: "*" });
			});
		},
	};
}

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		rootRedirect(),
		watchLessonPages(),
		seo(),
		prerender(),
	],
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
