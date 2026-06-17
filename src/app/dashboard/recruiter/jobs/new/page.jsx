import PostJobPage from "@/components/PostJobPage";
import { getCompany } from "@/lib/actions/companies";
import { getActiveJobCount } from "@/lib/actions/jobs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function NewJobPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const recruiterId = session?.user?.id;
  const company = await getCompany(recruiterId);
  const PLAN_LIMITS = { free: 3, growth: 10, enterprise: 50 };

  const activeJobCount = await getActiveJobCount(company?._id);
  const limit = PLAN_LIMITS[company?.plan ?? "free"];
  const limitReached = activeJobCount >= limit;

  return <PostJobPage company={company} limitReached={limitReached} activeJobCount={activeJobCount} limit={limit} />;
}