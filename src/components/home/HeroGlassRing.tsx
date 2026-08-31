import Image from "next/image";

/** Hero product visual — the Vivanwave RO + Ionizer, shown as a clean cut-out. */
export function HeroGlassRing() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]" aria-hidden>
      <Image
        src="/Ionizer-no-bg.png"
        width={1236}
        height={1273}
        priority
        alt="Vivanwave RO + Ionizer"
        className="h-auto w-full drop-shadow-2xl"
      />
    </div>
  );
}
