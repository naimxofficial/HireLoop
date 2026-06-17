import Link from "next/link";
import Image from "next/image";
import { MapPin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";

/* ── Format salary range using job's own currency ── */
function formatSalary(min, max, currency) {
  const fmt = (n) => {
    const num = Number(n);
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num;
  };
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] ?? currency + " ";
  return `${symbol}${fmt(min)}–${symbol}${fmt(max)}`;
}

/* ── Pure server component — no state, no events, just a link wrapper ── */
export default function JobCard({ job }) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group bg-[#111118] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/16 hover:bg-[#15151d] transition-colors duration-200"
    >
      {/* Title + Logo */}
      <div className="flex items-start gap-3">
        {job.companyLogo ? (
          <Image
            src={job.companyLogo}
            alt={job.title}
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg object-cover border border-white/8 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[#1e1e28] border border-white/8 flex items-center justify-center shrink-0 text-sm font-bold text-white">
            {job.title?.[0] ?? "J"}
          </div>
        )}
        <div>
          <h3 className="text-[1.05rem] font-semibold text-white leading-snug">
            {job.title}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">{job.category}</p>
        </div>
      </div>

      {/* Tags row 1 — location + type */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1">
          <MapPin className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
          {job.isRemote ? "Remote" : job.location}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1">
          <Briefcase className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
          {job.type}
        </span>
      </div>

      {/* Tags row 2 — salary */}
      <div>
        <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1">
          <CircleDollar className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}/year
        </span>
      </div>

      {/* View Details indicator — navigation handled by the card link */}
      <div className="mt-auto pt-1">
        <span className="inline-flex items-center gap-1.5 text-[13px] text-white group-hover:text-[#9d8fff] transition-colors duration-200 font-medium">
          View Details
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </div>
    </Link>
  );
}