import { useEffect } from "react";
import { assetUrl } from "../lib/assetUrl";
import { sectionImagePaths, sectionOrder } from "../data/sectionImages";

const prefetched = new Set<string>();

function prefetchImage(path: string) {
  const url = assetUrl(path);
  if (prefetched.has(url)) return;
  prefetched.add(url);

  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

function prefetchSectionImages(sectionId: string) {
  const paths = sectionImagePaths[sectionId];
  if (!paths?.length) return;
  paths.forEach(prefetchImage);
}

/** Prefetch the next section's images when the current section enters the viewport. */
export function useImagePrefetch() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionOrder.forEach((sectionId, index) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const nextId = sectionOrder[index + 1];
      if (!nextId) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) prefetchSectionImages(nextId);
        },
        { rootMargin: "20% 0px 0px 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Hero is visible on load — prefetch About immediately after first paint.
    const raf = requestAnimationFrame(() => prefetchSectionImages("about"));

    return () => {
      cancelAnimationFrame(raf);
      observers.forEach((o) => o.disconnect());
    };
  }, []);
}
