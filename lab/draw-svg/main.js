import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    smooth: 2,
  });

  gsap.from("#smooth-content svg path",{
    drawSVG:0,
    ease:'none',
    scrollTrigger:{
      trigger:"svg",
      start:"top top",
      end:"+=3000px",
      scrub:1,
      pin:true
    }
  })

});
