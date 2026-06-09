import { Menu } from "lucide-react";
import { navItems } from "../../data/profile";

export function Nav() {
  return (
    <header id="site-nav" className="fixed inset-x-0 top-0 z-50 bg-[#0A0A0B]/60 backdrop-blur-sm">
      <div className="container-main relative flex h-20 items-center">
        <a href="#hero" className="logo-mark shrink-0" aria-label="Home">
          H.
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7">
          {navItems.slice(0, -1).map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                data-chapter={id}
                className="nav-bracket [&.is-active]:text-[var(--text-primary)]"
              >
                [{item.label}]
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <a
            href="#contact"
            data-chapter="contact"
            className="nav-bracket nav-bracket-accent hidden sm:inline [&.is-active]:text-[var(--accent)]"
          >
            [联系]
          </a>
          <button
            type="button"
            className="p-1 text-white/70 transition hover:text-white lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
