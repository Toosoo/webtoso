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
 * Renders the eight hub pages to static HTML at build time.
 *
 * Decision 13 puts every word the site owns on the hubs — lesson pages carry no
 * prose at all. But the hubs are a React app mounted into `<div id="root">`, so
 * until this plugin existed all eight shipped as an empty div: the entire
 * indexable surface of the site was invisible to anything that would not run
 * JavaScript, and to Google until its deferred render pass came around. The
 * meta, hreflang and JSON-LD were always static; the body was not.
 *
 * The eight pages are the root landing page and the three course indexes, in
 * both locales. Lesson pages are deliberately not prerendered — they have no
 * React on them at all.
 */

/**
 * The hub reads its locale and route from `location.pathname` once, at module
 * scope in `hubData.js`, and every component imports the resulting singleton.
 * That is what keeps the components free of locale plumbing, and it is also why
 * eight pages need eight *evaluations* of that module rather than eight calls to
 * a render function.
 *
 * So each page stubs `location`, throws away the SSR module graph and loads the
 * app fresh. `invalidateAll()` is the load-bearing line — without it the second
 * page through the loop reuses the first page's `hub` and every locale renders
 * as Arabic.
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
		/** Nothing to prerender in dev — the app mounts client-side as usual. */
		apply: "build",

		configResolved(config) {
			root = config.root;
			outDir = config.build.outDir;
		},

		/**
		 * `closeBundle`, not `generateBundle`: the HTML has to be on disk already.
		 * These files are Vite's own output — script tags, hashed asset links and
		 * everything `seo.js` injected — and this step only fills in the empty root
		 * div, so the rest of the pipeline stays untouched.
		 */
		async closeBundle() {
			const paths = LOCALES.flatMap((locale) => [
				`/${locale}/`,
				...sections.map((section) => `/${locale}/${section.id}/`),
			]);

			/**
			 * `configFile: false` is what stops this from recursing: a child server
			 * that read `vite.config.js` would load this plugin again. The two
			 * plugins it does need are the JSX transform and Tailwind, the latter
			 * only so that `App.jsx`'s `import "./styles/hub.css"` resolves.
			 */
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

					/**
					 * An exact-match replace, and a hard failure if it does not match.
					 * A silent no-op here would ship the empty-div build again while the
					 * build stayed green — the same class of failure as the bare
					 * `href="style.css"` that `absolutise()` in vite.config.js exists to
					 * catch.
					 */
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
