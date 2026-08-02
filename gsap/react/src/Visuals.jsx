import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Visuals = () => {
  const visuals = useRef(null);

  return (
    <div ref={visuals}>
      <div className="relative">
        <img src="/grid.png" id="grid" className="max-w-[750px]" />
        <img
          id="man"
          src="/man.png"
          className="absolute w-[400px] bottom-[9px] left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default Visuals;
