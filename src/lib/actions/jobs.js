'use server';
const baseUrl = process.env.NEXT_PUBLIC_URL;
export const createJob = async (newJobData) => {
    const res = await fetch(`${baseUrl}/api/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJobData)
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data?.message || "Failed to post job." };
    }
    return data;
}
export async function getActiveJobCount(companyId) {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=active`, { cache: "no-store" });
    if (!res.ok) return 0;
    const jobs = await res.json();
    return jobs.length;
}