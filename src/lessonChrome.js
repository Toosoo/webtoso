import { allItems, itemFromPath } from "./content/index.js";
import { fill, localeFromPath, t } from "./i18n.js";

/**
 * Small fixed bar at the top of every lesson page.
 *
 *     ⌂ │ ‹  07 · KEYFRAMES  ›
 *
 * Styles are self-contained rather than Tailwind, so it renders identically on
 * the two React lessons, which load no stylesheet at all.
 */

/* Colours are hand-copied from hub.css `@theme` — nothing syncs them. */
const CSS = `
.lesson-chrome {
	position: fixed;
	top: 14px;
	left: 50%;
	transform: translateX(-50%);
	/* lil-gui docks itself at 1001, and threejs/debug loads it. */
	z-index: 1002;
	display: inline-flex;
	align-items: stretch;
	/* Percent, not vw: the bar is fixed, so 100% is the viewport *without* the
	   scrollbar — and 12 of these lessons are scroll-driven. */
	max-width: calc(100% - 20px);
	background: #fcba28;
	/* Rim and shadow: the bar can land on any lesson background. */
	border: 1px solid rgb(15 13 14 / 0.18);
	box-shadow: 0 6px 20px rgb(0 0 0 / 0.28);
	color: #0f0d0e;
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
.lesson-chrome__step,
.lesson-chrome__code {
	display: inline-flex;
	flex: none;
	align-items: center;
	justify-content: center;
	color: inherit;
	text-decoration: none;
	transition: background-color 0.15s, color 0.15s;
}

a.lesson-chrome__home:hover,
a.lesson-chrome__step:hover,
.lesson-chrome__code:hover {
	background: #0f0d0e;
	color: #fcba28;
}

.lesson-chrome__home:focus-visible,
.lesson-chrome__step:focus-visible,
.lesson-chrome__code:focus-visible {
	outline: 2px solid #0f0d0e;
	outline-offset: -2px;
}

.lesson-chrome__home {
	width: 34px;
}

/* A <button> in a bar of links: it inherits none of the reset the others get. */
.lesson-chrome__code {
	width: 34px;
	padding: 0;
	border: 0;
	background: none;
	cursor: pointer;
	font: inherit;
}

.lesson-chrome__step {
	width: 26px;
}

/* First item has no previous, last has no next: the slot stays, greyed out. */
.lesson-chrome__step--off {
	color: rgb(15 13 14 / 0.35);
}

/* The bar's flex row reverses under /ar, so the glyphs have to follow. */
.lesson-chrome[dir="rtl"] .lesson-chrome__chevron {
	transform: scaleX(-1);
}

.lesson-chrome__divider {
	width: 1px;
	flex: none;
	background: rgb(15 13 14 / 0.18);
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

/* The one part allowed to shrink — an over-wide bar scrolls the page sideways. */
.lesson-chrome__title {
	overflow: hidden;
	text-overflow: ellipsis;
}

.lesson-chrome__number {
	font-weight: 700;
	font-variant-numeric: tabular-nums;
}

.lesson-chrome__dot {
	color: rgb(15 13 14 / 0.4);
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

/** Not mirrored under /ar: `</>` reads left-to-right in every locale. */
const CODE_ICON = `<svg viewBox="0 0 16 16" width="15" height="15" fill="none"
	stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
	stroke-linejoin="round" aria-hidden="true">
	<path d="M6 3.4 2.2 8 6 12.6M10 3.4 13.8 8 10 12.6" />
</svg>`;

/** Attribute-safe: titles reach `aria-label`, and some carry an `&`. */
const esc = (value) =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

/** Neighbours within this item's own section — navigation stops at the boundary. */
function neighbours(item) {
	const siblings = allItems.filter(
		(sibling) => sibling.section === item.section,
	);

	return {
		prev: siblings[item.number - 2] ?? null,
		next: siblings[item.number] ?? null,
	};
}

/** A missing neighbour still renders, greyed, so the bar keeps its shape. */
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
		<span class="lesson-chrome__divider"></span>
		<button type="button" class="lesson-chrome__code"
			aria-label="${esc(copy.codeAriaLabel)}" title="${esc(copy.codeAriaLabel)}">
			${CODE_ICON}
		</button>
	`;

	/** The panel and every lesson source stay unfetched until this fires. */
	bar
		.querySelector(".lesson-chrome__code")
		.addEventListener("click", async (event) => {
			const { openCode } = await import("./lessonCode.js");
			openCode(lesson, event.currentTarget);
		});

	document.body.append(bar);
}

mount();
