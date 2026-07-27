import { cn } from "../lib/cn.js";

/** The heavy ink divider under the page title. */
export function Rule({ className }) {
	return <div aria-hidden className={cn("h-1 w-full bg-ink", className)} />;
}
