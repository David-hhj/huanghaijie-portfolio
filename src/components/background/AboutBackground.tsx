import type { RefObject } from "react";
import { ColorBends } from "./ColorBends";

type AboutBackgroundProps = {
  interactionRef: RefObject<HTMLElement | null>;
};

export function AboutBackground({ interactionRef }: AboutBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0a0a0b]" aria-hidden>
      {/* Top feather — soft entry without pulling section upward */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-32"
        style={{
          background:
            "linear-gradient(to bottom, #0a0a0b 0%, rgba(10,10,11,0.7) 45%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 z-[1] h-20 backdrop-blur-[3px]"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 opacity-[0.92]">
        <ColorBends
          className="absolute inset-0"
          colors={["#900000"]}
          rotation={-119}
          autoRotate={0}
          speed={0.28}
          scale={0.85}
          frequency={1}
          warpStrength={0.975}
          mouseInfluence={1}
          noise={0.28}
          parallax={0.5}
          iterations={1}
          intensity={1.21}
          bandWidth={5}
          transparent
          interactionRef={interactionRef}
        />
      </div>

      {/* Center scrim — keeps text readable over bright red bands */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(180deg, rgba(10,10,11,0.47) 0%, rgba(10,10,11,0.21) 42%, rgba(10,10,11,0.47) 100%)",
            "radial-gradient(ellipse 88% 62% at 50% 48%, rgba(10,10,11,0.61) 0%, rgba(10,10,11,0.30) 55%, transparent 100%)",
          ].join(", "),
        }}
      />

      {/* Bottom feather — soft blend into next section */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to top, #0a0a0b 0%, rgba(10,10,11,0.82) 38%, rgba(10,10,11,0.35) 72%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-24 backdrop-blur-[2px]"
        style={{
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .color-bends-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
