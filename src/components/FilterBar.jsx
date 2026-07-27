import { hub } from "../hubData.js";
import { Chip } from "./Chip.jsx";
import { Label } from "./Label.jsx";

/**
 * Single-select category filter. `sections` already carries its own counts,
 * so nothing here is hand-numbered.
 */
export function FilterBar({ sections, active, total, onChange }) {
	return (
		<div className="-mx-4 mt-10 flex items-center gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			<Label className="shrink-0">{hub.filterLabel}</Label>
			<fieldset
				aria-label={hub.filterAriaLabel}
				className="flex items-center gap-2"
			>
				<Chip
					active={active === "all"}
					aria-pressed={active === "all"}
					onClick={() => onChange("all")}
				>
					{hub.allLabel} {total}
				</Chip>
				{sections.map((section) => (
					<Chip
						key={section.id}
						active={active === section.id}
						aria-pressed={active === section.id}
						onClick={() => onChange(section.id)}
					>
						{section.label} · {section.count}
					</Chip>
				))}
			</fieldset>
		</div>
	);
}
