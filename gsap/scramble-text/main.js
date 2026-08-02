import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);

  gsap.to("h1", {
    text:{
      value:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, quis provident eos nesciunt ad molestias doloremque unde veniam officiis new.",
      type:"diff"
    },
    duration: 5,
  });
});
