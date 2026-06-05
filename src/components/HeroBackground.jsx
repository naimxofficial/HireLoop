"use client";

/**
 * HeroBackground — drop this inside HeroStats.jsx replacing the background block.
 * Handles globe bg + overlays + stars, fully responsive.
 */

const stars = [
  // top-left sky quadrant
  [5, 18], [11, 8], [17, 30], [8, 42], [22, 14], [3, 55], [14, 50],
  // top-right sky quadrant
  [78, 12], [85, 28], [92, 8], [96, 42], [88, 52], [74, 35], [81, 20],
  // centre sky (sparse)
  [38, 6], [50, 10], [62, 7], [45, 20], [55, 16],
  // sides mid
  [4, 68], [7, 78], [95, 60], [97, 72],
];

export default function HeroBackground() {
  return (
    <>
      {/* ── 1. Globe image as background ─────────────────────────────────
           - Mobile  : 160% wide so globe fills the narrow screen
           - Tablet  : 120% wide
           - Desktop : 90% wide — matches screenshot proportion
           Positioned so equator sits ~65% down the section height.
      ──────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/globe.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 62%",
          /* responsive size via clamp: min 320px wide screens up to large */
          backgroundSize: "clamp(320px, 160%, 160%) auto",
        }}
      />

      {/* Responsive overrides via plain media-query inline won't work in Tailwind,
          so we use a <style> tag scoped to this component */}
      <style>{`
        .hero-globe-bg {
          background-size: clamp(320px, 160%, 160%) auto !important;
          background-position: center 62% !important;
        }
        @media (min-width: 640px) {
          .hero-globe-bg {
            background-size: 120% auto !important;
            background-position: center 60% !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-globe-bg {
            background-size: 88% auto !important;
            background-position: center 58% !important;
          }
        }
      `}</style>

      {/* Apply responsive class on the same div — re-render trick: keep both divs in sync */}
      <div
        aria-hidden="true"
        className="hero-globe-bg absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "url('/globe.png')", backgroundRepeat: "no-repeat" }}
      />

      {/* ── 2. Atmospheric purple glow AROUND globe edge ─────────────────
           Two layered ellipses:
           - Outer : wide soft indigo halo
           - Inner : tighter brighter core matching the blue-white top of globe
      ──────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 70% 38% at 50% 63%, rgba(80,55,200,0.45) 0%, transparent 65%),
            radial-gradient(ellipse 55% 28% at 50% 60%, rgba(100,80,230,0.25) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── 3. Top black fade — hero text sits on pure dark ──────────────
           Tall enough to cover the empty sky above globe.
           Gradient stops: solid black → semi → transparent
      ──────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 pointer-events-none z-[2]"
        style={{
          height: "52%",
          background:
            "linear-gradient(to bottom, #0a0a0f 0%, #0a0a0f 45%, rgba(10,10,15,0.7) 72%, transparent 100%)",
        }}
      />

      {/* ── 4. Bottom fade — stats section blends into dark bg ───────────*/}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.8) 60%, transparent 100%)",
        }}
      />

      {/* ── 5. Left edge fade ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-24 sm:w-40 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to right, #0a0a0f 0%, transparent 100%)",
        }}
      />

      {/* ── 6. Right edge fade ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-24 sm:w-40 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to left, #0a0a0f 0%, transparent 100%)",
        }}
      />

      {/* ── 7. White moon-glow — top-left corner ─────────────────────────
           Soft diffused bloom, NOT a hard circle.
           opacity deliberately low — ambient, not spotlight.
      ──────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none z-[2]"
        style={{
          top: "-10%",
          left: "-8%",
          width: "clamp(280px, 45vw, 580px)",
          height: "clamp(280px, 45vw, 580px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 40%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />

      {/* ── 8. White moon-glow — top-right corner ────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none z-[2]"
        style={{
          top: "-10%",
          right: "-8%",
          width: "clamp(280px, 45vw, 580px)",
          height: "clamp(280px, 45vw, 580px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 40%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />

      {/* ── 9. Stars ─────────────────────────────────────────────────────
           Only in upper sky region (top 70%). Sizes vary 1-2.5px.
      ──────────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[3]">
        {stars.map(([x, y], i) => {
          const size = i % 5 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5;
          const opacity = 0.18 + (i % 6) * 0.09;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </>
  );
}