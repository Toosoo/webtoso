import { SiGithub, SiInstagram, SiTelegram, SiYoutube } from "react-icons/si";

/**
 * Edit all hub page copy, categories and social links here.
 * The lesson list stays in `./lessons.js` (also read by `vite.config.js`).
 *
 * Counts, lesson numbers and section ranges are derived from the lesson list —
 * there are no numbers to maintain in this file.
 */
export const hub = {
	brand: "Ahmed Attia",
	eyebrow: "Course index",
	title: "three.js course",
	subtitle: [
		"From a first rotating cube to shaders, physics and a deployed portfolio scene.",
		"Open any lesson in the browser; the video sits one click behind it.",
	],
	filterLabel: "Filter",
	filterAriaLabel: "Filter lessons by category",
	allLabel: "All",
	/** Order here is the order of the filter chips and the sections. */
	categories: [
		{ id: "foundations", label: "Foundations" },
		{ id: "textures-light", label: "Textures & Lights" },
	],
	lessonCard: {
		/** `{title}` is replaced with the lesson title. */
		watchLabel: "Watch {title} on YouTube",
	},
	socialNavAriaLabel: "Social links",
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
