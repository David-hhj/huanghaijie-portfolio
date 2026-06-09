import { lazy, Suspense } from "react";
import { useActiveSection } from "./hooks/useScrollReveal";
import { ChapterNav } from "./components/layout/ChapterNav";
import { Nav } from "./components/layout/Nav";
import { ClickSpark } from "./components/ui/ClickSpark";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";

const ShopdoraProjects = lazy(() =>
  import("./components/sections/ShopdoraProjects").then((m) => ({ default: m.ShopdoraProjects })),
);
const ContentGrowth = lazy(() =>
  import("./components/sections/ContentGrowth").then((m) => ({ default: m.ContentGrowth })),
);
const DataMindset = lazy(() =>
  import("./components/sections/DataMindset").then((m) => ({ default: m.DataMindset })),
);
const AIWorkflowLab = lazy(() =>
  import("./components/sections/AIWorkflowLab").then((m) => ({ default: m.AIWorkflowLab })),
);
const Strengths = lazy(() =>
  import("./components/sections/Strengths").then((m) => ({ default: m.Strengths })),
);
const Contact = lazy(() =>
  import("./components/sections/Contact").then((m) => ({ default: m.Contact })),
);

const sectionIds = [
  "about",
  "shopdora",
  "content",
  "data",
  "ai-lab",
  "strengths",
  "contact",
];

function AppContent() {
  useActiveSection(sectionIds);

  return (
    <>
      <Nav />
      <ChapterNav />
      <main>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <ShopdoraProjects />
          <ContentGrowth />
          <DataMindset />
          <AIWorkflowLab />
          <Strengths />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  return (
    <ClickSpark
      sparkColor="#FF3B00"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <AppContent />
    </ClickSpark>
  );
}
