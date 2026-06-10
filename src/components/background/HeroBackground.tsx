import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../../lib/assetUrl";

const HERO_VIDEO_PLAY_DELAY_MS = 1000;
const CROSSFADE_MS = 600;

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playingRef = useRef(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const posterUrl = assetUrl("/images/hero-poster.jpg");
  const videoUrl = assetUrl("/videos/hero-bg.mp4");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.src = videoUrl;
    video.load();

    const reveal = () => {
      if (cancelled || playingRef.current) return;
      playingRef.current = true;
      setVideoVisible(true);
    };

    const tryPlay = () => {
      if (cancelled || playingRef.current) return;
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    video.addEventListener("playing", reveal);

    const playTimer = window.setTimeout(tryPlay, HERO_VIDEO_PLAY_DELAY_MS);

    const retryPlay = () => {
      if (!cancelled && !playingRef.current) tryPlay();
    };

    document.addEventListener("visibilitychange", retryPlay);
    window.addEventListener("pageshow", retryPlay);
    window.addEventListener("pointerdown", retryPlay, { passive: true });
    window.addEventListener("scroll", retryPlay, { passive: true });

    const retryInterval = window.setInterval(retryPlay, 800);
    const stopRetry = window.setTimeout(() => window.clearInterval(retryInterval), 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(playTimer);
      window.clearTimeout(stopRetry);
      window.clearInterval(retryInterval);
      video.removeEventListener("playing", reveal);
      document.removeEventListener("visibilitychange", retryPlay);
      window.removeEventListener("pageshow", retryPlay);
      window.removeEventListener("pointerdown", retryPlay);
      window.removeEventListener("scroll", retryPlay);
    };
  }, [videoUrl]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-video-wrap absolute inset-0 h-full w-full">
        <img
          src={posterUrl}
          alt=""
          className={`hero-media hero-poster absolute inset-0 h-full w-full object-cover${videoVisible ? " hero-poster--hidden" : ""}`}
          decoding="async"
          fetchPriority="high"
        />
        <video
          ref={videoRef}
          className={`hero-media hero-video absolute inset-0 h-full w-full object-cover${videoVisible ? " hero-video--visible" : ""}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
        .hero-media {
          filter: brightness(0.605) contrast(1.05) saturate(0.85);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .hero-poster {
          opacity: 1;
          transition: opacity ${CROSSFADE_MS}ms ease;
          z-index: 1;
        }

        .hero-poster--hidden {
          opacity: 0;
          pointer-events: none;
        }

        .hero-video {
          opacity: 0;
          transition: opacity ${CROSSFADE_MS}ms ease;
          z-index: 0;
        }

        .hero-video--visible {
          opacity: 1;
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
