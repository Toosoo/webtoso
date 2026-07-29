import { hub } from "../hubData.js";
import { itemNoun } from "../i18n.js";

export function SectionHeader({ headingId, range, label, count, sectionId }) {
	return (
		<div className="flex items-center gap-4 border border-hairline bg-surface px-4 py-3 sm:gap-6 sm:px-5">
			{/*
			 * `dir="ltr"` isolates the range from the surrounding RTL run. Without
			 * it the bidi algorithm reorders "01–05" to display as "05–01" on the
			 * Arabic hub — the digits are neutral and get swapped around the dash.
			 */}
			<span
				dir="ltr"
				className="shrink-0 text-[0.75rem] font-medium tracking-[0.14em] text-accent tabular-nums"
			>
				{range}
			</span>
			<h2
				id={headingId}
				className="font-display text-[1.0625rem] font-bold tracking-tight uppercase sm:text-[1.75rem]"
			>
				{label}
			</h2>
			<span className="ms-auto shrink-0 text-[0.75rem] text-muted sm:ms-0">
				{count} {itemNoun(hub.locale, count, sectionId)}
			</span>
		</div>
	);
}
