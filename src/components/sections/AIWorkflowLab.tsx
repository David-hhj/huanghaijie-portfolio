import { aiLabItems } from "../../data/aiLab";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";
import { BorderGlow, sectionCardGlowProps } from "../ui/BorderGlow";
import { PlaceholderCard } from "../ui/PlaceholderCard";
import { SectionHeader } from "../ui/SectionHeader";

export function AIWorkflowLab() {
  const ref = useScrollReveal();

  return (
    <section id="ai-lab" ref={ref} className="section-pad border-t border-[var(--border)]">
      <Container>
        <SectionHeader
          eyebrow="05 · 实验室"
          title="AI 工作流与知识系统"
          accentWord="AI"
          subtitle="将 AI 使用能力沉淀为可复用的 Skills、知识库与 Agent 工作流。"
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {aiLabItems.map((item) => (
            <div key={item.title} className="reveal-item">
            <BorderGlow
              className="h-full"
              innerClassName="h-full overflow-hidden"
              {...sectionCardGlowProps}
            >
              <PlaceholderCard
                title={item.title}
                description={item.description}
                image={item.image}
                imageAlt={item.imageAlt}
                embedded
              />
            </BorderGlow>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
