import { cn } from "../lib/cn.js";

/** Static technology pill on a lesson card. Translucent so it tints with the card. */
export function Tag({ className, children }) {
	return (
		<span
			className={cn(
				"inline-flex items-center bg-white/30 px-2 py-1 text-[0.6875rem] leading-none text-muted",
				className,
			)}
		>
			{children}
		</span>
	);
}
