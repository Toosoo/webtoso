import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.set("#box", {
    xPercent: -50,
    yPercent: -50,
  });

  let xSetter = gsap.quickSetter('#box',"x","px"),
   ySetter = gsap.quickSetter('#box',"y","px")

  window.addEventListener("mousemove", (e) => {
    
    xSetter(e.pageX)
    ySetter(e.pageY)

  });
});
