import { LessonCard } from "./LessonCard.jsx";

export function LessonGrid({ lessons }) {
	return (
		<ul className="mt-4 divide-y divide-hairline border border-hairline sm:grid sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:border-0 lg:grid-cols-3 xl:grid-cols-4">
			{lessons.map((lesson) => (
				<li key={lesson.slug}>
					<LessonCard lesson={lesson} />
				</li>
			))}
		</ul>
	);
}
