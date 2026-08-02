import { gsap } from "gsap";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Physics2DPlugin, PhysicsPropsPlugin);

  const particleseffect = (event) => {
    const dotsCount = 50;
     

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      document.body.appendChild(dot);

      gsap.set(dot, {
        top: event.clientY,
        left: event.clientX,
        background: gsap.utils.random(['red','green','blue']),
        scale: 0,
      });

      const tl = gsap
        .timeline({onComplete:()=>dot.remove()})
        .to(dot, {
          scale: gsap.utils.random(.1,.8),
          duration: 0.1,
          ease: "power4",
        })
        .to(dot, {
          duration: 2,
          physics2D: {
            velocity: gsap.utils.random(300,900),
            angle: gsap.utils.random(-180,180),
            gravity: 1000,
          },
          opacity:0,
          ease:"none"
        });
    }
  };

  window.addEventListener("click", (event) => particleseffect(event));
});
