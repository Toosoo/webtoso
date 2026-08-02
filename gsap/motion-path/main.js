import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

  const box = document.getElementById("box");
  const box2 = document.getElementById("path");

  const values = MotionPathPlugin.getRelativePosition(box,box2,{x:10,y:10},'auto')

  let tween = gsap.to(box, {
    duration: 1,
    x:values.x,
    y:values.y
  });


});
