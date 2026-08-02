import { cn } from "../lib/cn.js";

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
