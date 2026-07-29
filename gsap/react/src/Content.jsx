import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Content = () => {
  const content = useRef(null);

  return (
    <p ref={content} className="text-center text-2xl max-w-[700px]">
      It’s not about breaking out — it’s about mastering what’s inside. Your box might hold the
      exact tools you need. Own it, refine it, and make it unstoppable.
    </p>
  );
};

export default Content;
