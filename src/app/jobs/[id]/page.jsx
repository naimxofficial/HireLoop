import { getJobById, getJobs } from "@/lib/api/jobs";
import { getCompanyById } from "@/lib/actions/companies";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  CircleDollar,
  Calendar,
  ArrowLeft,
} from "@gravity-ui/icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ApplyButton from "@/components/jobs/ApplyButton";
import JobCard from "@/components/jobs/jobCard";

/* ── Format salary using job's own currency ── */
function formatSalary(min, max, currency) {
  const fmt = (n) => {
    const num = Number(n);
    return num >= 1000 ? `${Math.round(num / 1000)}K` : num;
  };
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] ?? currency + " ";
  return `${symbol}${fmt(min)}–${symbol}${fmt(max)}`;
}


const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Job not found</h1>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            This listing may have been removed or expired.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-[#7c6af7] hover:text-[#9d8fff] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all jobs
          </Link>
        </div>
      </div>
    );
  }

  /* ── Parallel fetches: company info, session, similar jobs ── */
  const [company, session, allActiveJobs] = await Promise.all([
    getCompanyById(job.companyId),
    auth.api.getSession({ headers: await headers() }),
    getJobs({ status: "active" }),
  ]);

  const isLoggedIn = !!session?.user;

  const similarJobs = allActiveJobs
    .filter((j) => j._id !== job._id && j.category === job.category)
    .slice(0, 3);

  const deadlineFormatted = job.deadline
    ? new Date(job.deadline).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 my-5">
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all jobs
        </Link>

        {/* ══════════════════════════════
             HEADER — title, badges, apply
        ══════════════════════════════ */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {job.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">{job.category}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
                  {job.isRemote ? "Remote" : job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
                  {job.type}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                  <CircleDollar className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}/year
                </span>
                {deadlineFormatted && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7c6af7] shrink-0" />
                    Apply by {deadlineFormatted}
                  </span>
                )}
              </div>
            </div>

            {/* Apply Button — client component, handles login + limit logic */}
            <ApplyButton jobId={job._id} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        {/* ══════════════════════════════
             COMPANY INFO CARD
        ══════════════════════════════ */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 sm:p-8 mb-6 flex items-center gap-4">
          {job.companyLogo ? (
            <Image
              src={job.companyLogo}
              alt={company?.name ?? "Company logo"}
              width={56}
              height={56}
              className="w-14 h-14 rounded-xl object-cover border border-white/8 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-[#1e1e28] border border-white/8 flex items-center justify-center text-xl font-bold text-white shrink-0">
              {company?.name?.[0] ?? "C"}
            </div>
          )}
          <div>
            <p className="text-base font-semibold text-white">
              {company?.name ?? "Company"}
            </p>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {company?.location ?? "Location unavailable"}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════
             DESCRIPTION SECTIONS
        ══════════════════════════════ */}
        <div className="flex flex-col gap-6 mb-10">

          <Section title="Job Description">
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {job.responsibilities}
            </p>
          </Section>

          <Section title="Requirements">
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {job.requirements}
            </p>
          </Section>

          {job.benefits && (
            <Section title="Benefits">
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {job.benefits}
              </p>
            </Section>
          )}
        </div>

        {/* ══════════════════════════════
             SIMILAR JOBS
        ══════════════════════════════ */}
        {similarJobs.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">
              Similar Jobs in {job.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarJobs.map((j) => (
                <JobCard key={j._id} job={j} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Reusable section block ── */
function Section({ title, children }) {
  return (
    <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 sm:p-8">
      <h2 className="text-base font-semibold text-white mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default JobDetailsPage;