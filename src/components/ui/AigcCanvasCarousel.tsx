import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import type { AigcShowcaseItem } from "../../data/types";
import { assetUrl } from "../../lib/assetUrl";
import { BorderGlow, sectionCardGlowProps } from "./BorderGlow";
import { ZoomableImage } from "./ZoomableImage";

type AigcCanvasCarouselProps = {
  items: AigcShowcaseItem[];
};

type LazyOutputVideoProps = {
  src: string;
  poster: string;
  caption: string;
  active: boolean;
};

function LazyOutputVideo({ src, poster, caption, active }: LazyOutputVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedSrc = assetUrl(src);
  const resolvedPoster = assetUrl(poster);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      video.pause();
      video.removeAttribute("src");
      video.load();
      return;
    }

    if (video.dataset.src !== resolvedSrc) {
      video.src = resolvedSrc;
      video.dataset.src = resolvedSrc;
      video.load();
    }
  }, [active, resolvedSrc]);

  return (
    <div className="aspect-video w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        controls
        playsInline
        preload="none"
        poster={resolvedPoster}
        className="h-full w-full object-contain"
        aria-label={caption}
      />
    </div>
  );
}

const mediaFrameClass =
  "flex aspect-video w-full items-center justify-center overflow-hidden bg-black/30";

export function AigcCanvasCarousel({ items }: AigcCanvasCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;
  const current = items[index];
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setIndex((prev) => (prev + dir + total) % total);
      window.setTimeout(() => setAnimating(false), reduceMotion ? 150 : 350);
    },
    [animating, total, reduceMotion],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slideClass = animating
    ? direction > 0
      ? "animate-slide-left"
      : "animate-slide-right"
    : "";

  const renderOutput = (item: AigcShowcaseItem) => {
    if (item.isPlaceholder || !item.output) {
      return (
        <div className={`${mediaFrameClass} border border-dashed border-[var(--border)] p-8 text-center`}>
          <div>
            <ImageIcon className="mx-auto mb-3 h-8 w-8 text-[var(--text-muted)]" />
            <p className="eyebrow text-[var(--text-muted)]">成品展示</p>
          </div>
        </div>
      );
    }

    if (item.type === "video") {
      return (
        <LazyOutputVideo
          src={item.output}
          poster={item.poster}
          caption={item.caption}
          active
        />
      );
    }

    return (
      <div className={mediaFrameClass}>
        <ZoomableImage
          src={item.output}
          alt={item.caption}
          className="block h-full w-full"
          imgClassName="h-full w-full object-contain"
          showHint={false}
        />
      </div>
    );
  };

  const renderCanvas = (item: AigcShowcaseItem) => {
    if (item.isPlaceholder || !item.canvas) {
      return (
        <div className={`${mediaFrameClass} border border-dashed border-[var(--border)] p-8 text-center`}>
          <div>
            <ImageIcon className="mx-auto mb-3 h-8 w-8 text-[var(--text-muted)]" />
            <p className="eyebrow text-[var(--text-muted)]">AIGC 画布</p>
          </div>
        </div>
      );
    }

    return (
      <div className={mediaFrameClass}>
        <ZoomableImage
          src={item.canvas}
          alt={`${item.caption} — AIGC 画布`}
          className="block h-full w-full"
          imgClassName="h-full w-full object-contain"
        />
      </div>
    );
  };

  return (
    <BorderGlow innerClassName="overflow-hidden" {...sectionCardGlowProps}>
      <div
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 48) go(delta > 0 ? -1 : 1);
        }}
      >
      <div className={`relative ${slideClass}`} key={current.id}>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-[var(--border)] p-4 md:border-r md:border-b-0 md:p-5">
            <p className="eyebrow mb-3 text-[var(--text-muted)]">成品</p>
            {renderOutput(current)}
          </div>

          <div className="p-4 md:p-5">
            <p className="eyebrow mb-3 text-[var(--text-muted)]">AIGC 画布</p>
            {renderCanvas(current)}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-2 z-10 flex -translate-y-1/2 items-center justify-center bg-[#900000] p-2.5 text-white transition hover:bg-[#a80000] md:left-3"
          aria-label="上一个"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center justify-center bg-[#900000] p-2.5 text-white transition hover:bg-[#a80000] md:right-3"
          aria-label="下一个"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      <p className="border-t border-[var(--border)] px-4 py-4 text-center text-sm text-[var(--text-muted)] md:px-5">
        {current.caption}
      </p>

      <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] py-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1.5 transition-all ${
              i === index ? "w-8 bg-[var(--accent)]" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`切换到第 ${i + 1} 项`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-right { animation: slideFromRight 0.35s ease; }
        .animate-slide-left { animation: slideFromLeft 0.35s ease; }
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-right, .animate-slide-left { animation: none; }
        }
      `}</style>
      </div>
    </BorderGlow>
  );
}
