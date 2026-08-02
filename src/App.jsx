import { hub } from "./hubData.js";
import { CourseIndex } from "./pages/CourseIndex.jsx";
import { Landing } from "./pages/Landing.jsx";
import "./styles/hub.css";

/**
 * Two page shapes, one bundle, no router.
 *
 * Every page on this site is a real static HTML entry, so there is nothing to
 * route — the shape is read from the path that Vercel already served.
 * `hub.route.section` is null on `/<locale>/` and the section id on
 * `/<locale>/<section>/`. An unrecognised section falls back to the landing
 * page rather than rendering blank.
 */
function App() {
	const section = hub.sections.find((item) => item.id === hub.route.section);

	return section ? <CourseIndex section={section} /> : <Landing />;
}

export default App;
