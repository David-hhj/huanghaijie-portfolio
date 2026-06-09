import type { N8nWorkflow } from "../../data/types";
import { BorderGlow, sectionCardGlowProps } from "./BorderGlow";
import { ZoomableImage } from "./ZoomableImage";

type WorkflowCardProps = {
  workflow: N8nWorkflow;
};

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <BorderGlow innerClassName="overflow-hidden" {...sectionCardGlowProps}>
      <article className="group transition-colors">
        <div className="aspect-[16/10] overflow-hidden border-b border-[var(--border)] bg-black/40">
          <ZoomableImage
            src={workflow.image}
            alt={workflow.imageAlt}
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ objectPosition: "53.34% top" }}
          />
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="bracket-label text-[var(--accent)]">[{workflow.platform}]</span>
          </div>
          <h4 className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
            {workflow.title}
          </h4>
          <div className="mt-4 space-y-1 font-mono text-[0.7475rem] leading-relaxed text-white">
            <p>
              <span className="text-white">输入</span> → {workflow.input}
            </p>
            <p>
              <span className="text-white">输出</span> → {workflow.output}
            </p>
          </div>
        </div>
      </article>
    </BorderGlow>
  );
}
