import { lessons } from "./lessons.js";

/**
 * Small fixed bar at the top of every lesson page: home button + lesson label.
 *
 * Loaded from each lesson's `index.html`, never from `main.js`, so the lesson
 * source stays pure teaching material. Styles are self-contained rather than
 * Tailwind classes so this module can't be broken by changes to global-style.css.
 */

const CSS = `
.lesson-chrome {
	position: fixed;
	top: 14px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1000;
	display: inline-flex;
	align-items: stretch;
	background: #efeeef;
	border: 1px solid rgb(0 0 0 / 0.12);
	box-shadow: 0 6px 20px rgb(0 0 0 / 0.2);
	color: #201e1c;
	font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
	-webkit-font-smoothing: antialiased;
}

.lesson-chrome__home {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 34px;
	color: inherit;
	transition: background-color 0.15s, color 0.15s;
}

.lesson-chrome__home:hover {
	background: #eae8e9;
	color: #ec3113;
}

.lesson-chrome__home:focus-visible {
	outline: 2px solid #201e1c;
	outline-offset: -2px;
}

.lesson-chrome__divider {
	width: 1px;
	background: rgb(0 0 0 / 0.12);
}

.lesson-chrome__label {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	height: 34px;
	padding: 0 13px;
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	white-space: nowrap;
}

.lesson-chrome__number {
	color: #ec3113;
	font-variant-numeric: tabular-nums;
}

.lesson-chrome__dot {
	color: rgb(0 0 0 / 0.3);
}

@media (max-width: 420px) {
	.lesson-chrome__label {
		letter-spacing: 0.12em;
		padding: 0 10px;
	}
}
`;

const HOME_ICON = `<svg viewBox="0 0 16 16" width="15" height="15" fill="none"
	stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">
	<path d="M2.2 6.9 8 2.3l5.8 4.6V13a.7.7 0 0 1-.7.7H2.9a.7.7 0 0 1-.7-.7z" />
</svg>`;

function mount() {
	const slug = location.pathname.match(/\/lessons\/([^/]+)/)?.[1];
	const index = lessons.findIndex((lesson) => lesson.slug === slug);

	if (index === -1) {
		if (import.meta.env.DEV) {
			console.warn(
				`[lessonChrome] no lesson in lessons.js matches folder "${slug}" — the bar was not rendered.`,
			);
		}
		return;
	}

	const lesson = lessons[index];
	const number = String(index + 1).padStart(2, "0");

	const style = document.createElement("style");
	style.textContent = CSS;
	document.head.append(style);

	const bar = document.createElement("nav");
	bar.className = "lesson-chrome";
	bar.setAttribute("aria-label", "Lesson navigation");
	bar.innerHTML = `
		<a class="lesson-chrome__home" href="/" aria-label="Back to the course index">
			${HOME_ICON}
		</a>
		<span class="lesson-chrome__divider"></span>
		<span class="lesson-chrome__label">
			<span class="lesson-chrome__number">Lesson ${number}</span>
			<span class="lesson-chrome__dot" aria-hidden="true">·</span>
			<span>${lesson.title}</span>
		</span>
	`;

	document.body.append(bar);
}

mount();
