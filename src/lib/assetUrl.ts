/** Resolve public/ asset paths for GitHub Pages subpath deploys. */
export function assetUrl(path: string): string {
  if (!path || /^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
