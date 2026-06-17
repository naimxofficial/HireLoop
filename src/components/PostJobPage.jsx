"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TriangleExclamation, CircleCheck } from "@gravity-ui/icons";
import Link from "next/link";
import { createJob } from "@/lib/actions/jobs";

/* ── Static options ── */
const JOB_CATEGORIES = [
    "Engineering", "Design", "Marketing", "Sales", "Finance",
    "Human Resources", "Product", "Operations", "Data Science", "Customer Support",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "AED", "CAD", "AUD"];

/* ── Shared input class ── */
const inputCls =
    "w-full bg-[#0d0d15] border border-white/8 hover:border-white/14 focus:border-[#6b5ce7]/60 focus:ring-2 focus:ring-[#6b5ce7]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200";

const selectCls =
    "w-full bg-[#0d0d15] border border-white/8 hover:border-white/14 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 appearance-none cursor-pointer";

/* ── Section wrapper ── */
function Section({ title, description, children }) {
    return (
        <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden">
            {/* Section header */}
            <div className="px-6 py-4 border-b border-white/6">
                <h2 className="text-[15px] font-semibold text-white">{title}</h2>
                {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
            </div>
            <div className="px-6 py-6">{children}</div>
        </div>
    );
}

/* ── Field label ── */
function FieldLabel({ children, required }) {
    return (
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            {children}
            {required && <span className="text-[#7c6af7] ml-1">*</span>}
        </label>
    );
}

/* ── Inline error ── */
function InlineError({ message }) {
    if (!message) return null;
    return (
        <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
            <TriangleExclamation className="w-3 h-3 shrink-0" />
            {message}
        </p>
    );
}

export default function PostJobPage({ company }) {

    const router = useRouter();

    const [isRemote, setIsRemote] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});


    const [form, setForm] = useState({
        title: "",
        category: "",
        type: "",
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        location: "",
        deadline: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
    });

    function set(field, value) {
        setForm((p) => ({ ...p, [field]: value }));
        if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    }

    /* ── Validation ── */
    function validate() {
        const e = {};
        if (!form.title.trim()) e.title = "Job title is required.";
        if (!form.category) e.category = "Please select a category.";
        if (!form.type) e.type = "Please select a job type.";
        if (!form.salaryMin) e.salaryMin = "Minimum salary is required.";
        if (!form.salaryMax) e.salaryMax = "Maximum salary is required.";
        if (form.salaryMin && form.salaryMax && Number(form.salaryMin) >= Number(form.salaryMax))
            e.salaryMax = "Max must be greater than min.";
        if (!isRemote && !form.location.trim()) e.location = "Location is required or enable Remote.";
        if (!form.deadline) e.deadline = "Application deadline is required.";
        if (!form.responsibilities.trim()) e.responsibilities = "Responsibilities are required.";
        if (!form.requirements.trim()) e.requirements = "Requirements are required.";
        return e;
    }

    /* ── Submit ── */
    async function handleSubmit(e) {
        e.preventDefault();
        setServerError("");
        const v = validate();
        if (Object.keys(v).length) { setErrors(v); return; }
        setLoading(true);

        try {
            const data = await createJob({
                ...form,
                isRemote,
                location: isRemote ? "Remote" : form.location,
                status: "active",
                companyId: company?._id,
                companyLogo: company?.logoUrl
            });

            if (data?.error) {
                throw new Error(data.error || "Failed to post job.");
            }

            setSuccess(true);
            setTimeout(() => router.push("/dashboard/recruiter/jobs"), 1800);
        } catch (err) {
            setServerError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    /* ── Today string for min date ── */
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">

                {/* ── Top bar ── */}
                <div className="flex items-center gap-3 mb-8">
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Post a New Job</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Fill in the details to publish your listing.</p>
                    </div>
                </div>

                {/* ── Company guard ── */}
                {(!company || company.status !== "approved") && (
                    <div className="mb-6 flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3.5">
                        <TriangleExclamation className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-amber-400">
                                {!company ? "No company registered" : "Company pending approval"}
                            </p>
                            <p className="text-xs text-amber-400/70 mt-0.5">
                                {!company
                                    ? <>You need a registered and approved company to post jobs.{" "}
                                        <Link href="/dashboard/recruiter/company" className="underline">
                                            Register your company
                                        </Link>
                                    </>
                                    : "Your company is awaiting admin approval before you can post jobs."}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Success banner ── */}
                {success && (
                    <div className="mb-6 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3.5">
                        <CircleCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-emerald-400">Job posted successfully!</p>
                            <p className="text-xs text-emerald-400/70 mt-0.5">Redirecting to your jobs list…</p>
                        </div>
                    </div>
                )}

                {/* ── Server error banner ── */}
                {serverError && (
                    <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3.5">
                        <TriangleExclamation className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-red-400">{serverError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    {/* ══════════════════════════════
               SECTION 1 — JOB INFO
          ══════════════════════════════ */}
                    <Section title="Job Info" description="Basic details about the position.">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Job Title */}
                            <div className="sm:col-span-2">
                                <FieldLabel required>Job Title</FieldLabel>
                                <input
                                    value={form.title}
                                    onChange={(e) => set("title", e.target.value)}
                                    placeholder="e.g. Senior Frontend Developer"
                                    className={`${inputCls} ${errors.title ? "border-red-500/50" : ""}`}
                                />
                                <InlineError message={errors.title} />
                            </div>

                            {/* Job Category */}
                            <div>
                                <FieldLabel required>Job Category</FieldLabel>
                                <select
                                    value={form.category}
                                    onChange={(e) => set("category", e.target.value)}
                                    className={`${selectCls} ${errors.category ? "border-red-500/50" : ""}`}
                                >
                                    <option value="" disabled>Select category</option>
                                    {JOB_CATEGORIES.map((c) => (
                                        <option key={c} value={c} className="bg-[#0d0d15]">{c}</option>
                                    ))}
                                </select>
                                <InlineError message={errors.category} />
                            </div>

                            {/* Job Type */}
                            <div>
                                <FieldLabel required>Job Type</FieldLabel>
                                <select
                                    value={form.type}
                                    onChange={(e) => set("type", e.target.value)}
                                    className={`${selectCls} ${errors.type ? "border-red-500/50" : ""}`}
                                >
                                    <option value="" disabled>Select type</option>
                                    {JOB_TYPES.map((t) => (
                                        <option key={t} value={t} className="bg-[#0d0d15]">{t}</option>
                                    ))}
                                </select>
                                <InlineError message={errors.type} />
                            </div>

                            {/* Salary Min */}
                            <div>
                                <FieldLabel required>Min Salary</FieldLabel>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.salaryMin}
                                    onChange={(e) => set("salaryMin", e.target.value)}
                                    placeholder="e.g. 3000"
                                    className={`${inputCls} ${errors.salaryMin ? "border-red-500/50" : ""}`}
                                />
                                <InlineError message={errors.salaryMin} />
                            </div>

                            {/* Salary Max */}
                            <div>
                                <FieldLabel required>Max Salary</FieldLabel>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.salaryMax}
                                    onChange={(e) => set("salaryMax", e.target.value)}
                                    placeholder="e.g. 6000"
                                    className={`${inputCls} ${errors.salaryMax ? "border-red-500/50" : ""}`}
                                />
                                <InlineError message={errors.salaryMax} />
                            </div>

                            {/* Currency */}
                            <div>
                                <FieldLabel required>Currency</FieldLabel>
                                <select
                                    value={form.currency}
                                    onChange={(e) => set("currency", e.target.value)}
                                    className={selectCls}
                                >
                                    {CURRENCIES.map((c) => (
                                        <option key={c} value={c} className="bg-[#0d0d15]">{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Application Deadline */}
                            <div>
                                <FieldLabel required>Application Deadline</FieldLabel>
                                <input
                                    type="date"
                                    min={today}
                                    value={form.deadline}
                                    onChange={(e) => set("deadline", e.target.value)}
                                    className={`${inputCls} ${errors.deadline ? "border-red-500/50" : ""} [color-scheme:dark]`}
                                />
                                <InlineError message={errors.deadline} />
                            </div>

                            {/* Location + Remote toggle */}
                            <div className="sm:col-span-2">
                                <div className="flex items-center justify-between mb-1.5">
                                    <FieldLabel required={!isRemote}>
                                        Location
                                    </FieldLabel>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <span className="text-xs text-gray-500">Remote</span>
                                        <div
                                            onClick={() => setIsRemote((p) => !p)}
                                            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${isRemote ? "bg-[#6b5ce7]" : "bg-white/10"
                                                }`}
                                        >
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${isRemote ? "left-[18px]" : "left-0.5"
                                                }`} />
                                        </div>
                                    </label>
                                </div>
                                <input
                                    value={isRemote ? "Remote" : form.location}
                                    onChange={(e) => set("location", e.target.value)}
                                    disabled={isRemote}
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed ${errors.location ? "border-red-500/50" : ""
                                        }`}
                                />
                                <InlineError message={errors.location} />
                            </div>
                        </div>
                    </Section>

                    {/* ══════════════════════════════
               SECTION 2 — JOB DESCRIPTION
          ══════════════════════════════ */}
                    <Section title="Job Description" description="Help candidates understand what the role involves.">
                        <div className="flex flex-col gap-5">

                            {/* Responsibilities */}
                            <div>
                                <FieldLabel required>Responsibilities</FieldLabel>
                                <textarea
                                    rows={5}
                                    value={form.responsibilities}
                                    onChange={(e) => set("responsibilities", e.target.value)}
                                    placeholder="Describe the key responsibilities of this role..."
                                    className={`${inputCls} resize-y min-h-[120px] ${errors.responsibilities ? "border-red-500/50" : ""}`}
                                />
                                <InlineError message={errors.responsibilities} />
                            </div>

                            {/* Requirements */}
                            <div>
                                <FieldLabel required>Requirements</FieldLabel>
                                <textarea
                                    rows={5}
                                    value={form.requirements}
                                    onChange={(e) => set("requirements", e.target.value)}
                                    placeholder="List the skills, experience, and qualifications needed..."
                                    className={`${inputCls} resize-y min-h-[120px] ${errors.requirements ? "border-red-500/50" : ""}`}
                                />
                                <InlineError message={errors.requirements} />
                            </div>

                            {/* Benefits — optional */}
                            <div>
                                <FieldLabel>Benefits <span className="text-gray-600 font-normal normal-case tracking-normal ml-1">(optional)</span></FieldLabel>
                                <textarea
                                    rows={3}
                                    value={form.benefits}
                                    onChange={(e) => set("benefits", e.target.value)}
                                    placeholder="e.g. Health insurance, remote work, flexible hours..."
                                    className={`${inputCls} resize-y min-h-[80px]`}
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ══════════════════════════════
               SECTION 3 — COMPANY (auto-filled)
          ══════════════════════════════ */}
                    <Section title="Company" description="Auto-filled from your registered company.">
                        <div className="flex items-center gap-4 p-4 bg-[#0d0d15] border border-white/8 rounded-xl">
                            {company ? (
                                <>
                                    <div className="w-10 h-10 rounded-xl bg-[#1e1e28] border border-white/8 flex items-center justify-center shrink-0 text-lg font-bold text-white">
                                        {company.name?.[0] ?? "C"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{company.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{company.location} · {company.industry}</p>
                                    </div>
                                    <span className={`ml-auto text-[11px] font-semibold rounded-full px-2.5 py-0.5 border ${company.status === "approved"
                                            ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                                            : "text-amber-400 bg-amber-400/10 border-amber-400/20"
                                        }`}>
                                        {company.status === "approved" ? "Approved" : "Pending Approval"}
                                    </span>
                                </>
                            ) : (
                                <p className="text-sm text-gray-500">No approved company linked to your account.</p>
                            )}
                        </div>
                    </Section>

                    {/* ── Action Buttons ── */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 pb-8">
                        <Link
                            href="/dashboard/recruiter/jobs"
                            className="w-full sm:w-auto flex items-center justify-center border border-white/10 bg-white/4 hover:bg-white/8
                         text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading || success || !company || company.status !== "approved"}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#6b5ce7] hover:bg-[#7c6af7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#6b5ce7]/25">
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Publishing…
                                </>
                            ) : (
                                "Post Job"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}