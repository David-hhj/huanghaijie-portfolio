import { profile } from "../../data/profile";
import { useHeroOpening } from "../../hooks/useHeroOpening";
import { HeroBackground } from "../background/HeroBackground";
import { Container } from "../layout/Container";
import { FuzzyText } from "../ui/FuzzyText";

export function Hero() {
  const ref = useHeroOpening();

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen flex-col overflow-hidden">
      <HeroBackground />

      <Container className="relative z-10 flex min-h-screen flex-col pt-28 pb-10">
        <div className="pt-6">
          <h1 className="w-full text-center">
            <div className="hero-growth-mask overflow-hidden">
              <div className="hero-growth-inner will-change-transform">
                <FuzzyText
                  fontSize="clamp(4.5rem, 16vw, 15rem)"
                  fontFamily="inherit"
                  fontWeight={900}
                  color="#FF3B00"
                  baseIntensity={0.02}
                  hoverIntensity={0.27}
                  enableHover
                  className="hero-mega text-[var(--accent)]"
                >
                  GROWTH
                </FuzzyText>
              </div>
            </div>
          </h1>
        </div>

        <div className="flex-1" />

        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div>
            <p className="hero-name-cn text-[clamp(3rem,8vw,5.5rem)] text-[var(--accent)]">
              {profile.name}
            </p>
            <p
              className="hero-meta stat-label mt-3 text-[var(--text-primary)]"
              style={{ fontSize: "1.125rem", letterSpacing: "0.14em" }}
            >
              个人增长项目展示
            </p>
            <a href="#contact" className="hero-meta btn-hero-white mt-8 inline-flex">
              联系方式
            </a>
          </div>

          <p className="hero-bottom-center max-w-xs text-center text-[0.875rem] leading-relaxed tracking-wide text-[var(--text-primary)] lg:max-w-sm lg:pb-1 lg:text-[0.9375rem]">
            SEO · 数据 · 自动化 · AIGC
            <br />
            用系统思维驱动搜索与内容增长
          </p>

          <div className="hero-slogan text-right lg:justify-self-end">
            <p className="slogan-line text-[clamp(1.25rem,2.5vw,2rem)] text-white">
              <span className="text-[var(--accent)]">DATA</span> IS NOT
              <br />
              GUESSWORK
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
