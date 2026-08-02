/**
 * The three.js course, in course order.
 *
 * Array order IS the course order: display numbers, section ranges and counts
 * are all derived from it, so nothing here is numbered by hand. URLs are
 * derived too — see `lessonUrl()` in `./index.js`.
 *
 * `category` must match an id in `i18n.categories`. Read by `vite.config.js`
 * to build entry points, so every entry needs a real
 * `threejs/<slug>/index.html` on disk.
 */
export const threejs = [
	{
		slug: "basics",
		title: "Basics",
		youtubeUrl:
			"https://www.youtube.com/watch?v=JY-IbEambwE&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=3",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "basics-2",
		title: "Basics II",
		youtubeUrl:
			"https://www.youtube.com/watch?v=QciuicjBwOQ&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=4",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "responsive-design",
		title: "Responsive design",
		youtubeUrl:
			"https://www.youtube.com/watch?v=BWg5h9oCaao&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=5",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "buffer-geometry",
		title: "Buffer geometry",
		youtubeUrl:
			"https://www.youtube.com/watch?v=hY4syXPiIvc&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=6",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "cameras-controls",
		title: "Cameras & controls",
		youtubeUrl:
			"https://www.youtube.com/watch?v=1gpUWlSubsw&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=7",
		tags: ["three.js"],
		category: "foundations",
	},
	{
		slug: "materials",
		title: "Materials",
		youtubeUrl:
			"https://www.youtube.com/watch?v=raXF6Ipt00c&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=8",
		tags: ["three.js"],
		category: "textures-light",
	},
	{
		slug: "debug",
		title: "Debug (GUI & stats)",
		youtubeUrl:
			"https://www.youtube.com/watch?v=lS3SnFx0jpY&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=9",
		tags: ["three.js", "lil-gui", "stats.js"],
		category: "textures-light",
	},
	{
		slug: "textures",
		title: "Textures",
		youtubeUrl:
			"https://www.youtube.com/watch?v=72YQr1K2tdo&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=10",
		tags: ["three.js"],
		category: "textures-light",
	},
	{
		slug: "loading-manager",
		title: "Loading Manager",
		youtubeUrl:
			"https://www.youtube.com/watch?v=PRioWnAUZeg&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=12",
		tags: ["three.js"],
		category: "textures-light",
	},
	{
		slug: "lights",
		title: "Lights",
		youtubeUrl:
			"https://www.youtube.com/watch?v=O5_xHGmtCrE&list=PLVFwdndx21r7HzdqCq6pZbuJXtsyyjSc4&index=12",
		tags: ["three.js"],
		category: "textures-light",
	},
];
