import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
	gsap.to("#box", {
		x: 200,
		duration: 1,
		ease: "power2.out",
	});
});
