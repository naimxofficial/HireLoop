"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Magnifier, ChevronDown, Xmark } from "@gravity-ui/icons";

/* ── Static filter options ── */
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const CATEGORIES = [
    "Engineering", "Design", "Marketing", "Sales", "Finance",
    "Human Resources", "Product", "Operations", "Data", "Customer Support",
];

const SALARY_BUCKETS = [
    { label: "Under $50K", min: 0, max: 50000 },
    { label: "$50K – $100K", min: 50000, max: 100000 },
    { label: "$100K – $150K", min: 100000, max: 150000 },
    { label: "$150K+", min: 150000, max: null },
];

/* ── Reusable collapsible filter group ── */
function FilterGroup({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-white/8 pb-5 last:border-b-0 last:pb-0">
            <button
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between mb-3"
            >
                <span className="text-sm font-semibold text-white">{title}</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && <div className="flex flex-col gap-2.5">{children}</div>}
        </div>
    );
}

/* ── Checkbox row ── */
function CheckRow({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
            <span
                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors duration-150 ${checked ? "bg-[#6b5ce7] border-[#6b5ce7]" : "border-white/15 group-hover:border-white/30"
                    }`}
            >
                {checked && (
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-none stroke-white stroke-[2.2]">
                        <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
            <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                {label}
            </span>
        </label>
    );
}

export default function FilterSidebar({ locations }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");

    const activeTypes = searchParams.get("type")?.split("|").filter(Boolean) ?? [];
    const activeCategories = searchParams.get("category")?.split("|").filter(Boolean) ?? [];
    const activeLocations = searchParams.get("location")?.split("|").filter(Boolean) ?? [];
    const activeSalary = searchParams.get("salary") ?? "";

    /* ── Push updated params to the URL ── */
    function updateParams(updater) {
        const params = new URLSearchParams(searchParams.toString());
        updater(params);
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    }

    function toggleMultiValue(key, value, currentList) {
        updateParams((params) => {
            const next = currentList.includes(value)
                ? currentList.filter((v) => v !== value)
                : [...currentList, value];
            next.length ? params.set(key, next.join("|")) : params.delete(key);
        });
    }

    function setSalary(bucketLabel) {
        updateParams((params) => {
            activeSalary === bucketLabel ? params.delete("salary") : params.set("salary", bucketLabel);
        });
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        updateParams((params) => {
            keyword.trim() ? params.set("q", keyword.trim()) : params.delete("q");
        });
    }

    function clearAll() {
        setKeyword("");
        startTransition(() => router.push(pathname));
    }

    const hasActiveFilters =
        activeTypes.length || activeCategories.length || activeLocations.length || activeSalary || searchParams.get("q");

    return (
        <aside className={`w-full lg:w-72 shrink-0 ${isPending ? "opacity-70" : ""} transition-opacity duration-150`}>
            <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">

                {/* Search bar */}
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-[#0d0d15] border border-white/8 rounded-xl px-3.5 py-2.5">
                        <Magnifier className="w-4 h-4 text-gray-500 shrink-0" />
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search jobs..."
                            className="bg-transparent text-sm text-white placeholder-gray-600 outline-none w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="shrink-0 bg-[#6b5ce7] hover:bg-[#7c6af7] transition-colors rounded-xl px-3.5 py-2.5"
                    >
                        <Magnifier className="w-4 h-4 text-white" />
                    </button>
                </form>

                {/* Header row + clear */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Filters</span>
                    {hasActiveFilters && (
                        <button
                            onClick={clearAll}
                            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
                        >
                            <Xmark className="w-3 h-3" />
                            Clear all
                        </button>
                    )}
                </div>

                {/* Job Type */}
                <FilterGroup title="Job Type">
                    {JOB_TYPES.map((type) => (
                        <CheckRow
                            key={type}
                            label={type}
                            checked={activeTypes.includes(type)}
                            onChange={() => toggleMultiValue("type", type, activeTypes)}
                        />
                    ))}
                </FilterGroup>

                {/* Category */}
                <FilterGroup title="Category" defaultOpen={false}>
                    {CATEGORIES.map((cat) => (
                        <CheckRow
                            key={cat}
                            label={cat}
                            checked={activeCategories.includes(cat)}
                            onChange={() => toggleMultiValue("category", cat, activeCategories)}
                        />
                    ))}
                </FilterGroup>

                {/* Location */}
                <FilterGroup title="Location" defaultOpen={false}>
                    {locations.map((loc) => (
                        <CheckRow
                            key={loc}
                            label={loc}
                            checked={activeLocations.includes(loc)}
                            onChange={() => toggleMultiValue("location", loc, activeLocations)}
                        />
                    ))}
                </FilterGroup>

                {/* Salary Range — preset buckets, single-select */}
                <FilterGroup title="Salary Range">
                    {SALARY_BUCKETS.map((bucket) => (
                        <CheckRow
                            key={bucket.label}
                            label={bucket.label}
                            checked={activeSalary === bucket.label}
                            onChange={() => setSalary(bucket.label)}
                        />
                    ))}
                </FilterGroup>
            </div>
        </aside>
    );
}