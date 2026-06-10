import { BarChart3, LineChart, Search, TrendingUp } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";
import { BorderGlow, sectionCardGlowProps } from "../ui/BorderGlow";
import { SectionHeader } from "../ui/SectionHeader";
import { ZoomableImage } from "../ui/ZoomableImage";

const seoMetrics = [
  { icon: Search, label: "GSC 收录与排名", desc: "追踪索引状态、关键词排名波动与点击率变化" },
  { icon: LineChart, label: "GA4 流量与转化", desc: "分析自然流量来源、落地页表现与转化漏斗" },
  { icon: BarChart3, label: "Semrush 竞品分析", desc: "关键词差距、外链机会与竞品内容策略对标" },
];

const socialMetrics = [
  { icon: TrendingUp, label: "曝光与涨粉", desc: "监控账号曝光量、粉丝增长曲线与内容触达效率" },
  { icon: LineChart, label: "完播与互动", desc: "分析完播率、点赞评论比，优化内容结构与节奏" },
  { icon: BarChart3, label: "用户画像", desc: "根据受众画像调整选题、发布时间与内容形式" },
];

const loopSteps = ["定义指标", "采集数据", "对比基准", "提出假设", "策略迭代"];

export function DataMindset() {
  const ref = useScrollReveal();

  return (
    <section id="data" ref={ref} className="section-pad border-t border-[var(--border)]">
      <Container>
        <SectionHeader
          eyebrow="04 · 数据"
          title="数据敏感度"
          accentWord="数据"
          subtitle="SEO 与社媒运营共用同一套复盘方法论 — 用数据驱动内容策略，而非凭感觉试错。"
        />

        <div className="reveal-item mb-12 flex flex-wrap items-center gap-3">
          {loopSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-xs font-medium text-[var(--text-primary)]">
                {step}
              </span>
              {i < loopSteps.length - 1 ? (
                <span className="text-[var(--text-muted)]">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <BorderGlow className="reveal-item" innerClassName="p-8" {...sectionCardGlowProps}>
            <h3 className="display-title-cn text-lg text-[var(--text-primary)]">SEO 数据栈</h3>
            <div className="mt-8 space-y-6">
              {seoMetrics.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BorderGlow>

          <BorderGlow className="reveal-item" innerClassName="p-8" {...sectionCardGlowProps}>
            <h3 className="display-title-cn text-lg text-[var(--text-primary)]">社媒数据栈</h3>
            <div className="mt-8 space-y-6">
              {socialMetrics.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BorderGlow>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <BorderGlow className="reveal-item" innerClassName="overflow-hidden" {...sectionCardGlowProps}>
            <p className="border-b border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
              [SEO DATA] · Shopdora 成果
            </p>
            <ZoomableImage
              src="/images/seo/seo-results.webp"
              alt="Shopdora SEO 成果数据"
              motion
              imgClassName="w-full object-cover"
            />
          </BorderGlow>
          <BorderGlow className="reveal-item" innerClassName="overflow-hidden" {...sectionCardGlowProps}>
            <p className="border-b border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
              [SOCIAL DATA] · 仙女龙AI
            </p>
            <ZoomableImage
              src="/images/social/douyin-xiannvlong.webp"
              alt="仙女龙AI 抖音运营数据"
              motion
              imgClassName="w-full object-cover object-top"
            />
          </BorderGlow>
        </div>
      </Container>
    </section>
  );
}
