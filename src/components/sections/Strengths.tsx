import { profile } from "../../data/profile";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { StrengthsCarousel } from "../ui/StrengthsCarousel";

export function Strengths() {
  const ref = useScrollReveal();

  return (
    <section id="strengths" ref={ref} className="section-pad border-t border-[var(--border)]">
      <Container>
        <SectionHeader
          eyebrow="06 · 优势"
          title="个人优势"
          subtitle="充分利用AI赋能项目增长"
        />

        <StrengthsCarousel groups={profile.skills} />
      </Container>
    </section>
  );
}
