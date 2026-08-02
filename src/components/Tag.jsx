import { cn } from "../lib/cn.js";

/**
 * Static technology pill on a lesson card. Translucent so it tints with the
 * card underneath — `/10` rather than the `/30` this carried on the light
 * theme, where a heavy white wash read as a lighter chip. On a dark card that
 * same wash lifted the chip to #5f5c5d and left `muted` at 2.44:1; `/10` keeps
 * the tint and restores it to 5.00:1.
 */
export function Tag({ className, children }) {
	return (
		<span
			className={cn(
				"inline-flex items-center bg-white/10 px-2 py-1 text-[0.6875rem] leading-none text-muted",
				className,
			)}
		>
			{children}
		</span>
	);
}
