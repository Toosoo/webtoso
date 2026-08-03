import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
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
	plugins: [react(), tailwindcss(), rootRedirect(), seo(), prerender()],
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
