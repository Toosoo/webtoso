import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

  const heroBox = document.getElementById("hero-box");
  const box = document.getElementById("box");
  const box2 = document.getElementById("box2");
  const box3 = document.getElementById("box3");
  const number = document.getElementById("number");
  const white = document.getElementById("white");

  const centerArray = [0.5, 0.5];
  const xy = { x: 0, y: 0 };

  const co_1 = MotionPathPlugin.getRelativePosition(number, white,[.5,1],centerArray);
  
  // const co_1 = MotionPathPlugin.convertCoordinates(box, heroBox, xy);
  // const co_2 = MotionPathPlugin.convertCoordinates(box2, box, xy);
  // const co_3 = MotionPathPlugin.convertCoordinates(box3, box2, xy);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroBox,
      start: "top 100",
      endTrigger:box,
      end: "center center",
      scrub: 1,
    },
  });

  tl.to(number, {
    x: "+=" + co_1.x,
    y: "+=" + co_1.y,
  })

});
