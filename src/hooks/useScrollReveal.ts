import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_DURATION, MOTION_EASE } from "../motion/constants";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });

function prefersFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function revealStatic(el: HTMLElement) {
  el.querySelectorAll(".motion-eyebrow, .motion-title, .motion-subtitle, .reveal-item").forEach(
    (node) => {
      const item = node as HTMLElement;
      item.style.opacity = "1";
      item.style.transform = "none";
      item.style.filter = "none";
      item.style.clipPath = "none";
    },
  );
  el.querySelectorAll(".motion-image").forEach((node) => {
    const img = node as HTMLElement;
    img.style.opacity = "1";
    img.style.transform = "none";
    img.style.clipPath = "none";
  });
}

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      revealStatic(el);
      return;
    }

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector(".motion-eyebrow");
      const title = el.querySelector(".motion-title");
      const subtitle = el.querySelector(".motion-subtitle");
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item", el);
      const images = gsap.utils.toArray<HTMLElement>(".motion-image", el);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          once: true,
        },
      });

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          {
            y: 130,
            opacity: 0,
            scale: 1.28,
            letterSpacing: "0.32em",
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            letterSpacing: "0.1em",
            filter: "blur(0px)",
            duration: MOTION_DURATION.eyebrow,
            ease: MOTION_EASE.outExpo,
          },
        );
      }

      if (title) {
        tl.fromTo(
          title,
          {
            y: 150,
            opacity: 0,
            scaleY: 1.42,
            scaleX: 0.86,
            transformOrigin: "left bottom",
          },
          {
            y: 0,
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            duration: MOTION_DURATION.title,
            ease: MOTION_EASE.luxury,
          },
          eyebrow ? "-=0.57" : 0,
        );
      }

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { y: 56, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.735,
            ease: MOTION_EASE.out,
          },
          "-=0.63",
        );
      }

      if (items.length) {
        tl.fromTo(
          items,
          { y: 96, opacity: 0, scale: 0.93, transformPerspective: 900, rotateX: 6 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: MOTION_DURATION.card,
            stagger: 0.126,
            ease: MOTION_EASE.out,
          },
          "-=0.39",
        );
      }

      images.forEach((img) => {
        const wrap = img.closest(".motion-image-wrap") ?? img.parentElement;
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)", scale: 1.1, y: 48, opacity: 0.85 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            y: 0,
            opacity: 1,
            duration: MOTION_DURATION.image,
            ease: MOTION_EASE.luxury,
            scrollTrigger: {
              trigger: wrap ?? img,
              start: "top 88%",
              once: true,
            },
          },
        );

        if (prefersFinePointer()) {
          gsap.to(img, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: wrap ?? img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useContactMotion() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      revealStatic(el);
      return;
    }

    const ctx = gsap.context(() => {
      const title = el.querySelector(".motion-title");
      const tagline = el.querySelector(".motion-subtitle");
      const cta = el.querySelector(".motion-cta");
      const blocks = gsap.utils.toArray<HTMLElement>(".reveal-item", el);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          once: true,
        },
      });

      if (title) {
        tl.fromTo(
          title,
          {
            y: 160,
            opacity: 0,
            scaleY: 1.5,
            scaleX: 0.82,
            clipPath: "inset(100% 0 0 0)",
            transformOrigin: "left bottom",
          },
          {
            y: 0,
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.12,
            ease: MOTION_EASE.luxury,
          },
        );
      }

      if (tagline) {
        tl.fromTo(
          tagline,
          { y: 48, opacity: 0, letterSpacing: "0.28em" },
          { y: 0, opacity: 1, letterSpacing: "0.06em", duration: 0.77, ease: MOTION_EASE.out },
          "-=0.59",
        );
      }

      if (cta) {
        tl.fromTo(
          cta,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.665, ease: MOTION_EASE.out },
          "-=0.53",
        );
      }

      if (blocks.length) {
        tl.fromTo(
          blocks,
          { y: 72, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.735, stagger: 0.098, ease: MOTION_EASE.out },
          "-=0.39",
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useActiveSection(sectionIds: string[]) {
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll("[data-chapter]").forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("data-chapter") === entry.target.id,
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);
}
