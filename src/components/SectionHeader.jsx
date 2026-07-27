export function SectionHeader({ headingId, range, label, count }) {
	return (
		<div className="flex items-center gap-4 border border-hairline bg-surface px-4 py-3 sm:gap-6 sm:px-5">
			<span className="shrink-0 text-[0.75rem] font-medium tracking-[0.14em] text-accent tabular-nums">
				{range}
			</span>
			<h2
				id={headingId}
				className="font-display text-[1.0625rem] font-bold tracking-tight uppercase sm:text-[1.75rem]"
			>
				{label}
			</h2>
			<span className="ml-auto shrink-0 text-[0.75rem] text-muted sm:ml-0">
				{count} {count === 1 ? "lesson" : "lessons"}
			</span>
		</div>
	);
}
