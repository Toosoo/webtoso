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
			title: "كورسات تفاعلية بالعربي — three.js و GSAP | webtoso",
			description:
				"كورسات تفاعلية مجانية بالعربية في three.js و GSAP. كل درس صفحة شغالة تفتحها في متصفحك، ومعها شرح بالفيديو.",
			heading: "كورسات تفاعلية بالعربي",
			subtitle: [
				"three.js و GSAP بالعربي، من أول خطوة لحد مشهد كامل منشور.",
				"كل درس بيشتغل في متصفحك على طول، والفيديو على بعد ضغطة.",
			],
			coursesHeading: "اختر كورس",
			cardCta: "افتح الكورس",
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
				},
				index: {
					title: "كورس three.js بالعربي — دروس تفاعلية مجانية | webtoso",
					description:
						"كورس three.js تفاعلي ومجاني بالعربية. من أول مكعب يدور إلى الخامات والإضاءة، وكل درس يعمل مباشرة في متصفحك ومعه شرح بالفيديو.",
					heading: "كورس three.js بالعربي",
					intro: [
						"كورس three.js كامل بالعربي. هنبدأ من أول مكعب بيلف على الشاشة، وهنمشي خطوة خطوة لحد ما تبقى قادر تعمل مشهد ثلاثي الأبعاد كامل وتنشره.",
						"كل درس هنا صفحة شغالة فعلاً — تفتحها، تلعب فيها، وتشوف الكود. والفيديو بيشرح الدرس على يوتيوب.",
					],
					learnHeading: "ما ستتعلمه",
					learn: [
						"إعداد المشهد: الكاميرا، الرندرر، وحلقة الرسم",
						"الأشكال والـ geometry، وبناء buffer geometry بنفسك",
						"التحكم في الكاميرا والتعامل مع تغيّر حجم الشاشة",
						"الخامات والـ materials وأنواعها",
						"الخامات المصوّرة (textures) وتحميلها بـ loading manager",
						"الإضاءة وأنواعها وتأثيرها على الخامات",
					],
					prereqHeading: "المتطلبات",
					prereq:
						"محتاج JavaScript أساسي بس — متغيرات، دوال، و DOM. مش لازم تكون عارف حاجة عن الجرافيكس أو الرياضيات المتقدمة، هنشرح اللي محتاجينه أول بأول.",
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
						"كورس GSAP تفاعلي ومجاني بالعربية. من الـ tween الأول إلى ScrollTrigger و SplitText و MorphSVG، وكل درس يعمل مباشرة في متصفحك.",
					heading: "كورس GSAP بالعربي",
					intro: [
						"كورس GSAP كامل بالعربي. هنبدأ من أبسط tween، ونوصل لأنيميشن السكرول والإضافات اللي بتتعمل بيها المواقع اللي بتشوفها وتقول إزاي عملوا ده.",
						"كل درس صفحة شغالة تفتحها وتجرّب فيها بنفسك، ومعاها الفيديو على يوتيوب.",
					],
					learnHeading: "ما ستتعلمه",
					learn: [
						"الأساسيات: tween، stagger، ease، و timeline",
						"التحكم الدقيق: immediateRender، matchMedia، quickTo",
						"أنيميشن السكرول بـ ScrollTrigger و ScrollSmoother",
						"الإضافات: SplitText، MorphSVG، MotionPath، Draggable",
						"الفيزياء والحركة بـ Physics2D و Inertia",
						"استخدام GSAP جوه React بـ useGSAP",
					],
					prereqHeading: "المتطلبات",
					prereq:
						"JavaScript أساسي و CSS. لو تعرف تكتب selector وتغيّر خاصية بالـ CSS، تقدر تبدأ من أول درس على طول.",
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
						"أمثلة تفاعلية جاهزة مبنية بـ GSAP و three.js: أنيميشن سكرول، مكوّنات، ومواقع كاملة. افتح أي مثال وجرّبه في متصفحك.",
					heading: "أمثلة تفاعلية",
					intro: [
						"دي مش دروس — دي أمثلة كاملة ومتشطّبة، كل واحد منها بيوري الحاجات اللي اتشرحت في الكورسات وهي شغّالة مع بعض.",
						"افتح أي مثال، جرّبه، واتفرّج على الكود.",
					],
					learnHeading: "ما ستجده هنا",
					learn: [
						"أنيميشن سكرول كامل من أول ما تنزل لحد آخر الصفحة",
						"مكوّنات صغيرة تقدر تاخدها وتستخدمها على طول",
						"مواقع كاملة مبنية من الصفر",
					],
					prereqHeading: "قبل ما تبدأ",
					prereq:
						"الأمثلة دي بتفترض إنك خدت أساسيات GSAP. لو لسه بتبدأ، ابدأ بكورس GSAP الأول.",
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
			title: "Interactive three.js & GSAP courses in Arabic | webtoso",
			description:
				"Free interactive courses in three.js and GSAP. Every lesson runs live in your browser and has a video walkthrough.",
			heading: "Interactive courses in Arabic",
			subtitle: [
				"three.js and GSAP, from the first step to a deployed scene.",
				"Every lesson runs in your browser; the video sits one click behind it.",
			],
			coursesHeading: "Pick a course",
			cardCta: "Open course",
		},

		filterLabel: "Filter",
		filterAriaLabel: "Filter lessons by category",
		allLabel: "All",
		backHome: "All courses",
		backHomeAriaLabel: "Back to all courses",

		sections: {
			threejs: {
				label: "three.js course",
				categories: {
					foundations: "Foundations",
					"textures-light": "Textures & Lights",
				},
				index: {
					title: "three.js course — free interactive lessons | webtoso",
					description:
						"A free, interactive three.js course. From a first rotating cube to textures and lights, with every lesson running live in your browser.",
					heading: "three.js course",
					intro: [
						"A complete three.js course. It starts with a single cube rotating on screen and works step by step towards a full 3D scene you can deploy.",
						"Every lesson here is a page that actually runs — open it, play with it, read the code. The video walks through it on YouTube.",
					],
					learnHeading: "What you'll learn",
					learn: [
						"Scene setup: camera, renderer and the render loop",
						"Geometry, and building a buffer geometry by hand",
						"Camera controls and handling viewport resizes",
						"Materials and how each type responds to light",
						"Textures, and loading them through a loading manager",
						"Lights, their types, and how they read on a material",
					],
					prereqHeading: "Prerequisites",
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
						"A free, interactive GSAP course. From your first tween to ScrollTrigger, SplitText and MorphSVG, with every lesson running live in your browser.",
					heading: "GSAP course",
					intro: [
						"A complete GSAP course. It starts with the simplest possible tween and reaches the scroll animation and plugins behind the sites that make you ask how they did that.",
						"Every lesson is a live page you can open and experiment in, with the video on YouTube.",
					],
					learnHeading: "What you'll learn",
					learn: [
						"The core: tween, stagger, ease and timeline",
						"Fine control: immediateRender, matchMedia, quickTo",
						"Scroll animation with ScrollTrigger and ScrollSmoother",
						"Plugins: SplitText, MorphSVG, MotionPath, Draggable",
						"Physics and momentum with Physics2D and Inertia",
						"Using GSAP inside React with useGSAP",
					],
					prereqHeading: "Prerequisites",
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
						"Finished interactive demos built with GSAP and three.js: scroll animation, components and full sites. Open any demo and run it in your browser.",
					heading: "Interactive demos",
					intro: [
						"These aren't lessons — they're finished pieces, each one showing the things taught in the courses working together.",
						"Open any demo, try it, and read the code.",
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
