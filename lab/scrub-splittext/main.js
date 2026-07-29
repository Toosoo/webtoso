import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { RoughEase } from "gsap/EasePack";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(SplitText, RoughEase, ScrollTrigger, ScrollSmoother);

  ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  const hero = document.getElementById("hero");
  const section1 = document.getElementById("section-1");
  const section2 = document.getElementById("section-2");
  const section3 = document.getElementById("section-3");

  document.fonts.ready.then(() => {
    let heroCtx = gsap.context(() => {
      let split = SplitText.create("h2", {
        type: "chars",
        ignore: "span",
      });

      const tl = gsap
        .timeline({
          defaults: {
            ease: "elastic",
            duration: 2,
          },
        })
        .from([split.chars, "span"], {
          scale: 0,
          opacity: 0,
          y: "random(-100,100)",
          rotate: "random([-20],[20])",
          stagger: {
            each: 0.1,
            from: "random",
          },
        })
        .from(
          ".circle",
          {
            scale: 0,
            y: 200,
            ease: "back",
          },
          "<50%"
        )
        .from(
          ".hero-img",
          {
            scale: 0,
            y: 200,
            ease: "back",
          },
          "<30%"
        );
    }, hero);

    let section1Ctx = gsap.context(() => {
      let split = SplitText.create("h2", {
        type: "chars",
        onSplit: (self) => {
          return gsap.to(self.chars, {
            rotate: "random(-50,50)",
            y: "random(-10,10)",
            x: "random(-20,20)",
            ease: "rough",
            stagger: {
              amount: 0.5,
              from: "center",
              yoyo: true,
              repeat: -1,
            },
          });
        },
      });

      SplitText.create("p", {
        type: "chars",
        smartWrap: true,
        onSplit: (self) => {
          return gsap.from(self.chars, {
            opacity: 0.2,
            stagger: 0.1,
            scrollTrigger: {
              trigger: "p",
              start: "top 70%",
              end: "+=400",
              scrub: 1,
            },
          });
        },
      });
    }, section1);

    let section2Ctx = gsap.context(() => {
      const split = SplitText.create("h2", {
        type: "chars",
        smartWrap: true,
      });

      gsap.from(split.chars, {
        scale: 0,
        duration: 0.7,
        ease: "back",
        stagger: {
          amount: 1,
          from: "random",
          yoyo: true,
          repeat: -1,
        },
      });

      const row1 = gsap.utils.toArray(".first-row h2"),
        loop1 = horizontalLoop(row1, { paused: false });
      const row2 = gsap.utils.toArray(".second-row h2"),
        loop2 = horizontalLoop(row2, { paused: false, reversed: true });
      const row3 = gsap.utils.toArray(".third-row h2"),
        loop3 = horizontalLoop(row3, { paused: false, speed: 0.5 });
    }, section2);

    let section3Ctx = gsap.context(() => {
      let split = SplitText.create("p", {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          return gsap.from(self.lines, {
            yPercent: 100,
            stagger: 0.1,
            scrollTrigger: {
              trigger: section3,
              start: "top 30%",
              end: "top top",
              scrub: 1,
              markers: true,
            },
          });
        },
      });
    }, section3);

    function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
      gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          return xPercents[i];
        },
      });
      gsap.set(items, { x: 0 });
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
            },
            {
              xPercent: xPercents[i],
              duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          // if we're wrapping the timeline's playhead, make the proper adjustments
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      return tl;
    }
  });
});
