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
	{
		slug: "abstract-hero",
		title: "Abstract hero",
		tags: ["gsap", "ScrollTrigger", "three.js", "lil-gui"],
		category: "sites",
		youtubeUrl: watch("ipYpvV0IuK4", 11),
	},
	// {
	// 	slug: "tree-frames",
	// 	title: "Tree frames",
	// 	tags: ["gsap", "ScrollTrigger"],
	// 	category: "scroll",
	// 	youtubeUrl: watch("GZ02PXb7aXo", 10),
	// },
];
