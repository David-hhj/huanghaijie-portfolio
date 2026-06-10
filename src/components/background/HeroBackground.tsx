import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../../lib/assetUrl";

/** Wait before starting playback (poster holds the frame until then). */
const HERO_VIDEO_PLAY_DELAY_MS = 2200;
/** Begin buffering early so playback can start without a black gap. */
const HERO_VIDEO_LOAD_DELAY_MS = 400;
const CROSSFADE_MS = 700;

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const posterUrl = assetUrl("/images/hero-poster.jpg");
  const videoUrl = assetUrl("/videos/hero-bg.mp4");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let delayDone = false;
    let canPlay = false;
    let started = false;

    const startPlayback = () => {
      if (cancelled || started || !delayDone || !canPlay) return;
      started = true;

      void video.play().then(() => {
        if (!cancelled) setVideoVisible(true);
      }).catch(() => undefined);
    };

    const onCanPlay = () => {
      canPlay = true;
      startPlayback();
    };

    video.addEventListener("canplaythrough", onCanPlay);

    const loadTimer = window.setTimeout(() => {
      if (cancelled) return;
      video.src = videoUrl;
      video.load();
    }, HERO_VIDEO_LOAD_DELAY_MS);

    const playTimer = window.setTimeout(() => {
      if (cancelled) return;
      delayDone = true;
      startPlayback();
    }, HERO_VIDEO_PLAY_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimer);
      window.clearTimeout(playTimer);
      video.removeEventListener("canplaythrough", onCanPlay);
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
          preload="none"
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
