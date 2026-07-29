import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Title = () => {
  const title = useRef(null);
  return (
    <div ref={title}>
      <h1 className="text-5xl lg:text-9xl capitalize text-center ">
        Think inside <br /> the box.
      </h1>
    </div>
  );
};

export default Title;
