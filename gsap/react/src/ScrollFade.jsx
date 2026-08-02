import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollFade = ({ children }) => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(container.current, {
        y: 100,
        autoAlpha: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          markers: true,
        },
      });
    },
    { scope: container }
  );

  return <div ref={container}>{children}</div>;
};

export default ScrollFade;
