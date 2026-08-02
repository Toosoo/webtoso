/**
 * Same rules as `./threejs.js`. The `index` in each `youtubeUrl` is the video's
 * position in the playlist, NOT the lesson number here — the two diverge because
 * the site groups by category while the playlist is chronological.
 */

const LIST = "PLVFwdndx21r651bnDaKzUfwcZBqEaQz7D";

/** `("DcOhEW3omCo", 1)` → the full in-playlist watch URL. */
const watch = (id, index) =>
	`https://www.youtube.com/watch?v=${id}&list=${LIST}&index=${index}`;

export const gsap = [
	{
		slug: "intro",
		title: "Intro",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("DcOhEW3omCo", 1),
	},
	{
		slug: "tween",
		title: "Tween",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("F9tbQQ6YTHo", 2),
	},
	{
		slug: "stagger",
		title: "Stagger",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("z2KCaDxYIB4", 3),
	},
	{
		slug: "ease",
		title: "Ease",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("2Zl6nSp0ptA", 4),
	},
	{
		slug: "timeline",
		title: "Timeline",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("37G_W5CovdM", 5),
	},
	{
		slug: "timeline-2",
		title: "Timeline II",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("zNVOqktZxIw", 6),
	},
	{
		slug: "keyframes",
		title: "Keyframes",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("zTt2Ej7wr28", 20),
	},
	{
		slug: "immediate-render",
		title: "immediateRender",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("m5IXZoeOslo", 7),
	},
	{
		slug: "match-media",
		title: "matchMedia",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("Vs98MRnW8FE", 8),
	},
	{
		slug: "quick-to-quick-setter",
		title: "quickTo & quickSetter",
		tags: ["gsap"],
		category: "core",
		youtubeUrl: watch("blv8wo4FRjA", 17),
	},

	{
		slug: "scrolltrigger",
		title: "ScrollTrigger",
		tags: ["gsap", "ScrollTrigger"],
		category: "scroll",
		youtubeUrl: watch("PT7zuF_zlL8", 10),
	},
	{
		slug: "scrolltrigger-2",
		title: "ScrollTrigger II",
		tags: ["gsap", "ScrollTrigger"],
		category: "scroll",
		youtubeUrl: watch("UECDQFg0yo0", 11),
	},
	{
		slug: "scrolltrigger-snap",
		title: "ScrollTrigger snap",
		tags: ["gsap", "ScrollTrigger"],
		category: "scroll",
		youtubeUrl: watch("oDJVmdL0fhE", 31),
	},
	{
		slug: "scrollsmoother",
		title: "ScrollSmoother",
		tags: ["gsap", "ScrollSmoother"],
		category: "scroll",
		youtubeUrl: watch("L4AD-TWsvMI", 15),
	},
	{
		slug: "scroll-to",
		title: "ScrollTo",
		tags: ["gsap", "ScrollToPlugin"],
		category: "scroll",
		youtubeUrl: watch("aWGknhiRNmg", 28),
	},
	{
		slug: "observer",
		title: "Observer",
		tags: ["gsap", "Observer"],
		category: "scroll",
		youtubeUrl: watch("85jJFcqimD0", 22),
	},

	{
		slug: "splittext",
		title: "SplitText",
		tags: ["gsap", "SplitText"],
		category: "plugins",
		youtubeUrl: watch("PaO1ntDOQPk", 18),
	},
	{
		slug: "scramble-text",
		title: "ScrambleText",
		tags: ["gsap", "ScrambleTextPlugin"],
		category: "plugins",
		youtubeUrl: watch("QtcDKpsdRss", 24),
	},
	{
		slug: "morph-svg",
		title: "MorphSVG",
		tags: ["gsap", "MorphSVGPlugin"],
		category: "plugins",
		youtubeUrl: watch("1YqabBVULzc", 29),
	},
	{
		slug: "motion-path",
		title: "MotionPath",
		tags: ["gsap", "MotionPathPlugin"],
		category: "plugins",
		youtubeUrl: watch("HANMCp7DW7g", 26),
	},
	{
		slug: "motion-path-2",
		title: "MotionPath II",
		tags: ["gsap", "MotionPathPlugin"],
		category: "plugins",
		youtubeUrl: watch("kywdSqzgcF8", 27),
	},
	{
		slug: "draggable",
		title: "Draggable",
		tags: ["gsap", "Draggable"],
		category: "plugins",
		youtubeUrl: watch("-ymdIUNknIY", 23),
	},
	{
		slug: "physics-2d",
		title: "Physics2D",
		tags: ["gsap", "Physics2DPlugin"],
		category: "plugins",
		youtubeUrl: watch("deNu3eHGpWI", 32),
	},

	{
		slug: "use-gsap",
		title: "useGSAP()",
		tags: ["gsap", "react"],
		category: "react",
		youtubeUrl: watch("y3H4ICh5WXc", 14),
	},
	{
		slug: "react",
		title: "GSAP with React",
		tags: ["gsap", "react"],
		category: "react",
		youtubeUrl: watch("F6kkfsceUro", 30),
	},
];
