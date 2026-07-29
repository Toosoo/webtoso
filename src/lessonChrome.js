import { allItems, itemFromPath } from "./content/index.js";
import { fill, localeFromPath, t } from "./i18n.js";

/**
 * Small fixed bar at the top of every lesson page.
 *
 *     ⌂ │ ‹  07 · KEYFRAMES  ›
 *
 * Left to right: up to the lesson's own course index, then back and forward
 * through that course. It is the only navigation a lesson page has — decision 13
 * leaves these pages with no prose and no video, so moving between them is most
 * of what the bar is for.
 *
 * No language switcher, deliberately (decision 23). It lives in `TopBar` on the
 * hub pages only: a lesson body is English in both locales by decision 6, so
 * switching locale here changes the direction of this bar and nothing else the
 * reader can see. The `alternate` tags `seo.js` emits still pair the two URLs
 * for search engines — that never depended on a control being on the page.
 *
 * Loaded from each lesson's `index.html`, never from `main.js`, so the lesson
 * source stays pure teaching material. Styles are self-contained rather than
 * Tailwind classes so this module can't be broken by changes to global-style.css
 * — which also means it renders identically on the two React lessons, the only
 * ones that don't load that file at all.
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
	/* Percent, not vw: the bar is fixed, so 100% is the viewport *without* the
	   scrollbar — and 12 of these lessons are scroll-driven. */
	max-width: calc(100% - 20px);
	background: #efeeef;
	border: 1px solid rgb(0 0 0 / 0.12);
	box-shadow: 0 6px 20px rgb(0 0 0 / 0.2);
	color: #201e1c;
	font-family: "Inter Variable", "Cairo Variable", ui-sans-serif, system-ui,
		sans-serif;
	-webkit-font-smoothing: antialiased;
}

/* Self-contained means the box model too: two lessons load no reset at all. */
.lesson-chrome,
.lesson-chrome * {
	box-sizing: border-box;
}

.lesson-chrome__home,
.lesson-chrome__step {
	display: inline-flex;
	flex: none;
	align-items: center;
	justify-content: center;
	color: inherit;
	text-decoration: none;
	transition: background-color 0.15s, color 0.15s;
}

a.lesson-chrome__home:hover,
a.lesson-chrome__step:hover {
	background: #eae8e9;
	color: #ec3113;
}

.lesson-chrome__home:focus-visible,
.lesson-chrome__step:focus-visible {
	outline: 2px solid #201e1c;
	outline-offset: -2px;
}

.lesson-chrome__home {
	width: 34px;
}

.lesson-chrome__step {
	width: 26px;
}

/* First item has no previous, last has no next: the slot stays, greyed out. */
.lesson-chrome__step--off {
	color: rgb(0 0 0 / 0.22);
}

/*
 * "Previous" points towards the start of the line, whichever way the line runs.
 * The bar declares its own dir, so its flex row already reverses under /ar —
 * the glyphs have to follow it or they contradict the order they sit in.
 */
.lesson-chrome[dir="rtl"] .lesson-chrome__chevron {
	transform: scaleX(-1);
}

.lesson-chrome__divider {
	width: 1px;
	flex: none;
	background: rgb(0 0 0 / 0.12);
}

.lesson-chrome__label {
	display: inline-flex;
	min-width: 0;
	align-items: center;
	gap: 7px;
	height: 34px;
	padding: 0 12px;
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	white-space: nowrap;
}

/*
 * The one part allowed to shrink. The bar is centred with a transform, so an
 * over-wide pill would hang off both edges and scroll the page sideways;
 * "ScrollTrigger + MotionPath" plus both arrows and a locale label is already
 * close to that on a phone.
 */
.lesson-chrome__title {
	overflow: hidden;
	text-overflow: ellipsis;
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
		padding: 0 9px;
	}
}
`;

const HOME_ICON = `<svg viewBox="0 0 16 16" width="15" height="15" fill="none"
	stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">
	<path d="M2.2 6.9 8 2.3l5.8 4.6V13a.7.7 0 0 1-.7.7H2.9a.7.7 0 0 1-.7-.7z" />
</svg>`;

/** Drawn pointing left, i.e. correct for LTR; the CSS mirrors it under /ar. */
const chevron = (d) => `<svg class="lesson-chrome__chevron" viewBox="0 0 16 16"
	width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"
	stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
	<path d="${d}" />
</svg>`;

const PREV_ICON = chevron("M9.8 3.6 5.4 8l4.4 4.4");
const NEXT_ICON = chevron("M6.2 3.6 10.6 8l-4.4 4.4");

/**
 * Attribute-safe. Item titles are author-written and reach `aria-label` and
 * `title` now, not just a text node — and three of them carry an `&`
 * ("Debug (GUI & stats)").
 */
const esc = (value) =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

/**
 * The items either side of this one, within its own section.
 *
 * `number` is the 1-based position inside the section, so the item itself sits
 * at `number - 1` and its neighbours are one step out from there. Order comes
 * from the manifest array and nowhere else (decision 8), so reordering a course
 * reorders these links with it.
 *
 * Navigation stops at the section boundary on purpose: the step after the last
 * GSAP lesson is the end of that course, not the first lab demo.
 */
function neighbours(item) {
	const siblings = allItems.filter(
		(sibling) => sibling.section === item.section,
	);

	return {
		prev: siblings[item.number - 2] ?? null,
		next: siblings[item.number] ?? null,
	};
}

/**
 * One arrow. A missing neighbour still renders — greyed, and hidden from screen
 * readers — so the bar keeps the same shape from the first item to the last.
 */
function step(item, locale, icon, template) {
	if (!item) {
		return `<span class="lesson-chrome__step lesson-chrome__step--off" aria-hidden="true">${icon}</span>`;
	}

	const label = esc(fill(template, { title: item.title }));

	return `<a class="lesson-chrome__step" href="/${locale}${item.url}"
		aria-label="${label}" title="${label}">${icon}</a>`;
}

function mount() {
	const locale = localeFromPath(location.pathname);
	const copy = t[locale];
	const lesson = itemFromPath(location.pathname);

	if (!lesson) {
		if (import.meta.env.DEV) {
			console.warn(
				`[lessonChrome] nothing in src/content matches "${location.pathname}" — the bar was not rendered.`,
			);
		}
		return;
	}

	const { prev, next } = neighbours(lesson);
	const number = String(lesson.number).padStart(2, "0");

	const style = document.createElement("style");
	style.textContent = CSS;
	document.head.append(style);

	const bar = document.createElement("nav");
	bar.className = "lesson-chrome";
	bar.setAttribute("aria-label", copy.lessonNavAriaLabel);
	/**
	 * The document stays LTR on lesson pages so the demo isn't flipped, so the
	 * bar has to declare its own direction — it is the only translated text on
	 * the page.
	 */
	bar.dir = copy.dir;
	bar.innerHTML = `
		<a class="lesson-chrome__home" href="/${locale}/${lesson.section}/" aria-label="${esc(copy.homeAriaLabel)}">
			${HOME_ICON}
		</a>
		<span class="lesson-chrome__divider"></span>
		${step(prev, locale, PREV_ICON, copy.prevAriaLabel)}
		<span class="lesson-chrome__label">
			<span class="lesson-chrome__number">${number}</span>
			<span class="lesson-chrome__dot" aria-hidden="true">·</span>
			<span class="lesson-chrome__title">${esc(lesson.title)}</span>
		</span>
		${step(next, locale, NEXT_ICON, copy.nextAriaLabel)}
	`;

	document.body.append(bar);
}

mount();
