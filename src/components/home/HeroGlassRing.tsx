import Image from "next/image";

// Water-quality text that revolves around the glass as a true 3D ring (front text in
// front of the glass, back text behind it — depth-sorted in a shared preserve-3d scene).
const TEXT = "RO + UV  •  ZERO TDS  •  SOFT WATER  •  MINERAL +  •  pH 8.5 ALKALINE  •  UF PURE  •  ";
const FONT = 12; // px
const ADVANCE = 10.5; // px per character cell — also the white-strip segment width
const TILT = -8; // deg
const DURATION = 22; // seconds per revolution

export function HeroGlassRing() {
  const chars = [...TEXT];
  const n = chars.length;
  const radius = Math.round((n * ADVANCE) / (2 * Math.PI));

  return (
    <div className="relative mx-auto w-full max-w-[760px]" style={{ perspective: "1200px" }} aria-hidden>
      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* glass plane at z = 0 */}
        <Image
          src="/glass-no-bg-2.png"
          width={1303}
          height={1207}
          priority
          alt=""
          className="relative h-auto w-full"
          style={{ transform: "translateZ(0px)" }}
        />

        {/* revolving text ring, centred on the glass */}
        <div
          className="absolute left-[57%] top-[40%]"
          style={{
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) rotateX(${TILT}deg)`,
          }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              animation: `vw-ring ${DURATION}s linear infinite`,
            }}
          >
            {chars.map((ch, i) => {
              const angle = (360 / n) * i;
              return (
                <div
                  key={i}
                  className="absolute left-0 top-0"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <span
                    className="absolute font-bold text-black"
                    style={{
                      transform: "translate(-50%, -50%)",
                      width: `${ADVANCE}px`,
                      boxSizing: "border-box",
                      textAlign: "center",
                      background: "#ffffff",
                      borderTop: "1px solid #175db4",
                      borderBottom: "1px solid #175db4",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      fontSize: FONT,
                      lineHeight: 1,
                      whiteSpace: "pre",
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    }}
                  >
                    {ch}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
