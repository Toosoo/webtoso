import { hub } from "./hubData.js";
import { lessons } from "./lessons.js";
import "./global-style.css";

const btnBase =
	"inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:ring-sky-400";

const iconLink =
	"rounded-lg p-2.5 text-neutral-400 transition hover:bg-neutral-800/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(39,39,39)]";

function SocialLinks() {
	return (
		<nav
			className="fixed right-4 top-4 z-50 flex items-center gap-1 sm:right-6 sm:top-6"
			aria-label={hub.socialNavAriaLabel}
		>
			{hub.socialLinks.map(({ href, label, Icon }) => (
				<a
					key={href}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className={iconLink}
					aria-label={label}
				>
					<Icon className="h-5 w-5" aria-hidden />
				</a>
			))}
		</nav>
	);
}

function App() {
	const { lessonButton, youtubeButton, youtubeDisabledTitle } = hub.lessonCard;

	return (
		<div className="fixed inset-0 overflow-y-auto bg-[rgb(39,39,39)]">
			<SocialLinks />
			<div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
				<header className="mb-10 text-center">
					<h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
						{hub.title}
					</h1>
					<p className="mt-2 text-sm text-neutral-400 sm:text-base">
						{hub.subtitle}
					</p>
				</header>

				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{lessons.map((lesson) => (
						<li key={lesson.slug}>
							<article className="flex h-full flex-col rounded-2xl border border-neutral-700/80 bg-neutral-900/70 p-6 shadow-lg backdrop-blur-sm">
								<h2 className="text-lg font-semibold text-white">
									{lesson.title}
								</h2>
								{lesson.tags?.length ? (
									<ul className="mt-3 flex flex-wrap gap-2">
										{lesson.tags.map((tag) => (
											<li key={tag}>
												<span className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
													{tag}
												</span>
											</li>
										))}
									</ul>
								) : null}

								<div className="mt-6 flex flex-col gap-3 sm:flex-row">
									<a
										href={lesson.url}
										className={`${btnBase} bg-sky-600 text-white hover:bg-sky-500`}
									>
										{lessonButton}
									</a>
									{lesson.youtubeUrl ? (
										<a
											href={lesson.youtubeUrl}
											target="_blank"
											rel="noopener noreferrer"
											className={`${btnBase} border border-neutral-600 bg-neutral-800/80 text-neutral-100 hover:border-neutral-500 hover:bg-neutral-800`}
										>
											{youtubeButton}
										</a>
									) : (
										<button
											type="button"
											disabled
											title={youtubeDisabledTitle}
											className={`${btnBase} cursor-not-allowed border border-neutral-800 bg-neutral-900 text-neutral-500`}
										>
											{youtubeButton}
										</button>
									)}
								</div>
							</article>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
