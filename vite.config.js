import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { seo } from "./plugins/seo.js";
import { lessons } from "./src/lessons.js";

const lessonInputs = Object.fromEntries(
	lessons.map((l) => [
		l.slug,
		resolve(__dirname, `lessons/${l.slug}/index.html`),
	]),
);

export default defineConfig({
	plugins: [react(), tailwindcss(), seo()],
	server: {
		port: 3000,
		host: true,
	},
	build: {
		rollupOptions: {
			input: {
				hub: resolve(__dirname, "index.html"),
				...lessonInputs,
			},
		},
	},
});
