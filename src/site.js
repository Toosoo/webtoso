/** Build-time only — imported by vite.config.js and plugins/seo.js. */

/** Canonicals, hreflang and the sitemap all build from this. Null falls back to Vercel. */
const CUSTOM_DOMAIN = "https://webtoso.com";

const vercelDomain =
	typeof process !== "undefined"
		? process.env.VERCEL_PROJECT_PRODUCTION_URL
		: undefined;

export const site = {
	url:
		CUSTOM_DOMAIN ??
		(vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"),
	author: "Ahmed Attia",
	/** Must stay 1200×630 — the dimensions are declared in plugins/seo.js. */
	ogImage: "/og.png",
};
