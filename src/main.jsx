import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { LOCALE_STORAGE_KEY, localeFromPath } from "./i18n.js";

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

/** The only place a locale is recorded — lesson URLs no longer carry one. */
try {
	localStorage.setItem(LOCALE_STORAGE_KEY, localeFromPath(location.pathname));
} catch {}
