/**
 * The category band on a course index.
 *
 * A solid `highlight` block rather than a bordered `surface` one: on the dark
 * canvas it is the only element that carries a bright fill, which is what makes
 * it read as a divider between category groups without needing a rule or a
 * count. The title flips to `canvas` (near-black) on it — 11.3:1.
 *
 * No hairline border: the fill already defines the edge.
 */
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
