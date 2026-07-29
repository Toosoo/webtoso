import "./style.css";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Stats from "stats.js";
import { Application, Container, Graphics } from "pixi.js";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


//*********************** lottie animation ************************** */ 


const canvas = document.querySelector("#dotlottie-canvas");
const line = document.querySelector("#line");

const dotLottie = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: canvas,
  /*
   * Runtime string, so Vite's module graph never sees it — the exact pattern
   * that leaves lab/image-sequence with 0 of 50 frames in dist/. It only
   * resolves because the file sits in public/ (decision 18), copied verbatim.
   */
  src: "/assets/lottie-scrolltrigger/bird.lottie",
});


// gsap.to(canvas, {
//   motionPath: {
//     path: line,
//     align: line,
//     alignOrigin: [0.5, 0.5],
//     autoRotate: true,
//   },
//   duration: 20,
//   ease: "none",
//   repeat:-1,
//   repeatDelay:5,
// });


//*********************** snow animation ************************** */ 


// var stats = new Stats();
// stats.showPanel(0);
// document.body.appendChild(stats.dom);
// stats.dom.style.transform = 'scale(3)';
// stats.dom.style.transformOrigin = 'top left';




// (async () => {
//     // Create a new application
//     const app = new Application();
  
//     await app.init({ background: "black", backgroundAlpha: 0, resizeTo: window });
//     document.querySelector("#pixi-canvas").appendChild(app.canvas);
  
//     const particleCount = 500;
//     const particles = [];
//     const wrapper = new Container();
//     app.stage.addChild(wrapper);
  
//     for (let i = 0; i < particleCount; i++) {
//       const size = gsap.utils.random(1, 5);
//       const particle = new Container();
//       const graphics = new Graphics().circle(0, 0, size).fill({ color: 0xfffff});
//       particle.addChild(graphics);
//       particle.x = (i * (100 / particleCount) * app.screen.width) / 100;
//       particle.y = -50;
//       wrapper.addChild(particle);
//       particles.push(particle);
//     }
  
//     gsap.to(particles, {
//       y: window.innerHeight,
//       duration: gsap.utils.random(2, 6),
//       ease: "none",
//       duration:()=> gsap.utils.random(8, 20),
//       stagger: {
//         amount: 5,
//         from: "random",
//         repeat: -1,
//         repeatDelay: 0,
//       },
//     });
//   })();



  
// function animate() {
// 	stats.begin();
// 	stats.end();
// 	requestAnimationFrame( animate );
// }

// requestAnimationFrame( animate );


//*********************** clouds animation ************************** */ 

// const clouds = document.querySelector("#clouds");
// const cloudsArray = [];
// for (let i = 0; i < 5; i++) {
//   const cloud = document.createElement("img");
//   cloud.src = "/assets/lottie-scrolltrigger/cloud.webp";
//   cloud.className = "cloud";
//   clouds.appendChild(cloud);
//   cloudsArray.push(cloud);
// }

// gsap.set(cloudsArray, {
//   x: (i) => gsap.utils.random(0, window.innerWidth),
//   y: (i) => gsap.utils.random(0, window.innerHeight - 300),
//   scale: () => gsap.utils.random(0.5, 2),
// });

// gsap.to(cloudsArray, {
//   keyframes:[
//     {x: (i) => gsap.utils.random(0,window.innerWidth)},
//     {x: (i) => gsap.utils.random(0,window.innerWidth)},
//     {x: (i) => gsap.utils.random(0,window.innerWidth)},
//     {x: (i) => gsap.utils.random(0,window.innerWidth)},
//   ],
//   duration:120,
//   ease: "none",
//   stagger: {
//     from: "random",
//     yoyo: true,
//     repeat: -1,
//     repeatDelay: 0,
//     yoyo:true
//   },
// });

//*********************** trees animation ************************** */ 

// const trees = document.querySelector("#trees");
// const treesArray = [];
// for (let i = 0; i < 10; i++) {
//   const tree = document.createElement("img");
//   tree.src = gsap.utils.random([
//     "/assets/lottie-scrolltrigger/tree1.webp",
//     "/assets/lottie-scrolltrigger/tree2.webp",
//     "/assets/lottie-scrolltrigger/tree3.webp",
//   ]);
//   tree.className = "tree";
//   trees.appendChild(tree);
//   treesArray.push(tree);
// }

// gsap.set(treesArray, {
//   x: (i) => gsap.utils.random(0, window.innerWidth),
//   y: (i) => gsap.utils.random(0, -50),
//   scale: () => gsap.utils.random(0.3, 0.8),
// });
