import { useEffect, useRef, useState } from "react";
import type { SkillGroup } from "../../data/types";
import { Carousel, type CarouselItemData } from "./Carousel";

type CapabilitySlideProps = {
  name: string;
  description: string;
  tools?: string[];
  output?: string;
};

function CapabilitySlide({ name, description, tools, output }: CapabilitySlideProps) {
  return (
    <div className="flex flex-col">
      <h4 className="cap-title display-title-cn text-[var(--text-primary)]">{name}</h4>
      <p className="cap-desc cap-gap text-[var(--text-muted)]">{description}</p>
      {tools ? (
        <p className="cap-tools cap-gap font-mono text-white-pure">{tools.join(" · ")}</p>
      ) : null}
      {output ? (
        <p className="cap-output cap-gap font-mono text-[var(--accent)]">→ {output}</p>
      ) : null}
    </div>
  );
}

type SkillGroupCarouselProps = {
  group: SkillGroup;
  autoplayDelay?: number;
};

function SkillGroupCarousel({ group, autoplayDelay = 4500 }: SkillGroupCarouselProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(280);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => setBaseWidth(el.offsetWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const items: CarouselItemData[] = group.capabilities.map((cap) => ({
    id: cap.name,
    content: (
      <CapabilitySlide
        name={cap.name}
        description={cap.description}
        tools={cap.tools}
        output={cap.output}
      />
    ),
  }));

  return (
    <div
      ref={wrapRef}
      className="strengths-card mx-auto flex w-full flex-col border border-[var(--border)] bg-[var(--bg-elevated)]"
    >
      <p className="strengths-card-category display-title-cn border-b border-[var(--border)] text-[var(--accent)]">
        {group.category}
      </p>

      <div className="relative">
        <Carousel
          items={items}
          baseWidth={baseWidth}
          loop
          pauseOnHover
          autoplay
          autoplayDelay={autoplayDelay}
          round={false}
          embedded
          enableEdgeClick
          className="strengths-embedded"
        />
      </div>
    </div>
  );
}

type StrengthsCarouselProps = {
  groups: SkillGroup[];
};

export function StrengthsCarousel({ groups }: StrengthsCarouselProps) {
  return (
    <div className="strengths-carousel-grid mx-auto grid sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, index) => (
        <div key={group.category} className="reveal-item">
          <SkillGroupCarousel group={group} autoplayDelay={4500 + index * 700} />
        </div>
      ))}
    </div>
  );
}
