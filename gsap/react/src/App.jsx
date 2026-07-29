import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Title from "./Title";
import Visuals from "./Visuals";
import Content from "./Content";
import MouseFollower from "./MouseFollower";
import Intro from "./Intro";
import ScrollFade from "./ScrollFade";

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef(null);

  return (
    <section ref={container} className="relative overflow-hidden">
      <div className="h-screen"></div>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-10">
        {/* <Intro timeline={tl} /> */}
        <MouseFollower />
        <ScrollFade vars={{y:100}}>
          <Title />
        </ScrollFade>

        <Visuals />
        <Content />
      </div>

      <div className="h-screen"></div>

      <ScrollFade vars={{y:-100}}>
        <Title />
      </ScrollFade>

      <div className="h-screen"></div>
    </section>
  );
}

export default App;
