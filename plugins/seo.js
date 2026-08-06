import { allItems, itemFromPath, sections } from "../src/content/index.js";
import {
	DEFAULT_LOCALE,
	fill,
	LOCALES,
	localeFromPath,
	t,
} from "../src/i18n.js";
import { site } from "../src/site.js";

/**
 * Injects per-page, per-locale SEO metadata into every HTML entry and emits
 * sitemap.xml + robots.txt at build. Everything derives from `content/` and
 * `i18n.js`, so publishing a lesson needs no SEO work.
 */

const escapeHtml = (value) =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

const pad = (n) => String(n).padStart(2, "0");

/** Absolute URL for a site-relative path. */
const abs = (path) => new URL(path, site.url).href;

/** `("ar", "/threejs/lights/")` → `"/ar/threejs/lights/"` */
const localePath = (locale, path) => `/${locale}${path}`;

/** `"gsap"` → `"/gsap/"`. The course index, one segment above its lessons. */
const sectionPath = (sectionId) => `/${sectionId}/`;

/** The section whose index page a path points at, or null. */
function sectionFromPath(pathname) {
	const parts = pathname
		.split("/")
		.filter(Boolean)
		.filter((part) => part !== "index.html");
	const rest = LOCALES.includes(parts[0]) ? parts.slice(1) : parts;
	if (rest.length !== 1) return null;
	return sections.find((section) => section.id === rest[0]) ?? null;
}

/** The same page in every locale, plus x-default pointing at English. */
const alternateTags = (path) => [
	...LOCALES.map((locale) => ({
		tag: "link",
		attrs: {
			rel: "alternate",
			hreflang: locale,
			href: abs(localePath(locale, path)),
		},
	})),
	{
		tag: "link",
		attrs: {
			rel: "alternate",
			hreflang: "x-default",
			href: abs(localePath("en", path)),
		},
	},
];

/** A lesson at `/<section>/<slug>/` — one URL, English meta, no alternates. */
function lessonMeta(item) {
	const copy = t.en;
	const sectionCopy = copy.sections[item.section];

	return {
		title: `${item.title} · ${sectionCopy.itemWord ?? copy.lessonWord} ${pad(item.number)} — ${sectionCopy.label}`,
		description:
			item.description?.en ??
			fill(sectionCopy.itemDescription, {
				title: item.title,
				n: item.number,
			}),
		canonical: abs(item.url),
	};
}

/** The root landing page. */
function homeMeta(locale) {
	const copy = t[locale];

	return {
		title: copy.home.title,
		description: copy.home.description,
		canonical: abs(localePath(locale, "/")),
		path: "/",
	};
}

/** A course index at `/<locale>/<section>/`. */
function sectionMeta(sectionId, locale) {
	const indexCopy = t[locale].sections[sectionId].index;

	return {
		title: indexCopy.title,
		description: indexCopy.description,
		canonical: abs(localePath(locale, sectionPath(sectionId))),
		path: sectionPath(sectionId),
	};
}

const providerFor = (locale) => ({
	"@type": "Person",
	name: site.author,
	url: abs(localePath(locale, "/")),
});

/** A CollectionPage whose parts are the three Courses. */
function homeJsonLd(locale) {
	const copy = t[locale];

	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: copy.home.heading,
		description: copy.home.description,
		url: abs(localePath(locale, "/")),
		inLanguage: locale,
		hasPart: sections.map((section) => ({
			"@type": "Course",
			name: copy.sections[section.id].index.heading,
			description: copy.sections[section.id].index.description,
			url: abs(localePath(locale, sectionPath(section.id))),
			inLanguage: locale,
			isAccessibleForFree: true,
			provider: providerFor(locale),
		})),
	};
}

/** Course + its ordered items, so a course index reads as a real curriculum. */
function sectionJsonLd(sectionId, locale) {
	const copy = t[locale];
	const indexCopy = copy.sections[sectionId].index;
	const items = allItems.filter((item) => item.section === sectionId);

	return {
		"@context": "https://schema.org",
		"@type": "Course",
		name: indexCopy.heading,
		description: indexCopy.description,
		url: abs(localePath(locale, sectionPath(sectionId))),
		inLanguage: locale,
		isAccessibleForFree: true,
		provider: providerFor(locale),
		hasPart: items.map((item) => ({
			"@type": "LearningResource",
			position: item.number,
			name: item.title,
			url: abs(item.url),
			learningResourceType: "Interactive lesson",
		})),
	};
}

function tagsFor(meta, jsonLd, locale) {
	const copy = t[locale];

	const tags = [
		{ tag: "meta", attrs: { name: "description", content: meta.description } },
		{ tag: "link", attrs: { rel: "canonical", href: meta.canonical } },
		...(meta.path ? alternateTags(meta.path) : []),
		{ tag: "meta", attrs: { property: "og:type", content: "website" } },
		{
			tag: "meta",
			attrs: { property: "og:site_name", content: copy.siteName },
		},
		{ tag: "meta", attrs: { property: "og:locale", content: copy.ogLocale } },
		{ tag: "meta", attrs: { property: "og:title", content: meta.title } },
		{
			tag: "meta",
			attrs: { property: "og:description", content: meta.description },
		},
		{ tag: "meta", attrs: { property: "og:url", content: meta.canonical } },
		{
			tag: "meta",
			attrs: { property: "og:image", content: abs(site.ogImage) },
		},
		{ tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
		{ tag: "meta", attrs: { property: "og:image:height", content: "630" } },
		{
			tag: "meta",
			attrs: { name: "twitter:card", content: "summary_large_image" },
		},
		{ tag: "meta", attrs: { name: "twitter:title", content: meta.title } },
		{
			tag: "meta",
			attrs: { name: "twitter:description", content: meta.description },
		},
		{
			tag: "meta",
			attrs: { name: "twitter:image", content: abs(site.ogImage) },
		},
		{ tag: "meta", attrs: { name: "author", content: site.author } },
		{
			tag: "link",
			attrs: {
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				href: "/favicon-96.png",
			},
		},
		{
			tag: "link",
			attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		},
		/* --color-canvas, hand-copied from hub.css like lessonChrome's colours. */
		{ tag: "meta", attrs: { name: "theme-color", content: "#0f0d0e" } },
	];

	if (jsonLd) {
		tags.push({
			tag: "script",
			attrs: { type: "application/ld+json" },
			children: JSON.stringify(jsonLd),
		});
	}

	return tags.map((tag) => ({ ...tag, injectTo: "head" }));
}

/** Injected here so every lesson page gets it from one place. */
const chromeTag = () => ({
	tag: "script",
	attrs: { type: "module", src: "/src/lessonChrome.js" },
	injectTo: "body",
});

export function seo() {
	return {
		name: "course-seo",

		transformIndexHtml: {
			order: "pre",
			handler(html, ctx) {
				const locale = localeFromPath(ctx.path);

				/** Three page shapes: a lesson, a course index, or the landing page. */
				const item = itemFromPath(ctx.path);
				const section = item ? null : sectionFromPath(ctx.path);

				let meta;
				let jsonLd;
				if (item) {
					meta = lessonMeta(item);
					jsonLd = null;
				} else if (section) {
					meta = sectionMeta(section.id, locale);
					jsonLd = sectionJsonLd(section.id, locale);
				} else {
					meta = homeMeta(locale);
					jsonLd = homeJsonLd(locale);
				}

				return {
					html: html.replace(
						/<title>[\s\S]*?<\/title>/,
						`<title>${escapeHtml(meta.title)}</title>`,
					),
					tags: item
						? [...tagsFor(meta, jsonLd, "en"), chromeTag()]
						: tagsFor(meta, jsonLd, locale),
				};
			},
		},

		generateBundle() {
			const hubPaths = [
				"/",
				...sections.map((section) => sectionPath(section.id)),
			];

			/** Hub paths exist once per locale and declare alternates; lessons once. */
			const entries = [
				...LOCALES.flatMap((locale) =>
					hubPaths.map((path) => ({
						loc: abs(localePath(locale, path)),
						alternates: [
							...LOCALES.map((alt) => ({
								hreflang: alt,
								href: abs(localePath(alt, path)),
							})),
							{ hreflang: "x-default", href: abs(localePath("en", path)) },
						],
					})),
				),
				...allItems.map((item) => ({ loc: abs(item.url), alternates: [] })),
			];

			this.emitFile({
				type: "asset",
				fileName: "sitemap.xml",
				source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
	.map((entry) =>
		[
			"\t<url>",
			`\t\t<loc>${escapeHtml(entry.loc)}</loc>`,
			...entry.alternates.map(
				(alt) =>
					`\t\t<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeHtml(alt.href)}" />`,
			),
			"\t</url>",
		].join("\n"),
	)
	.join("\n")}
</urlset>
`,
			});

			this.emitFile({
				type: "asset",
				fileName: "robots.txt",
				source: `User-agent: *
Allow: /

Sitemap: ${abs("/sitemap.xml")}
`,
			});
		},
	};
}

export { DEFAULT_LOCALE };
