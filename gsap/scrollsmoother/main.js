import "@fontsource/anton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollSmoother.create({
    smooth: 2,
    ignoreMobileResize: true,
    normalizeScroll: true,
  });

  ScrollTrigger.config({ ignoreMobileResize: true });
  ScrollTrigger.normalizeScroll(true);

  const tl = gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: "#container",
        start: "top top",
        end: "+=900px",
        scrub: true,
        markers: true,
        pin: true,
      },
    })

    .to("#white", {
      x: 500,
      rotate: 360,
    })

    .to(
      "#blue",
      {
        x: 500,
        rotate: 360,
      },
      0
    );
});
