import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const smoother = ScrollSmoother.create({
    smooth: 2,
  });

  const slides = gsap.utils.toArray(".slide");

  const horizontalScroll = gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#horizontalSection",
      pin: true,
      start: "top top",
      end: `+=${slides.length * 1000}px`,
      scrub: true,
      anticipatePin: 1,
    },
  });

  slides.forEach((e) => {
    const img = e.querySelector("img");
    const containerWidth = gsap.getProperty(e, "width");
    const imgWidth = gsap.getProperty(img, "width");
    const distance = imgWidth - containerWidth;

    gsap.to(img, {
      x: -distance,
      scrollTrigger: {
        trigger: e,
        start: "top bottom",
        scrub: 2,

        containerAnimation: horizontalScroll,
      },
    });
  });
});
