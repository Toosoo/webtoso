/**
 * The source panel behind the chrome bar's `</>` button.
 *
 * Lazily imported: nothing in this file — including any lesson source — is
 * fetched until a reader asks for it.
 *
 * Untranslated on purpose. The panel is filenames and code, which stay English
 * in both locales (decision 6), so it renders LTR — and Arabic chrome sitting
 * left-aligned around English code reads as a bug.
 */
const COPY = {
	dialog: "Lesson source",
	copy: "Copy",
	copied: "Copied",
	failed: "Copy failed",
	close: "Close",
	shared: "shared",
};

/**
 * Root-anchored, so the generated `ar/` and `en/` trees never match. Non-eager,
 * so each file becomes its own chunk. `?raw` reads the file as authored, before
 * the SEO and chrome injection rewrite the page Vite builds.
 */
const SOURCES = import.meta.glob(
	[
		"/threejs/**/*.{html,js,jsx,css}",
		"/gsap/**/*.{html,js,jsx,css}",
		"/lab/**/*.{html,js,jsx,css}",
	],
	{ query: "?raw", import: "default" },
);

/**
 * 42 lessons `<link>` this file and set `class="lesson-canvas"` from it, so
 * without it both are dangling references in the code on screen.
 */
const SHARED = {
	name: "global-style.css",
	load: () => import("./global-style.css?raw").then((m) => m.default),
};

/** Everything else sorts alphabetically after these. */
const LEAD = ["main.js", "src/App.jsx", "index.html", "style.css"];

/* Colours are hand-copied from hub.css `@theme` — nothing syncs them. */
const CSS = `
/* Lesson stylesheets carry bare \`*\`, \`button\`, \`a\` and \`p\` selectors, and the
   two React lessons load no reset at all. Every property here is stated. */
.lesson-code,
.lesson-code * {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	color: inherit;
	background: none;
	letter-spacing: normal;
	text-transform: none;
	text-align: start;
}

.lesson-code {
	position: fixed;
	inset: 0;
	/* stats.js docks itself at 10000 and lil-gui at 1001. */
	z-index: 10001;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 12px;
	background: rgb(15 13 14 / 0.55);
	font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
	-webkit-font-smoothing: antialiased;
}

.lesson-code[hidden] {
	display: none;
}

.lesson-code__panel {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 980px;
	max-height: min(70vh, 640px);
	background: #0f0d0e;
	border: 1px solid rgb(255 255 255 / 0.14);
	box-shadow: 0 18px 50px rgb(0 0 0 / 0.5);
	color: #f9f4da;
}

.lesson-code__bar {
	display: flex;
	flex: none;
	align-items: stretch;
	gap: 8px;
	background: #1a1617;
	border-bottom: 1px solid rgb(255 255 255 / 0.14);
}

.lesson-code__tabs {
	display: flex;
	min-width: 0;
	flex: 1;
	overflow-x: auto;
	scrollbar-width: none;
}

.lesson-code__tabs::-webkit-scrollbar {
	display: none;
}

.lesson-code__tab {
	display: inline-flex;
	flex: none;
	align-items: center;
	gap: 6px;
	height: 36px;
	padding: 0 12px;
	cursor: pointer;
	color: #a39c93;
	font-size: 12px;
	font-family:
		ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
	white-space: nowrap;
	transition: color 0.15s, background-color 0.15s;
}

.lesson-code__tab:hover {
	color: #f9f4da;
}

.lesson-code__tab[aria-selected="true"] {
	background: #fcba28;
	color: #0f0d0e;
}

.lesson-code__shared {
	font-size: 9px;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	opacity: 0.65;
	font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
}

.lesson-code__action {
	display: inline-flex;
	flex: none;
	align-items: center;
	height: 36px;
	padding: 0 12px;
	cursor: pointer;
	color: #a39c93;
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	white-space: nowrap;
	transition: color 0.15s, background-color 0.15s;
}

.lesson-code__action:hover {
	background: #f9f4da;
	color: #0f0d0e;
}

.lesson-code__tab:focus-visible,
.lesson-code__action:focus-visible {
	outline: 2px solid #ff5436;
	outline-offset: -2px;
}

.lesson-code__body {
	flex: 1;
	min-height: 0;
	overflow: auto;
	/* Without this the panel hands its leftover scroll to the page, and the
	   scroll-driven lessons animate underneath. */
	overscroll-behavior: contain;
	padding: 14px 0;
}

.lesson-code__pre {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 16px;
	font-family:
		ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
	font-size: 12.5px;
	line-height: 1.65;
	tab-size: 2;
}

.lesson-code__num {
	padding-inline: 14px 0;
	color: #a39c93;
	opacity: 0.55;
	text-align: right;
	font-variant-numeric: tabular-nums;
	user-select: none;
}

/* One line is 2,615 characters (lab/toggle-button); another is 2,530. */
.lesson-code__line {
	padding-inline-end: 14px;
	white-space: pre-wrap;
	overflow-wrap: anywhere;
}

@media (max-width: 520px) {
	.lesson-code {
		padding: 0;
	}

	.lesson-code__panel {
		max-height: 78vh;
	}
}
`;

const esc = (value) =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

/** Lesson folder first, in teaching order, then the shared stylesheet. */
function filesFor(lesson) {
	const prefix = `/${lesson.section}/${lesson.slug}/`;
	const rank = (path) => {
		const index = LEAD.indexOf(path.slice(prefix.length));
		return index === -1 ? LEAD.length : index;
	};

	const own = Object.keys(SOURCES)
		.filter((path) => path.startsWith(prefix))
		.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
		.map((path) => ({
			name: path.slice(prefix.length),
			load: SOURCES[path],
			shared: false,
		}));

	return [...own, { ...SHARED, shared: true }];
}

/** The number column gives every row its height, so blank lines survive. */
function paint(pre, source) {
	const fragment = document.createDocumentFragment();

	source
		.replace(/\n$/, "")
		.split("\n")
		.forEach((line, index) => {
			const number = document.createElement("span");
			number.className = "lesson-code__num";
			number.textContent = String(index + 1);

			const text = document.createElement("span");
			text.className = "lesson-code__line";
			text.textContent = line;

			fragment.append(number, text);
		});

	pre.replaceChildren(fragment);
}

let ui = null;

function build() {
	const style = document.createElement("style");
	style.textContent = CSS;
	document.head.append(style);

	const root = document.createElement("div");
	root.className = "lesson-code";
	root.hidden = true;
	/** The document may be RTL under /ar; the code inside this panel never is. */
	root.dir = "ltr";
	root.innerHTML = `
		<div class="lesson-code__panel" role="dialog" aria-modal="true"
			aria-label="${esc(COPY.dialog)}">
			<div class="lesson-code__bar">
				<div class="lesson-code__tabs" role="tablist"></div>
				<button type="button" class="lesson-code__action" data-copy>${esc(COPY.copy)}</button>
				<button type="button" class="lesson-code__action" data-close
					aria-label="${esc(COPY.close)}">✕</button>
			</div>
			<div class="lesson-code__body">
				<pre class="lesson-code__pre"></pre>
			</div>
		</div>
	`;
	document.body.append(root);

	return {
		root,
		panel: root.querySelector(".lesson-code__panel"),
		tabs: root.querySelector(".lesson-code__tabs"),
		pre: root.querySelector(".lesson-code__pre"),
		copyButton: root.querySelector("[data-copy]"),
		files: [],
		current: null,
		source: "",
		opener: null,
	};
}

async function select(file) {
	ui.current = file;

	for (const tab of ui.tabs.children) {
		tab.setAttribute("aria-selected", String(tab.dataset.name === file.name));
	}

	ui.source = await file.load();
	if (ui.current === file) {
		paint(ui.pre, ui.source);
		ui.root.querySelector(".lesson-code__body").scrollTop = 0;
		ui.copyButton.textContent = COPY.copy;
	}
}

function close() {
	if (!ui || ui.root.hidden) return;
	ui.root.hidden = true;
	ui.opener?.focus();
}

/** A dialog over a canvas: without a trap, Tab walks into the demo behind it. */
function onKeydown(event) {
	if (!ui || ui.root.hidden) return;

	if (event.key === "Escape") {
		event.stopPropagation();
		close();
		return;
	}

	if (event.key !== "Tab") return;

	const focusable = ui.panel.querySelectorAll("button");
	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
}

export function openCode(lesson, opener) {
	if (!ui) {
		ui = build();

		ui.root.addEventListener("click", (event) => {
			if (event.target === ui.root) close();
		});
		ui.root.querySelector("[data-close]").addEventListener("click", close);
		ui.copyButton.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(ui.source);
				ui.copyButton.textContent = COPY.copied;
			} catch {
				ui.copyButton.textContent = COPY.failed;
			}
			setTimeout(() => {
				ui.copyButton.textContent = COPY.copy;
			}, 1600);
		});
		document.addEventListener("keydown", onKeydown, true);
	}

	if (!ui.files.length) {
		ui.files = filesFor(lesson);

		for (const file of ui.files) {
			const tab = document.createElement("button");
			tab.type = "button";
			tab.className = "lesson-code__tab";
			tab.dataset.name = file.name;
			tab.setAttribute("role", "tab");
			tab.setAttribute("aria-selected", "false");
			tab.textContent = file.name;

			if (file.shared) {
				const badge = document.createElement("span");
				badge.className = "lesson-code__shared";
				badge.textContent = COPY.shared;
				tab.append(badge);
			}

			tab.addEventListener("click", () => select(file));
			ui.tabs.append(tab);
		}

		select(ui.files[0]);
	}

	ui.opener = opener;
	ui.root.hidden = false;
	ui.root.querySelector("[data-close]").focus();
}
