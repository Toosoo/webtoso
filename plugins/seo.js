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
 * sitemap.xml + robots.txt at build.
 *
 * Everything derives from `lessons.js` and `i18n.js`, so publishing a lesson
 * needs no SEO work — add the entry and the metadata, the hreflang pairs and the
 * sitemap rows all follow.
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

/**
 * The section whose index page a path points at, or null.
 *
 * `itemFromPath` already returns null here — `/ar/gsap/index.html` has no slug
 * to match — so a course index needs its own check: exactly one segment after
 * the locale, and it has to name a real section.
 */
function sectionFromPath(pathname) {
	const parts = pathname
		.split("/")
		.filter(Boolean)
		.filter((part) => part !== "index.html");
	const rest = LOCALES.includes(parts[0]) ? parts.slice(1) : parts;
	if (rest.length !== 1) return null;
	return sections.find((section) => section.id === rest[0]) ?? null;
}

/**
 * The same page in every locale, plus x-default.
 *
 * x-default points at English as the more broadly readable fallback for a
 * visitor whose language we do not publish.
 */
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

function lessonMeta(item, locale) {
	const copy = t[locale];
	/** A section may override the noun: the courses teach lessons, the lab shows demos. */
	const sectionCopy = copy.sections[item.section];

	return {
		title: `${item.title} · ${sectionCopy.itemWord ?? copy.lessonWord} ${pad(item.number)} — ${sectionCopy.label}`,
		/**
		 * The template is per-section (decision 22). It used to be one global
		 * string that named three.js, which put "lesson N of a three.js course"
		 * on every GSAP lesson and every lab demo — 60 of 82 pages.
		 */
		description:
			item.description?.[locale] ??
			fill(sectionCopy.itemDescription, {
				title: item.title,
				n: item.number,
			}),
		canonical: abs(localePath(locale, item.url)),
		path: item.url,
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

/**
 * The root page lists the courses rather than the lessons.
 *
 * It is a CollectionPage whose parts are the three Courses, each pointing at
 * its own index — which is where the full `hasPart` lesson list lives. Before
 * the section indexes existed this was a single Course containing all 40 items,
 * which described the site as one curriculum it is not.
 */
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
			url: abs(localePath(locale, item.url)),
			learningResourceType: "Interactive lesson",
		})),
	};
}

function tagsFor(meta, jsonLd, locale) {
	const copy = t[locale];

	const tags = [
		{ tag: "meta", attrs: { name: "description", content: meta.description } },
		{ tag: "link", attrs: { rel: "canonical", href: meta.canonical } },
		...alternateTags(meta.path),
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

/**
 * The lesson chrome (home button + lesson label) is injected here rather than
 * written into every lesson's `index.html`, so anything that has to appear on
 * every lesson page is a one-line change in this file instead of one edit per
 * lesson. It reads its own locale from `location.pathname` at runtime.
 */
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

				/**
				 * Three page shapes: a lesson, a course index, or the root landing
				 * page. Only lesson pages get the chrome bar — the other two are
				 * hub pages that render their own navigation.
				 */
				const item = itemFromPath(ctx.path);
				const section = item ? null : sectionFromPath(ctx.path);

				let meta;
				let jsonLd;
				if (item) {
					meta = lessonMeta(item, locale);
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
						? [...tagsFor(meta, jsonLd, locale), chromeTag()]
						: tagsFor(meta, jsonLd, locale),
				};
			},
		},

		generateBundle() {
			const paths = [
				"/",
				...sections.map((section) => sectionPath(section.id)),
				...allItems.map((item) => item.url),
			];

			/**
			 * One sitemap covering both locales, with each entry declaring its
			 * alternates — the shape Google asks for when the same page exists in
			 * more than one language.
			 */
			const entries = LOCALES.flatMap((locale) =>
				paths.map((path) => ({
					loc: abs(localePath(locale, path)),
					alternates: [
						...LOCALES.map((alt) => ({
							hreflang: alt,
							href: abs(localePath(alt, path)),
						})),
						{ hreflang: "x-default", href: abs(localePath("en", path)) },
					],
				})),
			);

			this.emitFile({
				type: "asset",
				fileName: "sitemap.xml",
				source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
	.map(
		(entry) => `\t<url>
\t\t<loc>${escapeHtml(entry.loc)}</loc>
${entry.alternates
	.map(
		(alt) =>
			`\t\t<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeHtml(alt.href)}" />`,
	)
	.join("\n")}
\t</url>`,
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
