import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, letting later Tailwind utilities win over earlier ones.
 * Lets any component accept a `className` prop that actually overrides.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
