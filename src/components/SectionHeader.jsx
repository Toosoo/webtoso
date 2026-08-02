export function SectionHeader({ headingId, label }) {
	return (
		<div className="flex items-center gap-4 bg-highlight px-4 py-3 sm:gap-6 sm:px-5">
			<h2
				id={headingId}
				className="font-display text-[1.0625rem] font-bold tracking-tight text-canvas uppercase sm:text-[1.75rem]"
			>
				{label}
			</h2>
		</div>
	);
}
