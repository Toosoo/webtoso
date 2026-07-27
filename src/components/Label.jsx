import { cn } from "../lib/cn.js";

/** Small letterspaced uppercase type: eyebrow, FILTER, LESSON 01. */
export function Label({ as: Comp = "span", className, children, ...props }) {
	return (
		<Comp
			className={cn(
				"text-[0.6875rem] font-medium tracking-[0.18em] text-muted uppercase",
				className,
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}
