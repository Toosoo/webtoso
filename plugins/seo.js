import { lessons } from "../src/lessons.js";
import { site } from "../src/site.js";

/**
 * Injects per-page SEO metadata into every HTML entry and emits sitemap.xml +
 * robots.txt at build. Everything derives from `lessons.js`, so publishing a
 * lesson needs no SEO work — add the entry and the metadata follows.
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

function lessonMeta(lesson, index) {
	const number = index + 1;
	const video = lesson.youtubeUrl
		? " Run the scene live in your browser and watch the video walkthrough."
		: " Run the scene live in your browser.";

	return {
		title: `${lesson.title} · Lesson ${pad(number)} — ${site.name}`,
		description:
			lesson.description ??
			`${lesson.title} — lesson ${number} of a free, interactive three.js course.${video}`,
		canonical: abs(lesson.url),
	};
}

function hubMeta() {
	return {
		title: `${site.name} — free interactive lessons by ${site.author}`,
		description: site.description,
		canonical: abs("/"),
	};
}

/** Course + ItemList so search engines read the hub as a structured curriculum. */
function courseJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Course",
		name: site.name,
		description: site.description,
		url: abs("/"),
		inLanguage: "en",
		isAccessibleForFree: true,
		provider: {
			"@type": "Person",
			name: site.author,
			url: abs("/"),
		},
		hasPart: lessons.map((lesson, index) => ({
			"@type": "LearningResource",
			position: index + 1,
			name: lesson.title,
			url: abs(lesson.url),
			learningResourceType: "Interactive lesson",
		})),
	};
}

function tagsFor(meta, jsonLd) {
	const tags = [
		{ tag: "meta", attrs: { name: "description", content: meta.description } },
		{ tag: "link", attrs: { rel: "canonical", href: meta.canonical } },
		{ tag: "meta", attrs: { property: "og:type", content: "website" } },
		{ tag: "meta", attrs: { property: "og:site_name", content: site.name } },
		{ tag: "meta", attrs: { property: "og:locale", content: site.locale } },
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

export function seo() {
	return {
		name: "course-seo",

		transformIndexHtml: {
			order: "pre",
			handler(html, ctx) {
				const slug = ctx.path.match(/lessons\/([^/]+)\//)?.[1];
				const index = lessons.findIndex((lesson) => lesson.slug === slug);
				const isLesson = index !== -1;

				const meta = isLesson ? lessonMeta(lessons[index], index) : hubMeta();
				const jsonLd = isLesson ? null : courseJsonLd();

				return {
					html: html.replace(
						/<title>[\s\S]*?<\/title>/,
						`<title>${escapeHtml(meta.title)}</title>`,
					),
					tags: tagsFor(meta, jsonLd),
				};
			},
		},

		generateBundle() {
			const urls = [abs("/"), ...lessons.map((lesson) => abs(lesson.url))];

			this.emitFile({
				type: "asset",
				fileName: "sitemap.xml",
				source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `\t<url><loc>${escapeHtml(url)}</loc></url>`).join("\n")}
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
