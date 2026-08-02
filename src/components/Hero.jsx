import { Rule } from "./Rule.jsx";

export function Hero({ heading, lines }) {
	return (
		<div className="pt-10 sm:pt-14">
			<h1 className="font-display text-[clamp(2.25rem,6.9vw,6.5rem)] leading-[0.85] font-bold tracking-[-0.045em] uppercase">
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
