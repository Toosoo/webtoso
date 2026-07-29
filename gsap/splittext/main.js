import "@fontsource/poppins";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(SplitText);

  document.fonts.ready.then(() => {

    const split = SplitText.create("h1", {
      type: "chars",
      aria:"none"
    });
    
  });
});
