/**
 * Single source of truth for absolute URLs (canonical tags, Open Graph, sitemap).
 *
 * Build-time only — imported by vite.config.js, never by browser code.
 */

/**
 * Set this when you point a custom domain at the project, e.g.
 * "https://threejs.imatoso.com". Leave null and the Vercel production domain is
 * detected automatically at build time, so nothing here needs touching until then.
 */
const CUSTOM_DOMAIN = null;

const vercelDomain =
	typeof process !== "undefined"
		? process.env.VERCEL_PROJECT_PRODUCTION_URL
		: undefined;

export const site = {
	url:
		CUSTOM_DOMAIN ??
		(vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"),
	name: "three.js course",
	author: "Ahmed Attia",
	locale: "en_US",
	/** 1200×630. Regenerate by screenshotting the hub if the design changes. */
	ogImage: "/og.png",
	description:
		"A free, interactive three.js course. Every lesson runs live in your browser and has a video walkthrough.",
};
