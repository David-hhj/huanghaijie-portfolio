import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_DURATION, MOTION_EASE } from "../motion/constants";

export function useHeroOpening() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const nav = document.getElementById("site-nav");
      const growthMask = hero.querySelector(".hero-growth-mask");
      const growthInner = hero.querySelector(".hero-growth-inner");
      const videoWrap = hero.querySelector(".hero-video-wrap");
      const name = hero.querySelector(".hero-name-cn");
      const meta = gsap.utils.toArray<HTMLElement>(".hero-meta", hero);
      const center = hero.querySelector(".hero-bottom-center");
      const slogan = hero.querySelector(".hero-slogan");

      gsap.set([growthInner, name, center, slogan, ...meta, nav].filter(Boolean), {
        opacity: 0,
      });

      if (growthMask) {
        gsap.set(growthMask, { clipPath: "inset(100% 0 0 0)" });
      }

      const tl = gsap.timeline({ delay: 0.15 });

      if (nav) {
        tl.fromTo(
          nav,
          { y: -72, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.25, ease: MOTION_EASE.out },
          0,
        );
      }

      if (videoWrap) {
        tl.fromTo(
          videoWrap,
          { scale: 1.14, opacity: 0.55 },
          { scale: 1, opacity: 1, duration: 2.1, ease: MOTION_EASE.smooth },
          0,
        );
      }

      if (growthMask && growthInner) {
        tl.fromTo(
          growthMask,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: MOTION_DURATION.hero, ease: MOTION_EASE.luxury },
          0.2,
        ).fromTo(
          growthInner,
          { y: 180, scaleY: 1.6, scaleX: 0.82, transformOrigin: "50% 100%" },
          {
            y: 0,
            scaleY: 1,
            scaleX: 1,
            opacity: 1,
            duration: MOTION_DURATION.hero,
            ease: MOTION_EASE.luxury,
          },
          0.2,
        );
      }

      if (name) {
        tl.fromTo(
          name,
          {
            y: 100,
            clipPath: "inset(0 0 100% 0)",
            scaleY: 1.25,
            transformOrigin: "left bottom",
          },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            scaleY: 1,
            opacity: 1,
            duration: 1.35,
            ease: MOTION_EASE.luxury,
          },
          0.85,
        );
      }

      if (meta.length) {
        tl.fromTo(
          meta,
          { y: 48, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.14,
            ease: MOTION_EASE.out,
          },
          1.05,
        );
      }

      if (center) {
        tl.fromTo(
          center,
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: MOTION_EASE.out },
          1.15,
        );
      }

      if (slogan) {
        tl.fromTo(
          slogan,
          { y: 72, x: 40, opacity: 0, scaleX: 0.88, transformOrigin: "right bottom" },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scaleX: 1,
            duration: 1.25,
            ease: MOTION_EASE.luxury,
          },
          1.2,
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return ref;
}
