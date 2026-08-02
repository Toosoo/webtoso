import reactLogo from "./assets/react.svg";
import { useRef } from "react";
import "./App.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
  const element = useRef(null);

  // useGSAP((context, contextSafe) => {
  //   gsap.to(".logo-1", { rotate: 360 });

  //   const animate = contextSafe(() => {
  //     gsap.to(".logo-2", { rotate: 360 });
  //     console.log(context.data.length);
  //   });

  //   element.current.addEventListener("click", animate);
  //   console.log(context.data.length);

  //   return () => {
  //     element.current.removeEventListener("click", animate);
  //   };
  // });
  const { contextSafe } = useGSAP();
  const animate = contextSafe(() => {
    gsap.to(".logo-2", { rotate: 360 });
  });

  return (
    <>
      <div>
        <img src={reactLogo} className="logo logo-1" />
      </div>

      <img onClick={animate} src={reactLogo} ref={element} className="logo logo-2" />
    </>
  );
}

export default App;
