import { aigcShowcase } from "../../data/aigcShowcase";
import { xiannvlongAI } from "../../data/content";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";
import { AigcCanvasCarousel } from "../ui/AigcCanvasCarousel";
import { BorderGlow, sectionCardGlowProps } from "../ui/BorderGlow";
import { SectionHeader } from "../ui/SectionHeader";
import { ZoomableImage } from "../ui/ZoomableImage";

export function ContentGrowth() {
  const ref = useScrollReveal();

  return (
    <section id="content" ref={ref} className="section-pad border-t border-[var(--border)]">
      <Container>
        <SectionHeader
          eyebrow="03 · 内容"
          title="内容增长"
          accentWord="增长"
          subtitle="增长结果在上，生产系统在下 — 从社媒运营成果到 AIGC 画布模板化产出。"
        />

        <BorderGlow className="reveal-item" innerClassName="overflow-hidden" {...sectionCardGlowProps}>
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-[var(--border)] p-8 md:p-10 lg:border-r lg:border-b-0">
              <span className="bracket-label text-[var(--accent)]">[{xiannvlongAI.platform}]</span>
              <h3 className="display-title-cn mt-4 text-3xl text-[var(--text-primary)]">
                {xiannvlongAI.account}
              </h3>
              {xiannvlongAI.topic ? (
                <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">{xiannvlongAI.topic}</p>
              ) : null}
              <p className="mt-5 text-sm leading-relaxed text-white">
                {xiannvlongAI.description}
              </p>
              <p className="display-title mt-8 text-4xl text-[var(--accent)]">{xiannvlongAI.metric}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {xiannvlongAI.owned.map((item) => (
                  <span
                    key={item}
                    className="border border-[var(--border)] px-3 py-1 font-mono text-[0.65rem] text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-8 border border-dashed border-[var(--border)] p-4 text-sm text-white">
                通过抖音后台数据（曝光、完播率、粉丝画像）持续优化内容策略与发布节奏。
              </p>
            </div>

            <div className="motion-image-wrap relative min-h-[360px] overflow-hidden bg-black/30">
              <ZoomableImage
                src={xiannvlongAI.image}
                alt={xiannvlongAI.imageAlt}
                motion
                className="block h-full min-h-[360px] w-full"
                imgClassName="h-full min-h-[360px] w-full object-cover object-top"
              />
            </div>
          </div>
        </BorderGlow>

        <div className="reveal-item mt-12">
          <div className="mb-6">
            <p className="eyebrow text-[var(--text-muted)]">AIGC Canvas</p>
            <h3 className="display-title-cn mt-2 text-xl text-[var(--text-primary)]">
              AIGC 画布生产系统
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
              使用 AIGC 产品搭建生产画布，实现内容极速化与模板化产出。
            </p>
          </div>
          <AigcCanvasCarousel items={aigcShowcase} />
        </div>
      </Container>
    </section>
  );
}
