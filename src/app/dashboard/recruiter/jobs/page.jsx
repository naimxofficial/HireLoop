import JobsTable from "@/components/JobsTable";
import { getCompany } from "@/lib/actions/companies";
import { getCompanyJobs } from "@/lib/api/jobs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const RecruiterJobsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const recruiterId = session?.user?.id;
    const company = await getCompany(recruiterId);
    const jobs = await getCompanyJobs(company?._id);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Company Jobs</h1>
            {/* Pass the fetched jobs to the client component */}
            <JobsTable jobs={jobs} />
        </div>
    );
};

export default RecruiterJobsPage;