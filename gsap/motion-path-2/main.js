import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

  const p1 = document.getElementById("parent1");

  const p1child1 = document.getElementById("p1-child1");
 
  const p2 = document.getElementById("parent2");

  const p2child1 = document.getElementById("p2-child1");


  const xy = { x: 320, y: 0 };


  gsap.set(p1,{scale:.8,rotate:-20})
  gsap.set(p1child1,{x:100,y:90,rotate:-20})
  gsap.set(p2,{scale:1.3,rotate:20})
  gsap.set(p2child1,{x:100,y:90,rotate:20})

  


   const RP = MotionPathPlugin.getRelativePosition(p2child1,p1child1,[1,0],[1,1]);

   gsap.to(p2child1,{
    x:"+="+ RP.x,
    y:"+="+ RP.y,
   })

   

});
