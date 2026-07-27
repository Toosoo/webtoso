import { cva } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const chip = cva(
	"inline-flex shrink-0 items-center border px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
	{
		variants: {
			active: {
				true: "border-accent bg-accent text-white",
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
