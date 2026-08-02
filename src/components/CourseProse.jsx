import { Label } from "./Label.jsx";

/**
 * The indexable body of a course index page.
 *
 * Decision 13 puts all the site's prose in the hubs, because lesson pages carry
 * no text at all — so this block, on four pages per locale, is the whole SEO
 * surface. Headings are MSA and the body is Egyptian, per decision 17.
 */
export function CourseProse({ copy }) {
	return (
		<div className="mt-12 grid gap-10 border-t border-hairline pt-10 sm:mt-14 sm:grid-cols-2 sm:gap-12">
			<section aria-labelledby="learn-heading">
				<Label as="h2" id="learn-heading">
					{copy.learnHeading}
				</Label>
				<ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink/85">
					{copy.learn.map((point) => (
						<li key={point} className="flex gap-3">
							<span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent" />
							<span>{point}</span>
						</li>
					))}
				</ul>
			</section>

			<section aria-labelledby="prereq-heading">
				<Label as="h2" id="prereq-heading">
					{copy.prereqHeading}
				</Label>
				<p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink/85">
					{copy.prereq}
				</p>
			</section>
		</div>
	);
}
