import "@fontsource/anton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  
  ScrollTrigger.create({
    trigger: "#box1",
    start: "top center",
    end: "+=500",
    markers: true,
    fastScrollEnd:true,
    // onEnter:()=>console.log('enter'),
    // onLeave:()=>console.log('Leave'),
    // onEnterBack:()=>console.log('EnterBack'),
    // onLeaveBack:()=>console.log('LeavebACK'),

  });
});
