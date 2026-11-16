/**
 * Tiny class-name joiner (no external deps).
 * Filters out falsy values so conditional classes read cleanly.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Cache-busting helper for assets. Local paths are served cleanly without query strings
 * to comply with Next.js image optimization policies.
 */
export function assetSrc(src: string): string {
  return src;
}
