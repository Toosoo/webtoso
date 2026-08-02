import { useState } from "react";
import { Container } from "../components/Container.jsx";
import { CourseProse } from "../components/CourseProse.jsx";
import { FilterBar } from "../components/FilterBar.jsx";
import { Hero } from "../components/Hero.jsx";
import { LessonGrid } from "../components/LessonGrid.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { TopBar } from "../components/TopBar.jsx";
import { homeUrl, hub } from "../hubData.js";
import { fill, itemNoun } from "../i18n.js";
import { buildCourse } from "../lib/course.js";

export function CourseIndex({ section }) {
	const course = buildCourse(section.items, section.categories, section.id);
	const [active, setActive] = useState("all");

	const groups =
		active === "all"
			? course.sections
			: course.sections.filter((group) => group.id === active);

	const shown = groups.reduce((sum, group) => sum + group.count, 0);

	return (
		<>
			<TopBar />
			<main>
				<Container className="pb-20">
					<a
						href={homeUrl}
						aria-label={hub.backHomeAriaLabel}
						className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
					>
						<span aria-hidden className="rtl:-scale-x-100">
							←
						</span>
						{hub.backHome}
					</a>

					<Hero heading={section.index.heading} lines={section.index.intro} />

					<CourseProse copy={section.index} />

					<FilterBar
						sections={course.sections.map((group) => ({
							id: group.id,
							label: group.label,
							count: group.count,
						}))}
						active={active}
						total={course.total}
						onChange={setActive}
					/>

					<p aria-live="polite" className="sr-only">
						{fill(hub.showingCount, {
							shown,
							total: course.total,
							noun: itemNoun(hub.locale, course.total, section.id),
						})}
					</p>

					{groups.map((group) => (
						<section
							key={group.id}
							aria-labelledby={`${group.id}-heading`}
							className="mt-8 sm:mt-10"
						>
							<SectionHeader
								headingId={`${group.id}-heading`}
								label={group.label}
							/>
							<LessonGrid lessons={group.lessons} />
						</section>
					))}
				</Container>
			</main>
		</>
	);
}
