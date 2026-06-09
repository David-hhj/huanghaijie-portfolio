import { navItems } from "../../data/profile";

export function ChapterNav() {
  return (
    <aside className="fixed top-1/2 left-8 z-40 hidden -translate-y-1/2 xl:block">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              data-chapter={id}
              className="chapter-link group flex items-center gap-3 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] [&.is-active]:text-[var(--accent)]"
            >
              <span className="h-px w-5 bg-white/15 transition-all group-[.is-active]:w-10 group-[.is-active]:bg-[var(--accent)]" />
              <span>[{item.label}]</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
