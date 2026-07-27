/**
 * Lesson list. Array order is the course order — display numbers, section
 * ranges and counts are derived from it, so nothing here is numbered by hand.
 *
 * `category` must match an id in `hub.categories` (see `./hubData.js`).
 * This file is also read by `vite.config.js` to build the lesson entry points,
 * so every entry needs a real `lessons/<slug>/index.html` on disk.
 */
export const lessons = [
	{
		slug: "2-basics",
		title: "Basics",
		url: "/lessons/2-basics/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=JY-IbEambwE&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=3",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "3-basics2",
		title: "Basics II",
		url: "/lessons/3-basics2/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=QciuicjBwOQ&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=4",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "4-responsive-design",
		title: "Responsive design",
		url: "/lessons/4-responsive-design/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=BWg5h9oCaao&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=5",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "6-buffer-geometry",
		title: "Buffer geometry",
		url: "/lessons/6-buffer-geometry/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=hY4syXPiIvc&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=6",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "7-cameras-controls",
		title: "Cameras & controls",
		url: "/lessons/7-cameras-controls/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=1gpUWlSubsw&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=7",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "8-materials",
		title: "Materials",
		url: "/lessons/8-materials/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=raXF6Ipt00c&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=8",
		tags: ["three.js"],
		category: "textures-light",
	},
	{
		slug: "9-debug",
		title: "Debug (GUI & stats)",
		url: "/lessons/9-debug/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=lS3SnFx0jpY&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=9",
		tags: ["three.js", "lil-gui", "stats.js"],
		category: "textures-light",
	},
	{
		slug: "10-textures",
		title: "Textures",
		url: "/lessons/10-textures/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=72YQr1K2tdo&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=10",
		tags: ["three.js"],
		category: "textures-light",
	},
	{
		slug: "11-loading-manager",
		title: "Loading Manager",
		url: "/lessons/11-loading-manager/",
		youtubeUrl:
			"https://www.youtube.com/watch?v=PRioWnAUZeg&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=12",
		tags: ["three.js"],
		category: "textures-light",
	},
	{
		slug: "12-lights",
		title: "Lights",
		url: "/lessons/12-lights/",
		// TODO: this is Loading Manager's video id — replace with the Lights video.
		youtubeUrl:
			"https://www.youtube.com/watch?v=PRioWnAUZeg&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=13",
		tags: ["three.js"],
		category: "textures-light",
	},
];
