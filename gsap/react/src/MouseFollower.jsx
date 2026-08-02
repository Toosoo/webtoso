import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const MouseFollower = () => {
  const xTo = useRef();
  const yTo = useRef();

  const { _, contextSafe } = useGSAP(() => {
    gsap.set("#follower", { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo("#follower", "x", {
      duration: 1,
      ease: "power4.out",
    });
    yTo.current = gsap.quickTo("#follower", "y", {
      duration: 1,
      ease: "power4.out",
    });
    


  });

  const animation = contextSafe((e) => {
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  });

  return (
    <div className="z-10 absolute inset-0 size-full " onMouseMove={(e) => animation(e)}>
      <div
        id="follower"
        className="rounded-full pointer-events-none fixed top-0 left-0 bg-black size-20"
      ></div>
    </div>
  );
};

export default MouseFollower;
