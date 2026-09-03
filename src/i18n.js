/**
 * Every translated string on the site. Lesson names, library names and code
 * stay English in both locales.
 *
 * Imported by build code (vite.config.js, plugins/seo.js) and browser code
 * (lessonChrome.js, the hub components), so it must stay free of Node APIs.
 */

export const LOCALES = ["ar", "en"];

/** Used for the root redirect and as the fallback when a path has no prefix. */
export const DEFAULT_LOCALE = "ar";

/** Lesson URLs carry no locale: hub pages write this, the chrome bar reads it. */
export const LOCALE_STORAGE_KEY = "webtoso:locale";

export const t = {
	ar: {
		dir: "rtl",
		htmlLang: "ar",
		ogLocale: "ar_AR",

		siteName: "webtoso",
		brand: "webtoso",

		/** Shown on the switcher in the *other* locale's navbar. */
		localeName: "العربية",
		switchLocaleAriaLabel: "التبديل إلى اللغة الإنجليزية",

		/** The root landing page. Three course cards, no lesson grid. */
		home: {
			title: "كورسات أنيميشن و 3D للويب بالعربي — three.js و GSAP | webtoso",
			description:
				"كورسات مجانية بالعربي في three.js و GSAP. كل درس صفحة شغالة تفتحها في متصفحك وتقرا كودها كامل، ومعاها الشرح بالفيديو على يوتيوب.",
			heading: "كورسات أنيميشن و 3D للويب",
			subtitle: [
				"three.js و GSAP بالعربي، مجانية بالكامل.",
				"كل درس صفحة شغالة فعلاً — تفتحها، تقرا كود كل ملف فيها، وتنسخ اللي تحتاجه.",
				"والفيديو على يوتيوب بيمشي معاك خطوة بخطوة.",
			],
			cardCta: "افتح وجرّب",
		},

		filterLabel: "تصفية",
		filterAriaLabel: "تصفية الدروس حسب القسم",
		allLabel: "الكل",
		backHome: "كل الكورسات",
		backHomeAriaLabel: "العودة إلى كل الكورسات",

		/**
		 * One entry per section id in `content/index.js`. Category key order is
		 * the order of the filter chips. `itemDescription` is the meta template
		 * for that section's lesson pages and must name its own subject.
		 */
		sections: {
			threejs: {
				label: "كورس three.js",
				categories: {
					foundations: "الأساسيات",
					"textures-light": "الخامات والإضاءة",
					animations: "الانيميشن",
				},
				index: {
					title: "كورس three.js بالعربي — دروس تفاعلية مجانية | webtoso",
					description:
						"من أول مكعب على الشاشة لحد مشهد كامل بخاماته وإضاءته — كل درس مشهد شغال بكوده كامل قدامك.",
					heading: "كورس three.js بالعربي",
					intro: [
						"كورس three.js كامل بالعربي. هنبدأ من أول مكعب على الشاشة، وهنمشي خطوة خطوة لحد مشهد ثلاثي الأبعاد كامل بخاماته وإضاءته.",
						"كل درس صفحة شغالة فعلاً — تفتحها، تقرا كود كل ملف فيها، وتنسخ اللي تحتاجه. والفيديو على يوتيوب ماشي معاك خطوة بخطوة.",
					],
					learnHeading: "هتتعلم إيه",
					learn: [
						"إعداد المشهد: الكاميرا، الرندرر، وحلقة الرسم",
						"الأشكال والـ geometry، وبناء buffer geometry بنفسك",
						"التحكم في الكاميرا والتعامل مع تغيّر حجم الشاشة",
						"الخامات والـ materials وأنواعها",
						"أدوات الـ debug: lil-gui و stats.js",
						"الخامات المصوّرة (textures) وتحميلها بـ loading manager",
						"الإضاءة وأنواعها وتأثيرها على الخامات",
					],
					prereqHeading: "محتاج تعرف إيه قبلها",
					prereq:
						"JavaScript أساسي بس — متغيرات، دوال، و DOM. مش لازم تكون عارف أي حاجة عن الجرافيكس ولا رياضيات متقدمة، اللي محتاجه هتلاقيه متشرح أول بأول.",
				},
				itemDescription:
					"{title} — الدرس {n} من كورس three.js تفاعلي ومجاني بالعربية. شغّل المشهد مباشرة في متصفحك وشاهد الشرح بالفيديو.",
			},

			gsap: {
				label: "كورس GSAP",
				categories: {
					core: "الأساسيات",
					scroll: "السكرول",
					plugins: "الإضافات",
					react: "React",
				},
				index: {
					title: "كورس GSAP بالعربي — دروس تفاعلية مجانية | webtoso",
					description:
						"من أول tween لحد السكرول والإضافات اللي بتخلّيك تبص لموقع وتقول «إزاي عملوا ده» — كله شغال قدامك في المتصفح.",
					heading: "كورس GSAP بالعربي",
					intro: [
						"كورس GSAP كامل بالعربي. هنبدأ من أبسط tween، ونوصل لأنيميشن السكرول والإضافات اللي بتتعمل بيها المواقع اللي بتشوفها وتقول إزاي عملوا ده.",
						"كل درس صفحة شغالة تفتحها وتجرّب فيها بنفسك، وتقرا كودها كامل. والفيديو على يوتيوب ماشي معاك خطوة بخطوة.",
					],
					learnHeading: "هتتعلم إيه",
					learn: [
						"الأساسيات: tween، stagger، ease، timeline، و keyframes",
						"التحكم الدقيق: immediateRender، matchMedia، quickTo",
						"أنيميشن السكرول بـ ScrollTrigger و ScrollSmoother",
						"الإضافات: SplitText، MorphSVG، MotionPath، Draggable",
						"الفيزياء والحركة بـ Physics2D و Inertia",
						"استخدام GSAP جوه React بـ useGSAP",
					],
					prereqHeading: "محتاج تعرف إيه قبلها",
					prereq:
						"JavaScript أساسي و CSS. لو بتعرف تكتب selector وتغيّر property في CSS، تقدر تبدأ من أول درس على طول.",
				},
				itemDescription:
					"{title} — الدرس {n} من كورس GSAP تفاعلي ومجاني بالعربية. جرّب الأنيميشن مباشرة في متصفحك وشاهد الشرح بالفيديو.",
			},

			lab: {
				label: "أمثلة",
				/** The lab holds demos, not lessons. */
				itemWord: "مثال",
				/** Overrides LESSON_NOUN wherever a count is shown. Same six categories. */
				itemNoun: {
					zero: "أمثلة",
					one: "مثال",
					two: "مثالان",
					few: "أمثلة",
					many: "مثالًا",
					other: "مثال",
				},
				categories: {
					scroll: "السكرول",
					components: "مكونات",
					sites: "مواقع",
				},
				index: {
					title: "أمثلة تفاعلية بالعربي — three.js و GSAP | webtoso",
					description:
						"مش دروس — شغل كامل ومتشطّب بيوري الحاجات دي وهي شغالة مع بعض. افتح أي واحد واقرا الكود.",
					heading: "أمثلة تفاعلية",
					intro: [
						"دي مش دروس — دي أمثلة كاملة ومتشطّبة، كل واحدة بتوريك الحاجات اللي اتشرحت في الكورسات وهي شغّالة مع بعض.",
						"افتح أي مثال، جرّبه، واقرا كوده كامل ملف ملف.",
					],
					learnHeading: "فيه إيه هنا",
					learn: [
						"أنيميشن سكرول كامل من أول ما تنزل لحد آخر الصفحة",
						"مكوّنات صغيرة تقدر تاخدها وتستخدمها على طول",
						"مواقع كاملة مبنية من الصفر",
					],
					prereqHeading: "قبل ما تبدأ",
					prereq:
						"الأمثلة دي بتفترض إنك خدت أساسيات GSAP. لو لسه بتبدأ، ابدأ بكورس GSAP الأول وبعدين ارجعلها.",
				},
				itemDescription:
					"{title} — مثال تفاعلي مبني بـ GSAP بالعربية. افتحه مباشرة في متصفحك وشاهد الكود.",
			},
		},

		/** `{title}` is replaced with the lesson title, which stays English. */
		watchLabel: "شاهد {title} على يوتيوب",
		socialNavAriaLabel: "روابط التواصل",
		/** Screen-reader live region. `{noun}` comes from `itemNoun()`. */
		showingCount: "عرض {shown} من {total} {noun}",

		lessonNavAriaLabel: "التنقل بين الدروس",
		homeAriaLabel: "العودة إلى فهرس الدروس",

		/** Noun-free on purpose — the same bar renders over courses and the lab. */
		prevAriaLabel: "السابق: {title}",
		nextAriaLabel: "التالي: {title}",

		/** The bar's label only — the panel it opens is untranslated by design. */
		codeAriaLabel: "عرض كود الدرس",

		lessonWord: "الدرس",
	},

	en: {
		dir: "ltr",
		htmlLang: "en",
		ogLocale: "en_US",

		siteName: "webtoso",
		brand: "webtoso",

		localeName: "English",
		switchLocaleAriaLabel: "Switch to Arabic",

		home: {
			title: "Web animation & 3D courses in Arabic — three.js & GSAP | webtoso",
			description:
				"Free three.js and GSAP courses taught in Arabic. Every lesson runs in your browser with its full source on the page, plus a video walkthrough.",
			heading: "Web animation & 3D courses",
			subtitle: [
				"three.js and GSAP, taught in Arabic, free.",
				"Every lesson is a page that actually runs — open it, read the source of every file in it, and copy what you need.",
				"The video on YouTube walks you through it step by step.",
			],
			cardCta: "Open and try it",
		},

		filterLabel: "Filter",
		filterAriaLabel: "Filter lessons by category",
		allLabel: "All",
		backHome: "All courses",
		backHomeAriaLabel: "Back to all courses",

		sections: {
			threejs: {
				label: "three.js",
				categories: {
					foundations: "Foundations",
					"textures-light": "Textures & Lights",
					animations: "Animations",
				},
				index: {
					title: "three.js course — free interactive lessons | webtoso",
					description:
						"From a first cube on screen to a full scene with materials and lights — each lesson a scene that runs, with its full source on the page.",
					heading: "three.js course",
					intro: [
						"A complete three.js course. It starts with a single cube on screen and works step by step towards a full 3D scene with its own materials and lights.",
						"Every lesson is a page that actually runs — open it, read the source of every file in it, and copy what you need. The video walks you through it on YouTube.",
					],
					learnHeading: "What you'll learn",
					learn: [
						"Scene setup: camera, renderer and the render loop",
						"Geometry, and building a buffer geometry by hand",
						"Camera controls and handling viewport resizes",
						"Materials and how each type responds to light",
						"Debug tooling: lil-gui and stats.js",
						"Textures, and loading them through a loading manager",
						"Lights, their types, and how they read on a material",
					],
					prereqHeading: "What you need first",
					prereq:
						"Basic JavaScript — variables, functions, the DOM. No graphics background and no advanced maths required; the parts you need are explained as they come up.",
				},
				itemDescription:
					"{title} — lesson {n} of a free, interactive three.js course. Run the scene live in your browser and watch the video walkthrough.",
			},

			gsap: {
				label: "GSAP course",
				categories: {
					core: "Core",
					scroll: "Scroll",
					plugins: "Plugins",
					react: "React",
				},
				index: {
					title: "GSAP course — free interactive lessons | webtoso",
					description:
						"From your first tween to the scroll animation and plugins behind the sites that make you ask how they did that.",
					heading: "GSAP course",
					intro: [
						"A complete GSAP course. It starts with the simplest possible tween and reaches the scroll animation and plugins behind the sites that make you ask how they did that.",
						"Every lesson is a live page you can open and experiment in, with its full source on the page and the video on YouTube.",
					],
					learnHeading: "What you'll learn",
					learn: [
						"The core: tween, stagger, ease, timeline and keyframes",
						"Fine control: immediateRender, matchMedia, quickTo",
						"Scroll animation with ScrollTrigger and ScrollSmoother",
						"Plugins: SplitText, MorphSVG, MotionPath, Draggable",
						"Physics and momentum with Physics2D and Inertia",
						"Using GSAP inside React with useGSAP",
					],
					prereqHeading: "What you need first",
					prereq:
						"Basic JavaScript and CSS. If you can write a selector and change a property, you can start from the first lesson.",
				},
				itemDescription:
					"{title} — lesson {n} of a free, interactive GSAP course. Run the animation live in your browser and watch the video walkthrough.",
			},

			lab: {
				label: "Lab",
				itemWord: "Demo",
				itemNoun: { one: "demo", other: "demos" },
				categories: {
					scroll: "Scroll",
					components: "Components",
					sites: "Sites",
				},
				index: {
					title: "Interactive demos — three.js & GSAP | webtoso",
					description:
						"Not lessons — finished pieces showing everything working together. Open any of them and read the code.",
					heading: "Interactive demos",
					intro: [
						"These aren't lessons — they're finished pieces, each one showing the things taught in the courses working together.",
						"Open any demo, try it, and read its full source file by file.",
					],
					learnHeading: "What's here",
					learn: [
						"Full scroll animations, from the top of the page to the bottom",
						"Small components you can lift and reuse directly",
						"Complete sites built from scratch",
					],
					prereqHeading: "Before you start",
					prereq:
						"These assume you've covered the GSAP basics. If you're just starting, begin with the GSAP course.",
				},
				itemDescription:
					"{title} — an interactive demo built with GSAP. Open it live in your browser and read the code.",
			},
		},

		watchLabel: "Watch {title} on YouTube",
		socialNavAriaLabel: "Social links",
		showingCount: "Showing {shown} of {total} {noun}",

		lessonNavAriaLabel: "Lesson navigation",
		homeAriaLabel: "Back to the course index",

		prevAriaLabel: "Previous: {title}",
		nextAriaLabel: "Next: {title}",

		codeAriaLabel: "View lesson source",

		lessonWord: "Lesson",
	},
};

/** English has two plural forms, Arabic six — `Intl.PluralRules` picks. */
const LESSON_NOUN = {
	ar: {
		zero: "دروس",
		one: "درس",
		two: "درسان",
		few: "دروس",
		many: "درسًا",
		other: "درس",
	},
	en: { one: "lesson", other: "lessons" },
};

export const lessonNoun = (locale, count) => {
	const category = new Intl.PluralRules(locale).select(count);
	return LESSON_NOUN[locale][category] ?? LESSON_NOUN[locale].other;
};

/** A section overrides the whole plural table, not just the singular. */
export const itemNoun = (locale, count, sectionId) => {
	const table = t[locale].sections[sectionId]?.itemNoun ?? LESSON_NOUN[locale];
	const category = new Intl.PluralRules(locale).select(count);
	return table[category] ?? table.other;
};

/** `fill("شاهد {title}", { title: "Lights" })` → `"شاهد Lights"` */
export const fill = (template, values) =>
	Object.entries(values).reduce(
		(out, [key, value]) => out.replaceAll(`{${key}}`, value),
		template,
	);

/** `/ar/lessons/lights/` → `"ar"`. Falls back to DEFAULT_LOCALE. */
export const localeFromPath = (pathname) => {
	const first = pathname.split("/").filter(Boolean)[0];
	return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

export const otherLocale = (locale) =>
	LOCALES.find((candidate) => candidate !== locale) ?? DEFAULT_LOCALE;

/**
 * `("/ar/gsap/", "en")` → `"/en/gsap/"`. Works because slugs are ASCII and
 * identical in both locales, so the switcher lands on the counterpart page.
 */
export function switchLocalePath(pathname, toLocale) {
	const parts = pathname.split("/").filter(Boolean);
	const rest = LOCALES.includes(parts[0]) ? parts.slice(1) : parts;
	return `/${toLocale}/${rest.length ? `${rest.join("/")}/` : ""}`;
}

/** `/ar/threejs/lights/` → `{ section: "threejs", slug: "lights" }`. */
export function routeFromPath(pathname) {
	const parts = pathname.split("/").filter(Boolean);
	const rest = LOCALES.includes(parts[0]) ? parts.slice(1) : parts;
	return { section: rest[0] ?? null, slug: rest[1] ?? null };
}
