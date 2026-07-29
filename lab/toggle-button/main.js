import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(CustomEase, CustomWiggle);

  const button = document.getElementById("button");
  const shape = document.getElementById("shape");
  const bg = document.getElementById("bg");

  const limbs = gsap.utils.toArray("#limb-1, #limb-2, #limb-3, #limb-4");
  const eyes = gsap.utils.toArray("#eye-1, #eye-2");

  let played = true;
  gsap.set(limbs, {
    transformOrigin: "top",
  });
  const animate = () => {
    gsap.to(shape, {
      x: played ? -220 : 0,
      duration: 2,
      ease: "elastic",
      overwrite: true,
    });

    gsap.fromTo(
      limbs,
      {
        rotate: 0,
      },
      {
        keyframes: {
          "75%": { rotate: played ? -60 : 60 },
          "100%": { rotate: 0 },
          easeEach: "wiggle(8)",
        },
        duration: 4,
        overwrite: true,
      }
    );

    played = !played;
  };

  button.addEventListener("click", animate);

  let xSetter = gsap.utils.pipe(
    gsap.utils.mapRange(0, window.innerWidth, -10, 10),
    gsap.quickSetter(eyes, "x", "px")
  );
  let ySetter = gsap.utils.pipe(
    gsap.utils.mapRange(0, window.innerHeight, -10, 10),
    gsap.quickSetter(eyes, "y", "px")
  );

  window.addEventListener("mousemove", (e) => {
    xSetter(e.clientX);
    ySetter(e.clientY);
  });
});
