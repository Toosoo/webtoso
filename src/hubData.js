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
 * Read once at module scope, so `plugins/prerender.js` has to reload this
 * module per page — see the `invalidateAll()` call there.
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
			href: "https://github.com/Toosoo/webtoso",
			label: "GitHub repository",
			Icon: SiGithub,
		},
	],
};

export const sectionUrl = (sectionId) => `/${locale}/${sectionId}/`;

export const sectionById = (id) =>
	hub.sections.find((section) => section.id === id);

export const homeUrl = `/${locale}/`;
