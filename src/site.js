/**
 * Locale-independent site facts: the origin, the author, the OG image.
 *
 * Anything a reader sees in words lives in `./i18n.js` instead, so there is one
 * place to translate and one place to change the domain.
 *
 * Build-time only — imported by vite.config.js and plugins/seo.js.
 */

/**
 * The custom domain, attached 2026-07-29. Registrar Cloudflare, DNS-only CNAME
 * at the apex flattened onto Vercel — the proxy must stay off, or Vercel cannot
 * issue its certificate.
 *
 * This value is what `<link rel="canonical">`, `hreflang` and the sitemap are
 * built from, so it has to be right *before* the sitemap is submitted: the first
 * crawl is what Google records as canonical.
 *
 * Set to null to fall back to the Vercel production domain.
 */
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
	/** 1200×630. Regenerate by screenshotting the hub if the design changes. */
	ogImage: "/og.png",
};
