import { hub, sectionUrl } from "../hubData.js";
import { itemNoun } from "../i18n.js";
import { cn } from "../lib/cn.js";
import { Label } from "./Label.jsx";

/**
 * One course on the root landing page.
 *
 * The blurb reuses the section's meta `description` rather than adding a fourth
 * string per locale — it is already the one-sentence summary of the course, and
 * having the card and the search result say the same thing is a feature.
 */
export function CourseCard({ section, count, index }) {
	const blush = index % 3 === 2;

	return (
		<article
			className={cn(
				"group relative flex h-full flex-col transition duration-150",
				blush ? "bg-blush" : "bg-surface",
				"border border-hairline hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_6px_16px_rgb(0_0_0/0.07)]",
			)}
		>
			<div className="flex flex-1 flex-col p-5 sm:p-6">
				<Label className="tabular-nums">
					{count} {itemNoun(hub.locale, count, section.id)}
				</Label>

				<h3 className="mt-3 font-display text-[1.5rem] leading-tight font-bold sm:text-[1.875rem]">
					<a
						href={sectionUrl(section.id)}
						className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
					>
						{section.index.heading}
					</a>
				</h3>

				<p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink/85">
					{section.index.description}
				</p>

				<span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-accent">
					{hub.home.cardCta}
					{/* Arrow points along the reading direction, so it flips under RTL. */}
					<span aria-hidden className="rtl:-scale-x-100">
						→
					</span>
				</span>
			</div>
		</article>
	);
}
