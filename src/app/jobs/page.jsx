import FilterSidebar from "@/components/jobs/FilterSideBar";
import JobCard from "@/components/jobs/jobCard";
import { getJobs } from "@/lib/api/jobs";



const SALARY_BUCKETS = {
    "Under $50K": { min: 0, max: 50000 },
    "$50K – $100K": { min: 50000, max: 100000 },
    "$100K – $150K": { min: 100000, max: 150000 },
    "$150K+": { min: 150000, max: null },
};

export default async function JobsPage({ searchParams }) {
    const params = await searchParams;

    const q = params?.q ?? "";
    const types = params?.type?.split("|").filter(Boolean) ?? [];
    const categories = params?.category?.split("|").filter(Boolean) ?? [];
    const locations = params?.location?.split("|").filter(Boolean) ?? [];
    const salaryKey = params?.salary ?? "";


    const allJobs = await getJobs({ status: "active" });

    let jobs = allJobs;

    if (q) {
        const needle = q.toLowerCase();
        jobs = jobs.filter(
            (j) =>
                j.title?.toLowerCase().includes(needle) ||
                j.category?.toLowerCase().includes(needle) ||
                j.location?.toLowerCase().includes(needle)
        );
    }

    if (types.length) {
        jobs = jobs.filter((j) => types.includes(j.type));
    }

    if (categories.length) {
        jobs = jobs.filter((j) => categories.includes(j.category));
    }

    if (locations.length) {
        jobs = jobs.filter((j) => locations.includes(j.location));
    }

    if (salaryKey && SALARY_BUCKETS[salaryKey]) {
        const { min, max } = SALARY_BUCKETS[salaryKey];
        jobs = jobs.filter((j) => {
            const jobMin = Number(j.salaryMin);
            const jobMax = Number(j.salaryMax);
            if (max === null) return jobMax >= min;
            return jobMax >= min && jobMin <= max;
        });
    }

    const locationOptions = [...new Set(allJobs.map((j) => j.location).filter(Boolean))].sort();

    return (
        <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Browse Jobs
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {jobs.length} open position{jobs.length !== 1 ? "s" : ""} found
                    </p>
                </div>

                {/* ── Responsive layout ──
            Mobile/Tablet : sidebar stacks ABOVE the job grid (flex-col)
            Desktop (lg+) : sidebar sits LEFT of the job grid (flex-row)
        ── */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    <FilterSidebar locations={locationOptions} />

                    {/* Job Cards Grid */}
                    <div className="flex-1">
                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-[#111118] border border-white/8 rounded-2xl">
                                <p className="text-sm text-gray-500">
                                    No jobs match your filters. Try adjusting your search.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}