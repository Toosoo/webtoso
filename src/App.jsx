import { useState } from "react";
import { Container } from "./components/Container.jsx";
import { FilterBar } from "./components/FilterBar.jsx";
import { Hero } from "./components/Hero.jsx";
import { LessonGrid } from "./components/LessonGrid.jsx";
import { SectionHeader } from "./components/SectionHeader.jsx";
import { TopBar } from "./components/TopBar.jsx";
import { hub } from "./hubData.js";
import { lessons } from "./lessons.js";
import { buildCourse } from "./lib/course.js";
import "./styles/hub.css";

const course = buildCourse(lessons, hub.categories);

function App() {
	const [active, setActive] = useState("all");

	const sections =
		active === "all"
			? course.sections
			: course.sections.filter((section) => section.id === active);

	const shown = sections.reduce((count, section) => count + section.count, 0);

	return (
		<>
			<TopBar />
			<main>
				<Container className="pb-20">
					<Hero total={course.total} />

					<FilterBar
						sections={course.sections}
						active={active}
						total={course.total}
						onChange={setActive}
					/>

					<p aria-live="polite" className="sr-only">
						Showing {shown} of {course.total} lessons
					</p>

					{sections.map((section) => (
						<section
							key={section.id}
							aria-labelledby={`${section.id}-heading`}
							className="mt-8 sm:mt-10"
						>
							<SectionHeader
								headingId={`${section.id}-heading`}
								range={section.range}
								label={section.label}
								count={section.count}
							/>
							<LessonGrid lessons={section.lessons} />
						</section>
					))}
				</Container>
			</main>
		</>
	);
}

export default App;
