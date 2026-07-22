export function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
