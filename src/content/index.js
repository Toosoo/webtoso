import { gsap } from "./gsap.js";
import { lab } from "./lab.js";
import { threejs } from "./threejs.js";

/**
 * The three content sections of the site, in nav order.
 *
 * A "section" is one top-level URL segment and one folder of entry points:
 * `/threejs/lights/` is built from `threejs/lights/index.html`. Adding a fourth
 * section means adding a content file here and a folder on disk — the build,
 * the SEO metadata, the sitemap and the chrome bar all derive from this list.
 *
 * Sections with no items are dropped, so a section can be scaffolded before it
 * has content without rendering an empty shell.
 */
const ALL = [
	{ id: "threejs", items: threejs },
	{ id: "gsap", items: gsap },
	{ id: "lab", items: lab },
];

export const sections = ALL.filter((section) => section.items.length > 0);

/** `("threejs", "lights")` → `"/threejs/lights/"`. Never stored, always derived. */
export const lessonUrl = (sectionId, slug) => `/${sectionId}/${slug}/`;

/**
 * Every item across every section, each tagged with its section and its
 * 1-based position within that section.
 */
export const allItems = sections.flatMap((section) =>
	section.items.map((item, index) => ({
		...item,
		section: section.id,
		number: index + 1,
		url: lessonUrl(section.id, item.slug),
	})),
);

/** The item a URL path points at, or null. Locale prefix optional. */
export function itemFromPath(pathname) {
	const parts = pathname.split("/").filter(Boolean);
	const start = sections.some((section) => section.id === parts[0]) ? 0 : 1;
	const [sectionId, slug] = [parts[start], parts[start + 1]];
	return (
		allItems.find((item) => item.section === sectionId && item.slug === slug) ??
		null
	);
}
