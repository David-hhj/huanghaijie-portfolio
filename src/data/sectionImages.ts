import { xiannvlongAI } from "./content";
import { aigcShowcase } from "./aigcShowcase";
import { shopdoraCase, n8nWorkflows } from "./shopdora";
import { aiLabItems } from "./aiLab";

function unique(paths: readonly (string | undefined)[]): string[] {
  return [...new Set(paths.filter((p): p is string => Boolean(p)))];
}

/** Public image paths per section — used for ahead-of-scroll prefetch. */
export const sectionImagePaths: Record<string, readonly string[]> = {
  hero: ["/images/hero-poster.jpg"],
  about: ["/images/about/avatar.webp"],
  shopdora: unique([shopdoraCase.seo.image, ...n8nWorkflows.map((w) => w.image)]),
  content: unique([
    xiannvlongAI.image,
    ...aigcShowcase.flatMap((item) => [item.canvas, item.poster]),
  ]),
  data: unique([shopdoraCase.seo.image, xiannvlongAI.image]),
  "ai-lab": unique(aiLabItems.map((item) => item.image)),
  strengths: [],
  contact: [],
};

export const sectionOrder = [
  "hero",
  "about",
  "shopdora",
  "content",
  "data",
  "ai-lab",
  "strengths",
  "contact",
] as const;
