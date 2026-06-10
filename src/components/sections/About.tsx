import { lazy, Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../../data/profile";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";
import { MetricCard } from "../ui/MetricCard";
import { TiltedCard } from "../ui/TiltedCard";

const AboutBackground = lazy(() =>
  import("../background/AboutBackground").then((m) => ({ default: m.AboutBackground })),
);

const UNIVERSITY_HIGHLIGHT = "华南师范大学，";
const HIGHLIGHTED_BIO_PREFIX = "网络与新媒体专业背景";

export function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden">
      <Suspense fallback={null}>
        <AboutBackground interactionRef={ref} />
      </Suspense>
      <Container className="about-content relative z-10">
        <div className="section-header mb-12 max-w-3xl">
          <p className="motion-eyebrow eyebrow display-title mb-5 text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.9] tracking-[0.1em] text-[var(--accent)]">
            [01 · 经历]
          </p>
          <h2 className="motion-title section-title-cn text-[clamp(2.75rem,6vw,5rem)] text-white-pure">
            个人经历
          </h2>
          <p className="motion-subtitle mt-5 max-w-2xl text-[0.9375rem] leading-[1.65] text-white-pure">
            <span className="text-white-pure">{UNIVERSITY_HIGHLIGHT}</span>
            网络与新媒体背景，专注搜索增长、内容自动化与 AI 赋能内容生产。
          </p>
        </div>

        <div className="reveal-item grid gap-12 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col items-center lg:items-start">
            <TiltedCard
              imageSrc="/images/about/avatar.webp"
              altText={`${profile.name} 头像`}
              containerHeight="224px"
              containerWidth="224px"
              imageHeight="224px"
              imageWidth="224px"
              rotateAmplitude={12}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
            />
            <p className="mt-4 font-mono text-xs text-white-pure">{profile.availability}</p>
          </div>

          <div>
            <div className="space-y-4">
              {profile.bio.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-white-pure">
                  {line.startsWith(HIGHLIGHTED_BIO_PREFIX) ? (
                    <>
                      <span className="text-white-pure">{UNIVERSITY_HIGHLIGHT}</span>
                      {line}
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.links.email ? (
                <a
                  href={`mailto:${profile.links.email}`}
                  className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2 font-mono text-xs text-white-pure transition hover:border-[var(--accent)]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {profile.links.email}
                </a>
              ) : null}
              {profile.links.phone ? (
                <span className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2 font-mono text-xs text-white-pure">
                  <Phone className="h-3.5 w-3.5" />
                  {profile.links.phone}
                </span>
              ) : null}
              {profile.links.wechat ? (
                <span className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2 font-mono text-xs text-white-pure">
                  微信 {profile.links.wechat}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2 font-mono text-xs text-white-pure">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        <div className="reveal-item mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {profile.highlights.map((item) => (
            <MetricCard key={item.label} {...item} />
          ))}
        </div>

        <div className="reveal-item mt-16 border-t border-[var(--border)] pt-12">
          <p className="eyebrow mb-8 text-white-pure">Timeline</p>
          <div className="space-y-8">
            {profile.experience.map((item) => (
              <div
                key={`${item.period}-${item.title}`}
                className="grid gap-4 border-l border-[var(--border)] pl-6 md:grid-cols-[160px_1fr]"
              >
                <p className="font-mono text-xs text-[var(--accent)]">{item.period}</p>
                <div>
                  <h4 className="text-sm font-semibold text-white-pure">
                    {item.title}
                    {item.organization ? (
                      <span className="ml-2 font-normal text-white-pure">
                        · {item.organization}
                      </span>
                    ) : null}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white-pure">{item.owned}</p>
                  {item.result ? (
                    <p className="mt-2 font-mono text-xs text-[var(--accent)]">{item.result}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
