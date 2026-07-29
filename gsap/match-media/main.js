import "@fontsource/anton";
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", (event) => {
  
    let container = document.getElementById("container");

  let mm = gsap.matchMedia(container);

  mm.add("(min-width:700px)", (context) => {
    gsap.to("img", {
      rotate: 360,
      repeat: -1,
      duration: 2,
      ease: "none",
    });
  },);

});
