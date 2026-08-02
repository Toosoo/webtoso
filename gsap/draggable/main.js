import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  
   Draggable.create('#lego',{
    inertia:true,
    bounds:"#container",
    liveSnap: {
      x: [0, 300],
      y: [0, 300],
    },
  })

});
