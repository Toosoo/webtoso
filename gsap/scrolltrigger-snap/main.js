import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // ScrollSmoother.create({
  //   smooth: 2,
  // });

  const tl = gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: "#container",
        start: "center center",
        end: "+=2000px",
        scrub: true,
        markers: true,
        pin: true,
        snap:{
          snapTo:1,
          // directional:false
          // delay:0
          // duration:{min:.1,max:10}
          ease:"power1.inOut"
        }
      },
    })

    .to("#white", {
      x: 1000,
      rotate: 360,
    })
    .addLabel("start")
    
    .to("#white", {
      x: 0,
      rotate: -360,
      scale: 1.5,
      backgroundColor: "yellow",
    })
    .addLabel("end")
});
