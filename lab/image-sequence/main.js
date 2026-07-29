import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const urls = [
    "/assets/image-sequence/Images/1.webp",
    "/assets/image-sequence/Images/2.webp",
    "/assets/image-sequence/Images/3.webp",
    "/assets/image-sequence/Images/4.webp",
    "/assets/image-sequence/Images/5.webp",
    "/assets/image-sequence/Images/6.webp",
    "/assets/image-sequence/Images/7.webp",
    "/assets/image-sequence/Images/8.webp",
    "/assets/image-sequence/Images/9.webp",
    "/assets/image-sequence/Images/10.webp",
    "/assets/image-sequence/Images/11.webp",
    "/assets/image-sequence/Images/12.webp",
    "/assets/image-sequence/Images/13.webp",
    "/assets/image-sequence/Images/14.webp",
    "/assets/image-sequence/Images/15.webp",
    "/assets/image-sequence/Images/16.webp",
    "/assets/image-sequence/Images/17.webp",
    "/assets/image-sequence/Images/18.webp",
    "/assets/image-sequence/Images/19.webp",
    "/assets/image-sequence/Images/20.webp",
    "/assets/image-sequence/Images/21.webp",
    "/assets/image-sequence/Images/22.webp",
    "/assets/image-sequence/Images/23.webp",
    "/assets/image-sequence/Images/24.webp",
    "/assets/image-sequence/Images/25.webp",
    "/assets/image-sequence/Images/26.webp",
    "/assets/image-sequence/Images/27.webp",
    "/assets/image-sequence/Images/28.webp",
    "/assets/image-sequence/Images/29.webp",
    "/assets/image-sequence/Images/30.webp",
    "/assets/image-sequence/Images/31.webp",
    "/assets/image-sequence/Images/32.webp",
    "/assets/image-sequence/Images/33.webp",
    "/assets/image-sequence/Images/34.webp",
    "/assets/image-sequence/Images/35.webp",
    "/assets/image-sequence/Images/36.webp",
    "/assets/image-sequence/Images/37.webp",
    "/assets/image-sequence/Images/38.webp",
    "/assets/image-sequence/Images/39.webp",
    "/assets/image-sequence/Images/40.webp",
    "/assets/image-sequence/Images/41.webp",
    "/assets/image-sequence/Images/42.webp",
    "/assets/image-sequence/Images/43.webp",
    "/assets/image-sequence/Images/44.webp",
    "/assets/image-sequence/Images/45.webp",
    "/assets/image-sequence/Images/46.webp",
    "/assets/image-sequence/Images/47.webp",
    "/assets/image-sequence/Images/48.webp",
    "/assets/image-sequence/Images/49.webp",
    "/assets/image-sequence/Images/50.webp",
  ];

  imageSequence({
    urls, // Array of image URLs
    canvas: "#image-sequence", // <canvas> object to draw images to
    scrollTrigger: {
      start: 0,   // start at the very top
      end: "max", // entire page
      scrub: true // important!
    }
  });

  function imageSequence(config) {
    let playhead = {frame: 0},
        ctx = gsap.utils.toArray(config.canvas)[0].getContext("2d"),
        onUpdate = config.onUpdate,
        images,
        updateImage = function() {
          ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
          onUpdate && onUpdate.call(this);
        };
      images = config.urls.map((url, i) => {
        let img = new Image();
        img.src = url;
        i || (img.onload = updateImage);
        return img;
      });
      return gsap.to(playhead, {
        frame: images.length - 1,
        ease: "none",
        onUpdate: updateImage,
        scrollTrigger: config.scrollTrigger
      });
  }
});
