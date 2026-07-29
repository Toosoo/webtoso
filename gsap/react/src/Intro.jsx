import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Intro = ({timeline}) => {
  const intro = useRef(null);

  useGSAP(
    () => {
      timeline &&
        timeline.to("div", {
          xPercent: gsap.utils.wrap([-100, 100]),
          duration: 2,
          ease: "expo.inOut",
        });
    },
    { scope: intro, dependencies: [timeline] }
  );

  return (
    <div
      ref={intro}
      className="fixed z-100 top-0 left-0 size-full  pointer-events-none flex flex-col items-center justify-center"
    >
      <div className="bg-red-500 w-full grow"></div>
      <div className="bg-red-500 w-full grow"></div>
      <div className="bg-red-500 w-full grow"></div>
      <div className="bg-red-500 w-full grow"></div>
    </div>
  );
};

export default Intro;
