import { hub } from "../hubData.js";
import { IconButton } from "./IconButton.jsx";

export function SocialLinks() {
	return (
		<nav
			aria-label={hub.socialNavAriaLabel}
			className="flex items-center gap-2"
		>
			{hub.socialLinks.map(({ href, label, Icon }) => (
				<IconButton
					key={href}
					as="a"
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={label}
				>
					<Icon className="size-4" aria-hidden />
				</IconButton>
			))}
		</nav>
	);
}
