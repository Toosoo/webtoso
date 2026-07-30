import { cva } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const chip = cva(
	"inline-flex shrink-0 items-center border px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
	{
		variants: {
			active: {
				/*
				 * Near-black on the accent, not white: this is 0.6875rem uppercase
				 * text, and white on the dark theme's lifted accent measures
				 * 3.19:1 — under AA for small text. `canvas` gives 6.06:1, and it
				 * matches the section header, which is the same dark-on-bright move.
				 */
				true: "border-accent bg-accent text-canvas",
				false: "border-hairline bg-surface text-ink hover:border-ink",
			},
		},
		defaultVariants: { active: false },
	},
);

/** Filter chip. Toggle semantics come from the caller via aria-pressed. */
export function Chip({ active, className, ...props }) {
	return (
		<button
			type="button"
			className={cn(chip({ active }), className)}
			{...props}
		/>
	);
}
