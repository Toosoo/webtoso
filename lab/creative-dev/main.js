import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    DrawSVGPlugin,
    GSDevTools,
    Draggable,
    InertiaPlugin,
    MotionPathHelper,
    MotionPathPlugin,
    MorphSVGPlugin,
    Observer,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    CustomEase,
    CustomBounce,
    CustomWiggle
  );

  const servicesCards = gsap.utils.toArray("#services .card");
  const toSkew = gsap.quickTo(servicesCards, "skewY");
  const clamp = gsap.utils.clamp(-20, 20);

  // global
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    onUpdate: (self) => toSkew(clamp(self.getVelocity() / -40)),
    onStop: () => toSkew(0),
  });

  //  hero animations
  const linesContainer = document.getElementById("linesContainer");
  const linesArray = [...Array(70)];

  linesArray.forEach((_) => {
    const lineElement = document.createElement("div");
    lineElement.classList.add("line");
    linesContainer.appendChild(lineElement);
  });
  const lines = gsap.utils.toArray("#linesContainer .line");

  const hero = document.getElementById("hero");
  const follower = document.getElementById("mouseFollower");

  gsap.set(follower, { xPercent: -50, yPercent: -50 });
  const quickX = gsap.quickTo(follower, "x", {
    duration: 1,
    ease: "power2",
  });
  const quickY = gsap.quickTo(follower, "y", {
    duration: 1,
    ease: "power2",
  });
  const handleFollower = (e) => {
    quickX(e.clientX);
    quickY(e.clientY);
  };
  Observer.create({
    target: window,
    onMove: (e) => {
      handleFollower(e.event);
    },
  });

  // intro
  document.fonts.ready.then(() => {
    const title = document.querySelector("#hero .title h1");
    const subtitle = document.querySelector("#hero h2");
    const text = document.querySelector("#hero .text");
    const logoTextLoad = document.querySelector("header h3.loading");
    const logoTextLaila = document.querySelector("header h3.laila");

    const subtitleSplit = SplitText.create(subtitle, {
      type: "chars",
      mask: "chars",
    });
    const logoLoad = SplitText.create(logoTextLoad, {
      type: "chars",
    });

    const logoLaila = SplitText.create(logoTextLaila, {
      type: "chars",
    });

    const logoAnimation = gsap.to(logoLoad.chars, {
      x: 10,
      duration: 0.7,
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true,
      },
    });

    const introTl = gsap
      .timeline({
        paused: true,
        defaults: {
          stagger: 0.05,
          ease: "back",
          duration: 1.5,
        },
      })
      .to(logoLoad.chars, {
        autoAlpha: 0,
        x: 30,
      })
      .from(
        logoLaila.chars,
        {
          autoAlpha: 0,
          xPercent: 100,
        },
        "<"
      )

      .from(
        "nav",
        {
          autoAlpha: 0,
          xPercent: 100,
        },
        "<50%"
      )

      .from(
        title,
        {
          autoAlpha: 0,
          yPercent: 100,
        },
        "<50%"
      )
      .from(
        subtitleSplit.chars,
        {
          autoAlpha: 0,
          xPercent: 100,
          rotate: 30,
        },
        "<25%"
      )

      .from(
        text,
        {
          autoAlpha: 0,
          y: 20,
        },
        "<25%"
      )
      .from(
        lines,
        {
          autoAlpha: 0,
          rotate: 50,
          transformOrigin: "top",
          stagger: {
            each: 0.05,
            from: "center",
          },
        },
        "<50%"
      );

    setTimeout(() => {
      logoAnimation.revert();
      //   introTl.duration(0.5);
      introTl.play();
    }, 2000);
  });
  const titleBlock = document.querySelector("#hero #titleBlock");
  const tween = gsap.to(follower, {
    scale: 10,
    paused: true,
  });
  Observer.create({
    target: titleBlock,
    onHover: (e) => {
      tween.play();
    },
    onHoverEnd: (e) => {
      tween.reverse();
    },
  });

  //  work animations

  const workSvg = document.querySelector("#work svg");
  const workPath = document.querySelector("#work path");
  const work = document.getElementById("work");
  const workPinWrapper = document.querySelector("#work .pin-wrapper");
  const wokeImgs = gsap.utils.toArray("#work img");
  const workWidth = gsap.getProperty(work, "width");
  const workHeight = gsap.getProperty(work, "height");

  const workMater = gsap.timeline();

  const workIntroTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: work,
        start: "top 60%",
        end: "top top",
        scrub: 1,
      },
    })
    .from(workPath, {
      drawSVG: 0,
    });
  const workTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: work,
        start: "top top",
        end: "+=10000",
        scrub: 1,
        pin: workPinWrapper,
      },
    })

    .to(workSvg, {
      scale: 70,
      xPercent: 100,
      yPercent: 200,
      transformOrigin: "center bottom",
    })
    .to(
      workPath,
      {
        attr: {
          fill: "#e0e0e0",
        },
      },
      "<30%"
    )
    .fromTo(
      wokeImgs,
      {
        x: workWidth,
        scale: 1.5,
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        keyframes: [
          {
            clipPath: "inset(0% 0% 0% 0%)",
            x: workWidth / 2,
            scale: 1,
          },
          {
            x: 0,
          },
          {
            xPercent: -100,
          },
        ],
        stagger: 0.5,
      },
      "<30%"
    )
    .to(
      workSvg,
      {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: "center bottom",
      },
      "<80%"
    )
    .to(
      workPath,
      {
        attr: {
          fill: "#000",
        },
      },
      "-=2"
    );

  workMater.add(workIntroTl);
  workMater.add(workTl);

  //  services animations
  const servicesTitle = document.getElementById("services-title");

  smoother.effects(servicesCards, {
    lag: (i) => i * 0.5,
  });

  ScrollTrigger.create({
    trigger: servicesTitle,
    start: "50% 50%",
    end: "bottom bottom",
    endTrigger: "#services",
    scrub: 1,
    pin: true,
  });

  //   about me

  const cards = gsap.utils.toArray("#about .draggable-card");

  Draggable.create(cards, {
    bounds: "#about",
    inertia: true,
  });
});
