import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, Observer);


  Observer.create({
    target: window,
    type:"wheel,touch,scroll,pointer",
    
    onDown: (self) => {
      console.log(self.deltaY,self.velocityY)
    },

  });
});
