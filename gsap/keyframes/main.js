import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".box", {
    keyframes: [
      { x: 100,rotate:30,},
      { y: 100,rotate:-30},
      {x:0},
      {y:0},
    ],
    scrollTrigger:{
      trigger:"svg",
      start:"center center",
      end:"+=1000",
      scrub:true,
      pin:true
    },
    transformOrigin:"center",
  });

 
});
