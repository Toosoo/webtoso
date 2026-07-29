import { SiGithub, SiInstagram, SiTelegram, SiYoutube } from "react-icons/si";
import { sections } from "./content/index.js";
import {
	localeFromPath,
	otherLocale,
	routeFromPath,
	switchLocalePath,
	t,
} from "./i18n.js";

/**
 * Hub copy for the locale and route this page is being served under.
 *
 * The words all live in `./i18n.js`; this file wires them to the shape the hub
 * components already consume, so nothing downstream had to change to become
 * bilingual. Structure that is not language — section order, social links —
 * stays here.
 *
 * Counts, lesson numbers and section ranges are derived from `./content/`, so
 * there are no numbers to maintain in either file.
 */

/**
 * One bundle serves three page shapes — the root landing page, a course index,
 * and (via lessonChrome) the lesson pages. Which one renders is read from the
 * path rather than routed, because every page is a real static HTML entry.
 */
const pathname = typeof location === "undefined" ? "/" : location.pathname;

const locale = localeFromPath(pathname);
const route = routeFromPath(pathname);

const copy = t[locale];

export const hub = {
	locale,
	dir: copy.dir,
	/** `{ section, slug }`. `section === null` is the root landing page. */
	route,

	brand: copy.brand,
	home: copy.home,

	/**
	 * The navbar language switcher. Points at the counterpart of the page the
	 * reader is on, not at the home page, and is labelled in the target language
	 * so it is legible to the person who needs it.
	 */
	localeSwitch: {
		locale: otherLocale(locale),
		href: switchLocalePath(pathname, otherLocale(locale)),
		label: t[otherLocale(locale)].localeName,
		ariaLabel: copy.switchLocaleAriaLabel,
		dir: t[otherLocale(locale)].dir,
	},

	filterLabel: copy.filterLabel,
	filterAriaLabel: copy.filterAriaLabel,
	allLabel: copy.allLabel,
	backHome: copy.backHome,
	backHomeAriaLabel: copy.backHomeAriaLabel,

	/**
	 * The three content sections, each with its own translated label, its own
	 * categories and its own index-page prose. Section order comes from
	 * `content/index.js`; category order comes from the key order in
	 * `i18n.sections[id].categories`, so one place defines both the order and the
	 * labels and a category cannot be added in one locale only.
	 */
	sections: sections.map((section) => ({
		id: section.id,
		label: copy.sections[section.id].label,
		items: section.items,
		index: copy.sections[section.id].index,
		itemWord: copy.sections[section.id].itemWord ?? copy.lessonWord,
		categories: Object.entries(copy.sections[section.id].categories).map(
			([id, label]) => ({ id, label }),
		),
	})),

	lessonWord: copy.lessonWord,
	showingCount: copy.showingCount,

	lessonCard: {
		/** `{title}` is replaced with the lesson title, which stays English. */
		watchLabel: copy.watchLabel,
	},

	socialNavAriaLabel: copy.socialNavAriaLabel,
	socialLinks: [
		{
			href: "https://www.instagram.com/not.toso",
			label: "Instagram",
			Icon: SiInstagram,
		},
		{
			href: "https://t.me/webtoso",
			label: "Telegram channel",
			Icon: SiTelegram,
		},
		{
			href: "https://www.youtube.com/@webtoso",
			label: "YouTube channel",
			Icon: SiYoutube,
		},
		{
			href: "https://github.com/Toosoo/threejs-course",
			label: "GitHub repository",
			Icon: SiGithub,
		},
	],
};

/** `"/ar/" + "gsap"` → `"/ar/gsap/"`. Locale-prefixed, like every internal link. */
export const sectionUrl = (sectionId) => `/${locale}/${sectionId}/`;

/** The section record for an id, or undefined. */
export const sectionById = (id) =>
	hub.sections.find((section) => section.id === id);

/** The root landing page for this locale. */
export const homeUrl = `/${locale}/`;
