import { ZoomableImage } from "./ZoomableImage";

type PlaceholderCardProps = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  status?: string;
  embedded?: boolean;
};

export function PlaceholderCard({
  title,
  description,
  image,
  imageAlt,
  status,
  embedded = false,
}: PlaceholderCardProps) {
  const alt = imageAlt ?? title;

  return (
    <div
      className={`flex h-full flex-col p-6 ${
        embedded ? "" : "border border-[var(--border)] bg-[var(--bg-elevated)]"
      }`}
    >
      {status ? <span className="bracket-label mb-4 text-[var(--accent)]">[{status}]</span> : null}
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
      <div className="mt-6 aspect-video w-full overflow-hidden border border-[var(--border)] bg-black/20">
        {image ? (
          <div className="motion-image-wrap h-full w-full overflow-hidden">
          <ZoomableImage
            src={image}
            alt={alt}
            motion
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover object-top transition group-hover:opacity-90"
          />
          </div>
        ) : (
          <div className="h-full w-full border border-dashed border-[var(--border)]" />
        )}
      </div>
    </div>
  );
}
