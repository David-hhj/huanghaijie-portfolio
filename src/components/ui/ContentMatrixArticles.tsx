import { ExternalLink } from "lucide-react";
import type { ContentMatrixArticle } from "../../data/types";

type ContentMatrixArticlesProps = {
  articles: ContentMatrixArticle[];
};

export function ContentMatrixArticles({ articles }: ContentMatrixArticlesProps) {
  return (
    <ul className="mt-6 space-y-3">
      {articles.map((article) => (
        <li key={article.id}>
          <a
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-[var(--border)] bg-[var(--bg-elevated)]/40 px-4 py-3 transition hover:border-[var(--accent)]/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-[0.65rem] tracking-wide text-[var(--accent)]">
                  [{article.coin}] · {article.category}
                </span>
                <p className="mt-1 text-sm leading-snug text-[var(--text-primary)] group-hover:text-white">
                  {article.title}
                </p>
              </div>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]" />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
