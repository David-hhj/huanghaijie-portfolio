type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accentWord?: string;
};

export function SectionHeader({ eyebrow, title, subtitle, accentWord }: SectionHeaderProps) {
  const renderTitle = () => {
    if (!accentWord || !title.includes(accentWord)) {
      return (
        <h2 className="section-title-cn text-[clamp(2.75rem,6vw,5rem)] text-[var(--text-primary)]">
          {title}
        </h2>
      );
    }
    const [before, after] = title.split(accentWord);
    return (
      <h2 className="section-title-cn text-[clamp(2.75rem,6vw,5rem)] text-[var(--text-primary)]">
        {before}
        <span className="text-[var(--accent)]">{accentWord}</span>
        {after}
      </h2>
    );
  };

  return (
    <div className="section-header mb-12 max-w-3xl">
      <p className="motion-eyebrow eyebrow display-title mb-5 text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.9] tracking-[0.1em] text-[var(--accent)]">
        [{eyebrow}]
      </p>
      <div className="motion-title">{renderTitle()}</div>
      {subtitle ? <p className="motion-subtitle body-copy mt-5 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}
