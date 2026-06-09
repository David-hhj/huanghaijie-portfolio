import { ExternalLink } from "lucide-react";
import { n8nWorkflows, shopdoraCase } from "../../data/shopdora";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";
import { BorderGlow, sectionCardGlowProps } from "../ui/BorderGlow";
import { MetricCard } from "../ui/MetricCard";
import { SectionHeader } from "../ui/SectionHeader";
import { WorkflowCard } from "../ui/WorkflowCard";
import { ZoomableImage } from "../ui/ZoomableImage";

export function ShopdoraProjects() {
  const ref = useScrollReveal();
  const { seo, automation } = shopdoraCase;

  return (
    <section id="shopdora" ref={ref} className="section-pad">
      <Container>
        <SectionHeader
          eyebrow="02 · 项目"
          title="SEO优化"
          accentWord="SEO"
          subtitle={`所有 n8n 自动化流程均服务于 ${shopdoraCase.site} 的博客内容生产与多语言发布。`}
        />

        <BorderGlow className="reveal-item" innerClassName="overflow-hidden" {...sectionCardGlowProps}>
          <article>
            <div className="motion-image-wrap overflow-hidden border-b border-[var(--border)] bg-black/40 px-6 py-6 md:px-10 md:py-8">
              <ZoomableImage
                src={seo.image}
                alt={seo.imageAlt}
                motion
                className="mx-auto block w-full max-w-4xl"
                imgClassName="mx-auto block max-h-[min(480px,52vh)] w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="eyebrow text-[var(--accent)]">SEO Growth</p>
              <h3 className="display-title-cn mt-4 text-2xl text-[var(--text-primary)]">{seo.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white">{seo.summary}</p>
              <p className="mt-3 text-sm text-white">
                <span className="text-white/80">角色</span> · {seo.role}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {seo.metrics.map((m) => (
                  <MetricCard key={m.label} {...m} compact />
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                {seo.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] transition hover:underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        </BorderGlow>

        <div className="mt-16">
          <div className="reveal-item mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[var(--text-muted)]">{automation.subtitle}</p>
              <h3 className="display-title-cn mt-2 text-xl text-[var(--text-primary)]">
                {automation.title}
              </h3>
            </div>
            <p className="max-w-lg text-sm text-white">{automation.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {n8nWorkflows.map((workflow) => (
              <div key={workflow.id} className="reveal-item">
                <WorkflowCard workflow={workflow} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
