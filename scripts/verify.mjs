import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { allItems, sections } from "../src/content/index.js";
import { LOCALES } from "../src/i18n.js";
import { site } from "../src/site.js";

/**
 * Post-build checks. Every expectation derives from the content manifest, so
 * publishing a lesson changes the numbers here on its own. Run `pnpm build`
 * first; exits non-zero on any failure.
 */

const dist = resolve(import.meta.dirname, "..", "dist");

if (!existsSync(dist)) {
	console.error("no dist/ — run `pnpm build` first");
	process.exit(1);
}

let failures = 0;
const check = (label, ok, detail = "") => {
	console.log(
		`${ok ? "ok  " : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`,
	);
	if (!ok) failures += 1;
};

const page = (path) =>
	readFileSync(resolve(dist, `.${path}`, "index.html"), "utf8");

const hubPaths = LOCALES.flatMap((locale) => [
	`/${locale}/`,
	...sections.map((section) => `/${locale}/${section.id}/`),
]);
const expected = [...hubPaths, ...allItems.map((item) => item.url)];

/* The built page set must equal the manifest's promise — no misses, no strays. */
const built = [];
const walk = (dir, path = "/") => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory())
			walk(resolve(dir, entry.name), `${path}${entry.name}/`);
		else if (entry.name === "index.html") built.push(path);
	}
};
walk(dist);

const missing = expected.filter((path) => !built.includes(path));
const strays = built.filter((path) => !expected.includes(path));
check(
	`pages: ${expected.length} built`,
	missing.length === 0 && strays.length === 0,
	[
		missing.length ? `missing ${missing.join(" ")}` : "",
		strays.length ? `strays ${strays.join(" ")}` : "",
	]
		.filter(Boolean)
		.join("; "),
);

/* Sitemap must list exactly the built pages, absolute against site.url. */
const sitemap = readFileSync(resolve(dist, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(match) => match[1],
);
const expectedLocs = expected.map((path) => new URL(path, site.url).href);
check(
	`sitemap: ${expectedLocs.length} entries`,
	locs.length === expectedLocs.length &&
		expectedLocs.every((loc) => locs.includes(loc)),
	`found ${locs.length}`,
);

check("robots.txt", existsSync(resolve(dist, "robots.txt")));

/* Hub pages must carry real prerendered prose — 0 means prerender silently broke. */
for (const path of hubPaths) {
	const body = page(path).match(/<body[\s\S]*<\/body>/)?.[0] ?? "";
	const words = body
		.replace(/<script[\s\S]*?<\/script>/g, " ")
		.replace(/<[^>]+>/g, " ")
		.split(/\s+/)
		.filter(Boolean).length;
	check(`hub prose ${path}`, words >= 100 && words <= 500, `${words} words`);
}

/* Hubs pair locales via hreflang; a lesson has one URL and must declare none. */
for (const path of hubPaths) {
	const trio = ['hreflang="ar"', 'hreflang="en"', 'hreflang="x-default"'];
	check(
		`hreflang ${path}`,
		trio.every((tag) => page(path).includes(tag)),
	);
}

let badCanonicals = 0;
let hreflangStrays = 0;
const deadRefs = [];
for (const item of allItems) {
	const html = page(item.url);
	const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
	if (canonical !== new URL(item.url, site.url).href) badCanonicals += 1;
	if (html.includes("hreflang=")) hreflangStrays += 1;

	/* Every root-absolute src/href must resolve to a file in dist. */
	for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
		const file = ref.split(/[?#]/)[0];
		/* Vercel serves /_vercel/* at the edge — never present in dist. */
		if (file.startsWith("/_vercel/")) continue;
		if (!existsSync(resolve(dist, `.${file}`)))
			deadRefs.push(`${item.url} → ${file}`);
	}
}
check(
	`lesson canonicals (${allItems.length})`,
	badCanonicals === 0,
	badCanonicals ? `${badCanonicals} wrong` : "",
);
check(
	"lesson pages declare no hreflang",
	hreflangStrays === 0,
	hreflangStrays ? `${hreflangStrays} pages` : "",
);
check(
	"lesson asset refs resolve",
	deadRefs.length === 0,
	deadRefs.slice(0, 5).join("; "),
);

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
