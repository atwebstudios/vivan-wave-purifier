/**
 * Tiny class-name joiner (no external deps).
 * Filters out falsy values so conditional classes read cleanly.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
