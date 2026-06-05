
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  CircleDollar,
  ArrowRight,
} from "@gravity-ui/icons";

const jobs = Array(6).fill({
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "€25–€40/hour",
});

export default function JobDiscovery() {
  return (
    <section className="bg-[#0a0a0f] py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">

          {/* Label with square dot decorators */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-[6px] h-[6px] bg-[#6b5ce7] rounded-sm inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">
              Smart Job Discovery
            </span>
            <span className="w-[6px] h-[6px] bg-[#6b5ce7] rounded-sm inline-block" />
          </div>

          {/* Heading */}
          <h2 className="text-[2rem] sm:text-[2.6rem] md:text-[3rem]  text-white leading-[1.12] tracking-tight max-w-md font-medium">
            The roles you&apos;d never<br />find by searching
          </h2>
        </div>

        {/* ── Job Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-[#111118] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors duration-200"
            >
              {/* Title */}
              <div>
                <h3 className="text-[1.15rem] font-semibold text-white leading-snug">
                  {job.title}
                </h3>
                <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Tags row 1 — location + type */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1">
                  <MapPin className="w-3.5 h-3.5 text-[#6b5ce7] shrink-0" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#6b5ce7] shrink-0" />
                  {job.type}
                </span>
              </div>

              {/* Tags row 2 — salary */}
              <div>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1">
                  <CircleDollar className="w-3.5 h-3.5 text-[#6b5ce7] shrink-0" />
                  {job.salary}
                </span>
              </div>

              {/* Apply Now */}
              <div className="mt-auto pt-1">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 text-[13px] text-white hover:text-[#9d8fff] transition-colors duration-200 font-medium"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── View All Button ── */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-white text-[#0a0a0f] text-sm font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg shadow-black/30"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  );
}