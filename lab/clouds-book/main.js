import "@fontsource/poppins";
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

  // clouds
  gsap.set(".cloud", {
    y: "random(0,500)",
    scale: "random(.1,.4)",
  });
  const windowWidth = window.innerWidth;
  gsap.fromTo(
    ".cloud",
    {
      x: `random(0,${windowWidth})`,
    },
    {
      x: `random(0,${windowWidth})`,
      duration: 20,
      ease: "none",
      stagger: {
        yoyo: true,
        repeat: -1,
      },
    }
  );

  // intro
  const introTL = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1.5 } });

  introTL.from("#heroElements",{
    clipPath:'inset(30% 20% 30% 20%)',
    delay :2
  }).from('#heroSection :is(h1,h2,p)',{
    clipPath:'inset(105% 0 0 0)',
    y:50,
    scale:.9
  },'<')

  // hero animations
  const heroTL = gsap
    .timeline({
      scrollTrigger: {
        trigger: "#heroSection",
        start: "top top",
        scrub: 1,
      },
    })
    .to("#heroSection :is(h1,h2,p)", {
      opacity: 0,
    })
    .to(
      ".large-cloud-1",
      {
        scale: 2,
      },
      0
    )
    .to(
      ".large-cloud-2",
      {
        scale: 2,
      },
      0
    )
    .to(
      ".branch-1",
      {
        y: 200,
      },
      0
    )
    .to(
      ".branch-2",
      {
        y: -200,
      },
      0
    )
    .to(
      ".branch-3",
      {
        y: -200,
      },
      0
    );

  // horizontal scroll

  const slides = gsap.utils.toArray(".slide");

  const HS = gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#horizontalSection",
      pin: true,
      start: "top top",
      end: `+=${slides.length * 1000}px`,
      scrub: 1,
      anticipatePin: 1,
      
    },
  });

  slides.forEach((e, i) => {
    const elements = e.querySelectorAll("h2,h3,p,img");

    if (i !== 0) {
      gsap.from(elements, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: e,
          start: "top center",
          containerAnimation: HS,
        },
      });
    }
  });

  // frames

  const frames = gsap.utils.toArray(".frame");
  gsap.set(frames, { zIndex: (i) => -i + 1 });

  const framesTl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: "#framesSection",
      start: "top top",
      end: `+=${frames.length * 1000}px`,
      pin: true,
      scrub: 1,

      snap:{
        snaptTo:1,
     
      }
    },
  });

  frames.forEach((e, i) => {
    if (i !== frames.length - 1) {
      framesTl.to(e, {
        clipPath: "inset(0 0 100% 0)",
      });
    }
  });
  
});
