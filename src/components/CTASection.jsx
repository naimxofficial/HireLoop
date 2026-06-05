import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden">

      {/* ── Top thin blue border line ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b5bdb]/70 to-transparent z-10" />

      {/* ── cta-bg.png as full background ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/cta-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
        }}
      />

      {/* ── Purple/indigo radial glow — dome centre ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 10%, rgba(72,52,210,0.72) 0%, rgba(50,35,160,0.38) 40%, transparent 70%)",
        }}
      />

      {/* ── Deep black fade top edge (blends section above) ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-[2]"
        style={{
          height: "22%",
          background: "linear-gradient(to bottom, #0a0a0f 0%, rgba(10,10,15,0.0) 100%)",
        }}
      />

      {/* ── Bottom black fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to top, #0a0a0f 0%, transparent 100%)",
        }}
      />

      {/* ── Left edge fade ── */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to right, #0a0a0f 0%, transparent 100%)" }}
      />

      {/* ── Right edge fade ── */}
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to left, #0a0a0f 0%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-28 sm:py-36 md:py-44">

        {/* Headline */}
        <h2 className="text-[2rem] sm:text-[3rem] md:text-[3rem] lg:text-[4rem] font-medium text-white leading-[1.1] tracking-tight max-w-3xl">
          Your next role is<br />already looking for you
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-[14px] sm:text-[16px] text-gray-400 max-w-md leading-relaxed">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center bg-white text-[#0a0a0f] text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg shadow-black/30 min-w-[190px]"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center bg-[#18181f] border border-white/12 text-white text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1e1e28] transition-colors duration-200 min-w-[160px]"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}