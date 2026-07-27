import { hub } from "../hubData.js";
import { Container } from "./Container.jsx";
import { SocialLinks } from "./SocialLinks.jsx";

export function TopBar() {
	return (
		<header className="sticky top-0 z-50 border-b border-hairline bg-surface">
			<Container className="flex h-16 items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<span className="size-3.5 bg-accent" aria-hidden />
					<span className="font-display text-[0.8125rem] font-bold tracking-[0.16em] uppercase">
						{hub.brand}
					</span>
				</div>
				<SocialLinks />
			</Container>
		</header>
	);
}
