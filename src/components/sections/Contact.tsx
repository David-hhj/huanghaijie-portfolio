import { ExternalLink } from "lucide-react";
import { profile } from "../../data/profile";
import { useContactMotion } from "../../hooks/useScrollReveal";
import { Container } from "../layout/Container";

export function Contact() {
  const ref = useContactMotion();
  const { links } = profile;

  return (
    <section id="contact" ref={ref} className="min-h-screen bg-[var(--bg-band)] text-[var(--color-ink)]">
      <Container className="flex min-h-screen flex-col justify-between py-16 md:py-20">
        <div>
          <p className="motion-title display-title text-[clamp(4rem,12vw,10rem)] leading-[0.82] text-[var(--accent)]">
            CONTACT
          </p>
          <p className="motion-subtitle slogan-line mt-6 text-xl md:text-2xl">#LETS_TALK_GROWTH</p>
          <a href={`mailto:${links.email}`} className="motion-cta btn-outline-dark mt-8">
            Start a Project
          </a>
        </div>

        <div className="reveal-item mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="bracket-label mb-3 text-[var(--color-ink)]/50">[LOCATION]</p>
            <p className="text-sm font-medium">{profile.location}</p>
            <p className="mt-1 text-sm text-[var(--color-ink)]/60">Remote-friendly</p>
          </div>

          <div>
            <p className="bracket-label mb-3 text-[var(--color-ink)]/50">[CONTACT]</p>
            <ul className="space-y-2 text-sm">
              {links.email ? (
                <li>
                  <a href={`mailto:${links.email}`} className="hover:underline">
                    {links.email}
                  </a>
                </li>
              ) : null}
              {links.phone ? <li>{links.phone}</li> : null}
              {links.wechat ? <li>WeChat {links.wechat}</li> : null}
              {links.resume ? (
                <li>
                  <a href={links.resume} className="hover:underline">
                    Download Resume
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <p className="bracket-label mb-3 text-[var(--color-ink)]/50">[LINKS]</p>
            <ul className="space-y-2 text-sm">
              {links.shopdora ? (
                <li>
                  <a
                    href={links.shopdora}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    Shopdora
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ) : null}
              {links.blog ? (
                <li>
                  <a
                    href={links.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    Ghost Blog
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ) : null}
              {links.helpCenter ? (
                <li>
                  <a
                    href={links.helpCenter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    Help Center
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <p className="mt-12 font-mono text-xs text-[var(--color-ink)]/40">
          © 2026 {profile.name}. All rights reserved.
        </p>
      </Container>
    </section>
  );
}