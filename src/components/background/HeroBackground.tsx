import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../../lib/assetUrl";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const enable = () => setShouldLoad(true);
    const idleId = window.requestIdleCallback?.(enable, { timeout: 600 });
    const timeoutId = idleId === undefined ? window.setTimeout(enable, 120) : undefined;

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    video.src = assetUrl("/videos/hero-bg.mp4");
    video.load();
    void video.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-video-wrap absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={assetUrl("/images/hero-poster.jpg")}
        />
      </div>

      <div className="hero-noise absolute inset-0 opacity-[0.5] mix-blend-overlay" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.85) 75%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 35%, rgba(255,59,0,0.15), transparent 65%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background:
            "linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.75) 40%, rgba(10,10,11,0.35) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 backdrop-blur-[2px]"
        style={{
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      <style>{`
        .hero-video {
          filter: brightness(0.605) contrast(1.05) saturate(0.85);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .hero-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.825' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 162px 162px;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
