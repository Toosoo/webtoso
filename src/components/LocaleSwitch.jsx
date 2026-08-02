import { hub } from "../hubData.js";

/** Links to the counterpart of the current page, labelled in the target language. */
export function LocaleSwitch() {
	const { href, label, locale, ariaLabel, dir } = hub.localeSwitch;

	return (
		<a
			href={href}
			hrefLang={locale}
			lang={locale}
			dir={dir}
			aria-label={ariaLabel}
			className="inline-flex h-9 shrink-0 items-center border border-highlight bg-highlight px-3 text-[0.6875rem] font-medium tracking-[0.14em] text-canvas uppercase transition-colors duration-150 hover:bg-canvas hover:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
		>
			{label}
		</a>
	);
}
