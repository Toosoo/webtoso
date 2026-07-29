import { Label } from "./Label.jsx";
import { Rule } from "./Rule.jsx";

/**
 * Shared masthead for the landing page and the three course indexes.
 *
 * Everything arrives as a prop rather than being read from `hub` directly,
 * because the two page shapes pull from different copy blocks — `home` and
 * `sections[id].index`. `count` is optional: the landing page shows courses,
 * not a lesson count.
 */
export function Hero({ eyebrow, heading, lines, count, noun }) {
	return (
		<div className="pt-10 sm:pt-14">
			<Label as="p">
				{eyebrow}
				{count === undefined ? null : ` — ${count} ${noun}`}
			</Label>
			<h1 className="mt-4 font-display text-[clamp(2.25rem,6.9vw,6.5rem)] leading-[0.85] font-bold tracking-[-0.045em] uppercase">
				{heading}
			</h1>
			<Rule className="mt-5" />
			<div className="mt-6 max-w-2xl space-y-3 text-[0.9375rem] leading-relaxed text-ink/85">
				{lines.map((line) => (
					<p key={line}>{line}</p>
				))}
			</div>
		</div>
	);
}
