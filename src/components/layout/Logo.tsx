import Link from "next/link";
import { cn } from "@/lib/utils";

type Size = "sm" | "lg";

/**
 * Vivanwave brand logo.
 *
 * Uses `/logo-no-bg.png` as the default logo.
 * Pass `wordmarkOnly` to use the SVG mark instead (e.g. on the dark footer).
 */
export function Logo({
  size = "sm",
  className,
  priority,
  dark,
  wordmarkOnly,
}: {
  size?: Size;
  className?: string;
  priority?: boolean;
  dark?: boolean;
  wordmarkOnly?: boolean;
}) {
  const imgHeight = size === "lg" ? "h-16" : "h-14";

  return (
    <Link
      href="/"
      aria-label="Vivanwave — home"
      className={cn("inline-flex items-center", className)}
    >
      {!wordmarkOnly ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo-no-bg.png"
          alt="Vivanwave"
          fetchPriority={priority ? "high" : undefined}
          className={cn("w-auto", imgHeight)}
        />
      ) : (
        <Wordmark size={size} dark={dark} />
      )}
    </Link>
  );
}

/** Inline-SVG fallback brand mark: water drop over leaves above a wave, plus wordmark. */
function Wordmark({ size, dark }: { size: Size; dark?: boolean }) {
  const markSize = size === "lg" ? "h-11 w-11" : "h-10 w-10";
  const text = size === "lg" ? "text-2xl" : "text-xl sm:text-2xl";

  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 48 48" className={markSize} aria-hidden role="img">
        <defs>
          <linearGradient id="vw-drop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#37a9e0" />
            <stop offset="100%" stopColor={dark ? "#2575d1" : "#143560"} />
          </linearGradient>
          <linearGradient id="vw-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6cbf3f" />
            <stop offset="100%" stopColor="#3f8f27" />
          </linearGradient>
        </defs>
        <path d="M24 31 C17 31 11 27 9.5 20 C17 20 22.5 24 24 31 Z" fill="url(#vw-leaf)" />
        <path d="M24 31 C31 31 37 27 38.5 20 C31 20 25.5 24 24 31 Z" fill="url(#vw-leaf)" />
        <path
          d="M24 6 C24 6 33 17 33 24 A9 9 0 0 1 15 24 C15 17 24 6 24 6 Z"
          fill="url(#vw-drop)"
        />
        <circle cx="20.5" cy="22" r="2.2" fill="#ffffff" opacity="0.7" />
        <path
          d="M7 38 C12 34 16 42 24 38 C31 34.5 35 42 41 38"
          fill="none"
          stroke={dark ? "#4bb6fd" : "#175db4"}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="24" cy="4" r="1.6" fill="#c9a24b" />
      </svg>
      <span
        className={cn(
          "font-serif font-bold italic tracking-tight",
          text,
          dark ? "text-white" : "text-brand-800",
        )}
      >
        Vivanwave
      </span>
    </span>
  );
}
