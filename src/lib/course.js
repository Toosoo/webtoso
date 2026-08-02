/** Two-digit display number: 1 -> "01". */
export const pad = (n) => String(n).padStart(2, "0");

/** Numbering is per-section, so every course starts at 01. */
export function buildCourse(lessons, categories, sectionId) {
	const numbered = lessons.map((lesson, index) => ({
		...lesson,
		number: index + 1,
		section: sectionId,
		url: `/${sectionId}/${lesson.slug}/`,
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
			};
		})
		.filter(Boolean);

	if (import.meta.env.DEV) {
		const known = new Set(categories.map((category) => category.id));
		for (const lesson of numbered) {
			if (!known.has(lesson.category)) {
				console.warn(
					`[hub] "${sectionId}/${lesson.slug}" has category "${lesson.category}", which is not in i18n.sections.${sectionId}.categories — it will not be rendered.`,
				);
			}
		}
	}

	return { lessons: numbered, sections, total: numbered.length };
}
