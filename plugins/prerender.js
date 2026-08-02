import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { sections } from "../src/content/index.js";
import { LOCALES } from "../src/i18n.js";
import { site } from "../src/site.js";

/**
 * Renders the eight hub pages (landing + three course indexes, both locales) to
 * static HTML at build. Lesson pages have no React and are not prerendered.
 */

/**
 * `hubData.js` reads `location.pathname` once at module scope, so each page
 * needs a fresh evaluation of that module. `invalidateAll()` is load-bearing —
 * without it every page after the first renders in the first page's locale.
 */
async function renderAt(server, path) {
	Object.defineProperty(globalThis, "location", {
		value: new URL(path, site.url),
		configurable: true,
		writable: true,
	});

	server.moduleGraph.invalidateAll();

	const { default: App } = await server.ssrLoadModule("/src/App.jsx");
	return renderToString(createElement(App));
}

export function prerender() {
	let root;
	let outDir;

	return {
		name: "hub-prerender",
		apply: "build",

		configResolved(config) {
			root = config.root;
			outDir = config.build.outDir;
		},

		/** `closeBundle`, not `generateBundle`: the HTML must already be on disk. */
		async closeBundle() {
			const paths = LOCALES.flatMap((locale) => [
				`/${locale}/`,
				...sections.map((section) => `/${locale}/${section.id}/`),
			]);

			/** `configFile: false` stops this recursing into itself. */
			const { createServer } = await import("vite");
			const server = await createServer({
				configFile: false,
				root,
				logLevel: "silent",
				appType: "custom",
				server: { middlewareMode: true },
				plugins: [react(), tailwindcss()],
			});

			try {
				for (const path of paths) {
					const file = resolve(root, outDir, `.${path}`, "index.html");
					if (!existsSync(file)) {
						this.warn(`prerender: no built page at ${path}, skipping`);
						continue;
					}

					const markup = await renderAt(server, path);
					const html = readFileSync(file, "utf8");

					/** Hard failure, not a silent no-op — that would ship empty pages. */
					const marker = '<div id="root"></div>';
					if (!html.includes(marker)) {
						this.error(`prerender: ${path} has no empty '${marker}' to fill`);
					}

					writeFileSync(
						file,
						html.replace(marker, `<div id="root">${markup}</div>`),
					);
				}
			} finally {
				await server.close();
			}
		},
	};
}
