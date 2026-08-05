import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

const setLang = (html, locale) =>
	html.replace(
		/<html[^>]*>/,
		`<html lang="${t[locale].htmlLang}" dir="${t[locale].dir}">`,
	);

/** Only the 8 hub pages are generated; lessons build in place, one copy each. */
function generateLocaleEntries() {
	/* Wiped first — lesson snapshots left by an older build would otherwise
	   keep dev serving URLs that no longer exist. */
	for (const locale of LOCALES) {
		rmSync(resolve(root, locale), { recursive: true, force: true });
	}

	const input = {};
	const hub = readFileSync(resolve(root, "index.html"), "utf8");

	for (const locale of LOCALES) {
		const hubOut = resolve(root, locale, "index.html");
		write(hubOut, setLang(hub, locale));
		input[`hub-${locale}`] = hubOut;

		for (const section of sections) {
			const indexOut = resolve(root, locale, section.id, "index.html");
			write(indexOut, setLang(hub, locale));
			input[`${locale}-${section.id}-index`] = indexOut;
		}
	}

	for (const section of sections) {
		for (const item of section.items) {
			input[`${section.id}-${item.slug}`] = resolve(
				root,
				section.id,
				item.slug,
				"index.html",
			);
		}
	}

	return input;
}

export default defineConfig({
	/** No SPA fallback — a dead URL must 404 in dev exactly as it does on Vercel. */
	appType: "mpa",
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
