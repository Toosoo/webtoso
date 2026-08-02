import { hub } from "./hubData.js";
import { CourseIndex } from "./pages/CourseIndex.jsx";
import { Landing } from "./pages/Landing.jsx";
import "./styles/hub.css";

/** No router: every page is a static HTML entry, so the shape comes from the path. */
function App() {
	const section = hub.sections.find((item) => item.id === hub.route.section);

	return section ? <CourseIndex section={section} /> : <Landing />;
}

export default App;
