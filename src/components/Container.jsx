import { cn } from "../lib/cn.js";

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
