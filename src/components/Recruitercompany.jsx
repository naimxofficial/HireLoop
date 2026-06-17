"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Pin,
  Pencil,
  TriangleExclamation,
  CircleCheck,
  Factory,
  Persons,
  Globe,
  FolderArrowUpIn,
} from "@gravity-ui/icons";
import { createCompany, updateCompany } from "@/lib/actions/companies";

/* ── Static options ── */
const INDUSTRIES = [
  "Technology", "Finance", "Healthcare", "Education", "Retail",
  "Manufacturing", "Marketing", "Real Estate", "Hospitality", "Other",
];

const EMPLOYEE_RANGES = [
  "1-10 employees", "11-50 employees", "51-200 employees",
  "201-500 employees", "501-1000 employees", "1000+ employees",
];

const inputCls =
  "w-full bg-[#0d0d15] border border-white/8 hover:border-white/14 focus:border-[#6b5ce7]/60 focus:ring-2 focus:ring-[#6b5ce7]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200";

const selectCls =
  "w-full bg-[#0d0d15] border border-white/8 hover:border-white/14 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 appearance-none cursor-pointer";

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
      {children}
      {required && <span className="text-[#7c6af7] ml-1">*</span>}
    </label>
  );
}

function InlineError({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
      <TriangleExclamation className="w-3 h-3 shrink-0" />
      {message}
    </p>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }) {
  const config = {
    pending: { label: "Pending Review", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    approved: { label: "Approved", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    rejected: { label: "Rejected", cls: "text-red-400 bg-red-400/10 border-red-400/20" },
  };
  const { label, cls } = config[status?.toLowerCase()] ?? config.pending;
  return (
    <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border ${cls}`}>
      {label}
    </span>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function RecruiterCompany({ recruiterId, initialCompany }) {
  const [company, setCompany] = useState(initialCompany ?? null);
  const [mode, setMode] = useState("view");
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: company?.name ?? "",
    industry: company?.industry ?? "",
    website: company?.website ?? "",
    location: company?.location ?? "",
    employeeRange: company?.employeeRange ?? "",
    logoUrl: company?.logoUrl ?? "",
    description: company?.description ?? "",
  });

  function set(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Company name is required.";
    if (!form.industry) e.industry = "Please select an industry.";
    if (!form.website.trim()) e.website = "Website URL is required.";
    else if (!/^https?:\/\/.+\..+/.test(form.website))
      e.website = "Enter a valid URL.";
    if (!form.location.trim()) e.location = "Location is required.";
    if (!form.employeeRange) e.employeeRange = "Please select employee range.";
    if (!form.description.trim()) e.description = "A short description is required.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    startTransition(async () => {
      const payload = { ...form, recruiterId };

      const result = company
        ? await updateCompany(company._id, payload)
        : await createCompany(payload);

      if (result?.error) {
        setServerError(result.error);
        return;
      }

      const saved = result?.company ?? result?.insertedId
        ? { ...payload, _id: result.insertedId ?? company?._id, status: "pending" }
        : { ...payload, status: "pending" };

      setCompany(saved);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMode("view");
      }, 1500);
    });
  }

  async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!data?.success) throw new Error("Image upload failed.");
    return data.data.url; // the hosted image link
  }
  async function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setServerError("");
    try {
      const url = await uploadToImgBB(file);
      set("logoUrl", url);
    } catch (err) {
      setServerError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  /* ── No company yet — prompt ── */
  if (mode === "view" && !company) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#111118] border border-white/8 flex items-center justify-center mx-auto mb-6">
            <Factory className="w-7 h-7 text-gray-500" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">No company registered yet</h1>
          <p className="text-sm text-gray-500 mt-2 mb-7 leading-relaxed">
            Register your business details to start hiring on HireLoop.
          </p>
          <button
            onClick={() => setMode("form")}
            className="inline-flex items-center justify-center bg-[#6b5ce7] hover:bg-[#7c6af7] text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#6b5ce7]/25">
            Register Company
          </button>
        </div>
      </div>
    );
  }

  /* ── View mode — company details ── */
  if (mode === "view" && company) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">

          <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 sm:px-8 py-6 border-b border-white/6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl object-cover border border-white/8"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-[#1e1e28] border border-white/8 flex items-center justify-center text-xl font-bold text-white shrink-0">
                    {company.name?.[0] ?? "C"}
                  </div>
                )}
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">{company.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={company.status} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMode("form")}
                className="shrink-0 inline-flex items-center gap-2 border border-white/10 bg-white/4 hover:bg-white/8 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200">
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem icon={Factory} label="Industry" value={company.industry} />
              <DetailItem icon={Globe} label="Website" value={company.website} isLink />
              <DetailItem icon={Pin} label="Location" value={company.location} />
              <DetailItem icon={Persons} label="Employee Count" value={company.employeeRange} />

              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Description
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{company.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form mode — register / edit ── */
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">

        <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-white/6">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {company ? "Edit Company" : "Register New Company"}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {company
                ? "Editing will require admin re-approval."
                : "Enter your business details to start hiring on HireLoop."}
            </p>
          </div>

          {/* Banners */}
          <div className="px-6 sm:px-8 pt-6">
            {success && (
              <div className="mb-6 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3.5">
                <CircleCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-400">
                    Company {company ? "updated" : "registered"} successfully!
                  </p>
                  <p className="text-xs text-emerald-400/70 mt-0.5">
                    Pending admin approval before it appears publicly.
                  </p>
                </div>
              </div>
            )}
            {serverError && (
              <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3.5">
                <TriangleExclamation className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-400">{serverError}</p>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="px-6 sm:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Company Name */}

              <div>
                <FieldLabel required>Company Name</FieldLabel>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className={`${inputCls} ${errors.name ? "border-red-500/50" : ""}`}
                />
                <InlineError message={errors.name} />
              </div>
              <div>
                <FieldLabel>Company Logo</FieldLabel>
                <div className="flex items-center gap-3">
                  <label
                    className={`shrink-0 w-15 h-15 rounded-xl bg-[#0d0d15] border border-dashed border-white/14 flex items-center justify-center cursor-pointer hover:border-white/24 transition-colors overflow-hidden ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {form.logoUrl ? (
                      <Image src={form.logoUrl} alt="Logo preview" width={60} height={60} className="w-full h-full object-cover" />
                    ) : (
                      <FolderArrowUpIn className="w-5 h-5 text-gray-500" />
                    )}
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </label>
                  <div>
                    <p className="text-sm text-white font-medium">
                      {uploading ? "Uploading…" : "Upload image"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Industry */}
              <div>
                <FieldLabel required>Industry / Category</FieldLabel>
                <select
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  className={`${selectCls} ${errors.industry ? "border-red-500/50" : ""}`}
                >
                  <option value="" disabled>Select industry</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i} className="bg-[#0d0d15]">{i}</option>
                  ))}
                </select>
                <InlineError message={errors.industry} />
              </div>

              {/* Website URL */}
              <div>
                <FieldLabel required>Website URL</FieldLabel>
                <input
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://www.company.com"
                  className={`${inputCls} ${errors.website ? "border-red-500/50" : ""}`}
                />
                <InlineError message={errors.website} />
              </div>

              {/* Location */}
              <div>
                <FieldLabel required>Location</FieldLabel>
                <input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="City, Country"
                  className={`${inputCls} ${errors.location ? "border-red-500/50" : ""}`}
                />
                <InlineError message={errors.location} />
              </div>

              {/* Employee Range */}
              <div>
                <FieldLabel required>Employee Count Range</FieldLabel>
                <select
                  value={form.employeeRange}
                  onChange={(e) => set("employeeRange", e.target.value)}
                  className={`${selectCls} ${errors.employeeRange ? "border-red-500/50" : ""}`}
                >
                  <option value="" disabled>Select range</option>
                  {EMPLOYEE_RANGES.map((r) => (
                    <option key={r} value={r} className="bg-[#0d0d15]">{r}</option>
                  ))}
                </select>
                <InlineError message={errors.employeeRange} />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <FieldLabel required>Brief Description</FieldLabel>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Tell us about your company's mission and culture..."
                  className={`${inputCls} resize-y min-h-25 ${errors.description ? "border-red-500/50" : ""}`}
                />
                <InlineError message={errors.description} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-8 pt-6 border-t border-white/6">
              <button
                type="button"
                onClick={() => (company ? setMode("view") : null)}
                disabled={!company}
                className="w-full sm:w-auto flex items-center justify-center border border-white/10 bg-white/4 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 disabled:opacity-60 text-[#0a0a0f] text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200">
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Saving…
                  </>
                ) : company ? (
                  "Save Changes"
                ) : (
                  "Register Company"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Detail row for view mode ── */
function DetailItem({ icon: Icon, label, value, isLink }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#1e1e28] border border-white/8 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#7c6af7] hover:text-[#9d8fff] transition-colors break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-white">{value}</p>
        )}
      </div>
    </div>
  );
}