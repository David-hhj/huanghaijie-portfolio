import { useState, type CSSProperties } from "react";
import { ImageLightbox } from "./ImageLightbox";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  showHint?: boolean;
  motion?: boolean;
};

export function ZoomableImage({
  src,
  alt,
  className = "block w-full",
  imgClassName = "w-full",
  style,
  loading = "lazy",
  showHint = true,
  motion = false,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  const image = (
    <img
      src={src}
      alt={alt}
      className={`${imgClassName}${motion ? " motion-image" : ""}`}
      style={style}
      loading={loading}
      decoding="async"
    />
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative cursor-zoom-in ${className}${motion ? " motion-image-wrap overflow-hidden" : ""}`}
        aria-label={`查看全图：${alt}`}
      >
        {image}
        {showHint ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-left font-mono text-[0.65rem] tracking-wide text-white/80 opacity-0 transition group-hover:opacity-100">
            点击查看全图
          </span>
        ) : null}
      </button>

      <ImageLightbox src={src} alt={alt} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
