import { hub } from "../hubData.js";
import { Label } from "./Label.jsx";
import { Rule } from "./Rule.jsx";

export function Hero({ total }) {
	return (
		<div className="pt-10 sm:pt-14">
			<Label as="p">
				{hub.eyebrow} — {total} lessons
			</Label>
			<h1 className="mt-4 font-display text-[clamp(2.25rem,6.9vw,6.5rem)] leading-[0.85] font-bold tracking-[-0.045em] uppercase">
				{hub.title}
			</h1>
			<Rule className="mt-5" />
			<div className="mt-6 max-w-2xl space-y-1 text-[0.9375rem] leading-relaxed text-ink/85">
				{hub.subtitle.map((line) => (
					<p key={line}>{line}</p>
				))}
			</div>
		</div>
	);
}
