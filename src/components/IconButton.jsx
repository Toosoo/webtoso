import { cva } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const iconButton = cva(
	"inline-flex shrink-0 items-center justify-center border border-hairline text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
	{
		variants: {
			size: {
				md: "size-9",
				sm: "size-7",
			},
			tone: {
				default: "hover:border-ink hover:bg-canvas",
				accent: "hover:border-accent hover:text-accent",
			},
		},
		defaultVariants: { size: "md", tone: "default" },
	},
);

export function IconButton({
	as: Comp = "button",
	size,
	tone,
	className,
	...props
}) {
	const typeProp = Comp === "button" ? { type: "button" } : {};
	return (
		<Comp
			className={cn(iconButton({ size, tone }), className)}
			{...typeProp}
			{...props}
		/>
	);
}
