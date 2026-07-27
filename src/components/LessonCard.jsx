import { SiYoutube } from "react-icons/si";
import { hub } from "../hubData.js";
import { cn } from "../lib/cn.js";
import { pad } from "../lib/course.js";
import { IconButton } from "./IconButton.jsx";
import { Label } from "./Label.jsx";
import { Tag } from "./Tag.jsx";

/**
 * One lesson, in two layouts from a single DOM: a row on phones, a card from
 * `sm` up. The whole card is clickable via the title link's ::after overlay,
 * which keeps the markup to one <a> per destination and no click handlers.
 *
 * `media` fills the empty area on the card layout — pass a thumbnail later and
 * nothing else has to change.
 */
export function LessonCard({ lesson, media }) {
	const blush = lesson.number % 3 === 0;
	const watchLabel = hub.lessonCard.watchLabel.replace("{title}", lesson.title);

	return (
		<article
			className={cn(
				"group relative h-full transition duration-150",
				blush ? "bg-blush" : "bg-surface",
				"sm:border sm:border-hairline sm:hover:-translate-y-0.5 sm:hover:border-ink sm:hover:shadow-[0_6px_16px_rgb(0_0_0/0.07)]",
			)}
		>
			<div className="flex items-center gap-4 py-4 pr-14 pl-4 sm:block sm:px-5 sm:pt-4 sm:pr-5 sm:pb-5">
				<Label className="shrink-0 tabular-nums">
					<span className="hidden sm:inline">Lesson </span>
					{pad(lesson.number)}
				</Label>

				<div className="min-w-0">
					{media ?? <div aria-hidden className="hidden sm:block sm:h-22" />}

					<h3 className="font-display text-[1.0625rem] leading-tight font-bold sm:text-[1.375rem]">
						<a
							href={lesson.url}
							className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
						>
							{lesson.title}
						</a>
					</h3>

					{lesson.tags?.length ? (
						<ul className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
							{lesson.tags.map((tag) => (
								<li key={tag}>
									<Tag>{tag}</Tag>
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>

			{lesson.youtubeUrl ? (
				<IconButton
					as="a"
					size="sm"
					tone="accent"
					href={lesson.youtubeUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={watchLabel}
					className="absolute top-1/2 right-4 z-10 -translate-y-1/2 sm:top-4 sm:right-5 sm:translate-y-0"
				>
					<SiYoutube className="size-3.5" aria-hidden />
				</IconButton>
			) : null}
		</article>
	);
}
