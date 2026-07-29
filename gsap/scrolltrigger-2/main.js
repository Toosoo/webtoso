import "@fontsource/anton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

 ScrollTrigger.create({
    trigger: "#element",
    start: "top top",
    endTrigger:"#red",
    end: "top top",
    pin:true,
    pinSpacing:false,
  })
 
});
