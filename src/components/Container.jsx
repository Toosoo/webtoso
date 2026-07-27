import { cn } from "../lib/cn.js";

/** Page gutter + max width. Every full-bleed band uses this to line up. */
export function Container({ className, children }) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[1480px] px-4 sm:px-8 lg:px-12",
				className,
			)}
		>
			{children}
		</div>
	);
}
