import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names, letting later Tailwind utilities win over earlier ones. */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
