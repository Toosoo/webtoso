import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const root = document.getElementById("root");
const tree = (
	<StrictMode>
		<App />
	</StrictMode>
);

/**
 * Hydrate the markup `plugins/prerender.js` wrote, or mount from scratch.
 *
 * A built hub page arrives with its whole tree already in the HTML, so
 * `createRoot().render()` would throw all of it away and rebuild it — the
 * reader would see the page, then watch it repaint. `hydrateRoot` adopts it.
 *
 * Dev has no prerender step, so there the div really is empty, and hydrating an
 * empty container is a mismatch React would have to recover from on every page
 * load. Branching on the actual DOM keeps both paths honest, and means neither
 * one has to know which build produced the page.
 */
if (root.hasChildNodes()) {
	hydrateRoot(root, tree);
} else {
	createRoot(root).render(tree);
}
