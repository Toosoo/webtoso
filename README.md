# webtoso

**كورسات تفاعلية بالعربي — three.js و GSAP**
Interactive three.js & GSAP courses, in Arabic.

Every lesson is a real page that runs in your browser, paired with a video
walkthrough on YouTube. The site is static, bilingual (`/ar` + `/en`), and has
no backend.

[YouTube](https://www.youtube.com/@webtoso) · [Telegram](https://t.me/webtoso) · [Instagram](https://www.instagram.com/not.toso)

---

## بالعربي

كورسات تفاعلية مجانية بالعربية في three.js و GSAP. كل درس صفحة شغالة تفتحها في
متصفحك وتجرّب فيها بنفسك، ومعاها الشرح بالفيديو على يوتيوب.

الموقع مقسوم لثلاثة أقسام:

- **كورس three.js** — من أول مكعب بيلف على الشاشة لحد مشهد كامل: الأشكال،
  الكاميرا، الخامات، الإضاءة.
- **كورس GSAP** — من أبسط tween لحد أنيميشن السكرول والإضافات: ScrollTrigger،
  SplitText، MorphSVG، Draggable وغيرها.
- **أمثلة** — مش دروس، دي شغل كامل ومتشطّب بيوري الحاجات دي وهي شغالة مع بعض.

المحتوى التقني (أسماء الدروس، الكود، أسماء المكتبات) بيفضل بالإنجليزي في
اللغتين — ده اللي بيتكتب فعلاً في الشغل، والبحث الحقيقي بيخلط اللغتين.

---

## In English

Free, interactive courses in three.js and GSAP, taught in Arabic. Each lesson is
a working page rather than a code listing — open it, change things, read the
source. The video sits one click behind it.

Three sections:

- **three.js course** — scene setup, geometry, cameras, materials, textures, lights
- **GSAP course** — tweens, timelines, scroll animation, and the plugin set
- **Lab** — finished demos rather than lessons

Lesson names, code and library names stay English in both locales; only the UI
chrome and the hub prose are translated.

---

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # -> dist/
pnpm check      # lint + build + post-build verification
```

## How it is put together

```
src/content/<section>.js    the manifest: slug, title, tags, category, video
src/                        the hub app (React) + the lesson chrome bar
threejs|gsap|lab/<slug>/    the lessons, one folder each — authored once
public/assets/<slug>/       lesson assets, namespaced per lesson
plugins/seo.js              per-page metadata, JSON-LD, sitemap, chrome injection
```

`src/content/index.js` is the spine. Entry points, SEO metadata, hreflang pairs,
the sitemap, the course indexes and the chrome bar all derive from it — adding a
lesson means a folder on disk and one entry in a content file.

Each lesson builds **once**, in place, at `/<section>/<slug>/` — the folder on
disk is the URL. Only the eight hub pages (the landing page and three course
indexes) exist per locale under `/ar` + `/en`; those generated trees are
gitignored — **never edit them.**

Built with [Vite](https://vite.dev), [Tailwind CSS](https://tailwindcss.com),
[GSAP](https://gsap.com) and [three.js](https://threejs.org). Deployed on Vercel.

## Contributing

This is the companion repo to a YouTube channel rather than a general-purpose
library, so it isn't looking for feature contributions — but corrections to a
lesson, a broken link or a typo are welcome as issues.

## License

The code is here to learn from — clone it, run it, lift snippets into your own
work. Republishing the courses or the site content as your own is not allowed.
See [LICENSE](LICENSE).

---

© [Ahmed Attia](https://www.youtube.com/@webtoso) — أحمد عطية
