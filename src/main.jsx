import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const root = document.getElementById("root");
const tree = (
	<StrictMode>
		<App />
	</StrictMode>
);

/** Built pages are prerendered by `plugins/prerender.js`; dev pages are not. */
if (root.hasChildNodes()) {
	hydrateRoot(root, tree);
} else {
	createRoot(root).render(tree);
}
