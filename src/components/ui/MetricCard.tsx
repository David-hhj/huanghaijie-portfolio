type MetricCardProps = {
  value: string;
  label: string;
  description?: string;
  compact?: boolean;
  className?: string;
};

export function MetricCard({
  value,
  label,
  description,
  compact = false,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`card-hover-lift border border-[var(--border)] bg-[var(--bg-elevated)] ${
        compact ? "p-3" : "p-6"
      } ${className}`}
    >
      <p
        className={`stat-mega text-[var(--accent)] ${
          compact ? "display-title text-2xl" : "text-4xl md:text-5xl"
        }`}
      >
        {value}
      </p>
      <p className={`stat-label text-white ${compact ? "mt-1 font-mono text-[0.78rem]" : "mt-3"}`}>
        {label}
      </p>
      {description ? (
        <p className="mt-1 font-mono text-xs text-white-pure">{description}</p>
      ) : null}
    </div>
  );
}
