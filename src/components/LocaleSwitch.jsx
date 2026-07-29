import { hub } from "../hubData.js";

/**
 * Language switcher for the navbar.
 *
 * Three things it deliberately does:
 *
 * - Links to the *counterpart* of the current page (`/ar/gsap/` → `/en/gsap/`),
 *   not to the home page. Slugs are ASCII and identical across locales, so the
 *   mapping is exact.
 * - Labels itself in the target language and its own script — "العربية" on the
 *   English page, "English" on the Arabic one. A reader who needs the switch
 *   can't necessarily read the language they are currently looking at.
 * - Sets `lang` and `dir` on itself, so the Arabic label picks up Cairo from the
 *   font stack and is isolated from the surrounding text direction.
 *
 * `hrefLang` matches the `alternate` links `plugins/seo.js` already emits for
 * every page, so the markup and the metadata agree.
 */
export function LocaleSwitch() {
	const { href, label, locale, ariaLabel, dir } = hub.localeSwitch;

	return (
		<a
			href={href}
			hrefLang={locale}
			lang={locale}
			dir={dir}
			aria-label={ariaLabel}
			className="inline-flex h-9 shrink-0 items-center border border-hairline px-3 text-[0.6875rem] font-medium tracking-[0.14em] text-ink uppercase transition-colors duration-150 hover:border-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
		>
			{label}
		</a>
	);
}
