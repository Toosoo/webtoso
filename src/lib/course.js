/** Two-digit display number: 1 -> "01". */
export const pad = (n) => String(n).padStart(2, "0");

function rangeOf(items) {
	const first = pad(items[0].number);
	const last = pad(items[items.length - 1].number);
	return first === last ? first : `${first}–${last}`;
}

/**
 * Derives everything the hub renders from the raw lesson list: display numbers,
 * category sections, per-category counts and number ranges.
 *
 * Nothing here is hand-maintained — adding a lesson to `lessons.js` updates the
 * numbering, the counts, the "ALL n" pill and the eyebrow on its own.
 */
export function buildCourse(lessons, categories) {
	const numbered = lessons.map((lesson, index) => ({
		...lesson,
		number: index + 1,
	}));

	const sections = categories
		.map(({ id, label }) => {
			const items = numbered.filter((lesson) => lesson.category === id);
			if (items.length === 0) return null;
			return {
				id,
				label,
				lessons: items,
				count: items.length,
				range: rangeOf(items),
			};
		})
		.filter(Boolean);

	if (import.meta.env.DEV) {
		const known = new Set(categories.map((category) => category.id));
		for (const lesson of numbered) {
			if (!known.has(lesson.category)) {
				console.warn(
					`[hub] lesson "${lesson.slug}" has category "${lesson.category}", which is not in hub.categories — it will not be rendered.`,
				);
			}
		}
	}

	return { lessons: numbered, sections, total: numbered.length };
}
