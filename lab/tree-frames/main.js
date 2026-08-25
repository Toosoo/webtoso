import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const videoFrames = [];

  // //adding video frames to the array
  for (let i = 1; i <= 60; i++) {
    videoFrames.push(`/assets/tree-frames/frame_${i}.avif`);
  }

  // console.log(videoFrames);

  imageSequenceV2({
    urls: videoFrames, // Array of image URLs
    canvas: "#tree-frames", // <canvas> object to draw images to
    fullscreen: true, // match the drawing buffer to the size CSS gives the canvas
    scrollTrigger: {
      start: 0,   // start at the very top
      end: "max", // entire page
      scrub: true // important!
    }
  });

  // دية مختلفة كتير عن الاصلية بتاعتهم فيه تعديل بسيط علي الكانفاس و طريقة عرض الصور 
  function imageSequenceV2(config) {
    let canvas = gsap.utils.toArray(config.canvas)[0];
    if (!canvas) {
      throw new Error(`imageSequenceV2: no canvas matched "${config.canvas}"`);
    }

    let playhead = {frame: 0},
        ctx = canvas.getContext("2d"),
        onUpdate = config.onUpdate,
        painted = -1, // scrub fires far more often than the frame actually changes
        observer,
        images = config.urls.map((url, i) => {
          let img = new Image();
          //every frame redraws itself if it lands while it is the one on screen
          img.onload = () => i === Math.round(playhead.frame) && draw(true);
          img.src = url;
          return img;
        }),
        draw = function(force) {
          let frame = Math.round(playhead.frame),
              img = images[frame];
          if (!img.complete || (frame === painted && !force)) return;
          painted = frame;
          //scale the frame to cover the canvas, then centre it
          let scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight),
              w = img.naturalWidth * scale,
              h = img.naturalHeight * scale;
          ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
          onUpdate && onUpdate(frame);
        },
        resize = function() {
          let dpr = window.devicePixelRatio || 1,
              w = Math.round(canvas.clientWidth * dpr),
              h = Math.round(canvas.clientHeight * dpr);
          if (!w || !h || (canvas.width === w && canvas.height === h)) return;
          canvas.width = w;
          canvas.height = h;
          draw(true); // resizing wipes the bitmap, so redraw or it stays black until the next scroll
        };

    if (config.fullscreen) {
      resize();
      //catches the container resizing on its own, which window.resize does not
      observer = new ResizeObserver(resize);
      observer.observe(canvas);
    }

    let tween = gsap.to(playhead, {
      frame: images.length - 1,
      ease: "none",
      onUpdate: draw,
      scrollTrigger: config.scrollTrigger
    });

    return {
      tween,
      kill() {
        observer && observer.disconnect();
        tween.scrollTrigger && tween.scrollTrigger.kill();
        tween.kill();
      }
    };
  }
});
