/**
 * The lab — finished demos, not lessons.
 *
 * Same rules as the courses: array order is display order, URLs are derived,
 * every entry needs a real `lab/<slug>/index.html` on disk.
 *
 * `examples/1-playground` and `examples/test` are deliberately absent: one is a
 * single scratch file titled "Lesson 5", the other has an empty `<title>` and
 * is a throwaway timeline experiment. Neither belongs in a showcase.
 *
 * Videos come from the "تطبيقات الدروس" playlist, extracted 2026-07-28 and
 * re-extracted 2026-07-30. Three of its eleven videos have no demo here yet:
 * #001 Stagger Text, #008 Video Scrub, #010 Stack Cards.
 *
 * `creative-dev` and `lottie-scrolltrigger` carry no `youtubeUrl` — they are not
 * obviously in this playlist, and they are the first two items on the site
 * without a video. The card and the chrome bar both handle its absence; the
 * watch link simply doesn't render.
 *
 * Array order follows the category order in `i18n.sections.lab.categories`
 * (scroll → components → sites), which is the order the hub renders them in.
 */

/** The demos playlist — a different one from the GSAP course. */
const LIST = "PLVFwdndx21r5hbVzLXEJNu5Ea-FvDxwmT";

const watch = (id, index) =>
	`https://www.youtube.com/watch?v=${id}&list=${LIST}&index=${index}`;

export const lab = [
	{
		slug: "image-sequence",
		title: "Image sequence",
		tags: ["gsap", "ScrollTrigger"],
		category: "scroll",
		youtubeUrl: watch("kdSV-qjhrHM", 3),
	},
	{
		slug: "parallax-horizontal",
		title: "Horizontal parallax",
		tags: ["gsap", "ScrollTrigger"],
		category: "scroll",
		youtubeUrl: watch("TPJBIH4SahY", 4),
	},
	{
		slug: "scrub-splittext",
		title: "Scrubbed SplitText",
		tags: ["gsap", "ScrollTrigger", "SplitText"],
		category: "scroll",
		youtubeUrl: watch("uMYtwIzReoY", 5),
	},
	{
		slug: "scrolltrigger-motion-path",
		title: "ScrollTrigger + MotionPath",
		tags: ["gsap", "ScrollTrigger", "MotionPathPlugin"],
		category: "scroll",
		youtubeUrl: watch("5jFa5i_rBAM", 9),
	},
	{
		slug: "draw-svg",
		title: "DrawSVG",
		tags: ["gsap", "DrawSVGPlugin"],
		category: "components",
		/** #007 "Bird Line Art" — the only line-art video, and the only DrawSVG demo. */
		youtubeUrl: watch("LhEVGeaIbR4", 7),
	},
	{
		slug: "toggle-button",
		title: "Toggle button",
		tags: ["gsap"],
		category: "components",
		youtubeUrl: watch("QPrwNnwTZYs", 6),
	},
	{
		slug: "creative-dev",
		title: "Creative dev",
		tags: ["gsap", "ScrollTrigger", "Draggable"],
		category: "sites",
	},
	{
		slug: "clouds-book",
		title: "Clouds book",
		tags: ["gsap", "ScrollTrigger"],
		category: "sites",
		youtubeUrl: watch("Sy11oO9p1Jo", 2),
	},
	/**
	 * The only piece on the site that uses three.js and GSAP together, which is
	 * why it lives in the lab rather than in either course. Its matcap comes from
	 * the shared `public/matcaps/` set — matcap-6, one of the 5–18 kept on purpose.
	 */
	{
		slug: "abstract-hero",
		title: "Abstract hero",
		tags: ["gsap", "ScrollTrigger", "three.js", "lil-gui"],
		category: "sites",
		youtubeUrl: watch("ipYpvV0IuK4", 11),
	},
	/*
	 * Held back — the demo is not finished. Everything but the bird is commented
	 * out in its main.js: the motionPath tween, the pixi snow, the clouds, the
	 * trees. It registers ScrollTrigger and never calls it, so it has no scroll
	 * animation despite the name, and the lab is introduced as finished pieces.
	 *
	 * The folder, its assets and its deps (pixi.js, @lottiefiles/dotlottie-web)
	 * all stay in place, so finishing it means uncommenting this entry. Nothing
	 * ships meanwhile: the build derives its entry points from this array, so an
	 * absent item is an unbuilt page, not a broken link. The assets it would need
	 * are archived at _demo-archive/ — snowman.png and the two 4803px-wide
	 * snow-land strips.
	 *
	 * { slug: "lottie-scrolltrigger", title: "Lottie + ScrollTrigger", tags: ["gsap", "ScrollTrigger", "lottie"], category: "sites" },
	 */
];
