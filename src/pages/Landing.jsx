import { Container } from "../components/Container.jsx";
import { CourseCard } from "../components/CourseCard.jsx";
import { Hero } from "../components/Hero.jsx";
import { Label } from "../components/Label.jsx";
import { TopBar } from "../components/TopBar.jsx";
import { hub } from "../hubData.js";

export function Landing() {
	return (
		<>
			<TopBar />
			<main>
				<Container className="pb-20">
					<Hero heading={hub.home.heading} lines={hub.home.subtitle} />

					<section aria-labelledby="courses-heading" className="mt-12 sm:mt-16">
						<Label as="h2" id="courses-heading">
							{hub.home.coursesHeading}
						</Label>
						<ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{hub.sections.map((section) => (
								<li key={section.id}>
									<CourseCard section={section} count={section.items.length} />
								</li>
							))}
						</ul>
					</section>
				</Container>
			</main>
		</>
	);
}
