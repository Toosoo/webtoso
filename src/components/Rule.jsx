import { cn } from "../lib/cn.js";

export function Rule({ className }) {
	return <div aria-hidden className={cn("h-1 w-full bg-ink", className)} />;
}
