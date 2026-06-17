
import RecruiterCompany from "@/components/Recruitercompany";
import { getCompany } from "@/lib/actions/companies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const recruiterId = session?.user?.id;

  const initialCompany = await getCompany(recruiterId);

  return (
    <RecruiterCompany
      recruiterId={recruiterId}
      initialCompany={initialCompany}
    />
  );
}