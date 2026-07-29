import { gsap } from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(MorphSVGPlugin, GSDevTools);
  let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  vw = (canvas.width = window.innerWidth),
  vh = (canvas.height = window.innerHeight);
  ctx.fillStyle = "#ccc";


  MorphSVGPlugin.defaultUpdateTarget = false
  MorphSVGPlugin.defaultRender = draw
  MorphSVGPlugin.defaultType = 'rotational'

  gsap.to("#shape1", {
    morphSVG: {
      shape: "#shape2",   
    },
    duration: 7,
  });

  GSDevTools.create();


  function draw(rawPath, target) {
    let l, segment, j, i;
    ctx.clearRect(0, 0, vw, vh);
    ctx.beginPath();
    for (j = 0; j < rawPath.length; j++) {
      segment = rawPath[j];
      l = segment.length;
      ctx.moveTo(segment[0], segment[1]);
      for (i = 2; i < l; i += 6) {
        ctx.bezierCurveTo(
          segment[i],
          segment[i + 1],
          segment[i + 2],
          segment[i + 3],
          segment[i + 4],
          segment[i + 5]
        );
      }
      if (segment.closed) {
        ctx.closePath();
      }
    }
    ctx.fill("evenodd");
  }
});



