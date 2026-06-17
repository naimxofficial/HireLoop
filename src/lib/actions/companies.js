'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const createCompany = async (newCompanyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCompanyData),
  });

  const data = await res.json();
  if (!res.ok) {
    return { error: data?.message || "Failed to create company." };
  }
  return data;
};


export const getCompany = async (recruiterId) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/companies/recruiter/${recruiterId}`,
      { cache: "no-store" }
    );

    if (res.status === 404) return null;

    const data = await res.json();
    if (!res.ok) {
      console.error("getCompany failed:", data?.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("getCompany error:", err);
    return null;
  }
};


export const updateCompany = async (companyId, updatedData) => {
  try {
    const res = await fetch(`${baseUrl}/api/companies/${companyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updatedData, status: "pending" }),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      data = { message: "Invalid response from server" };
    }

    if (!res.ok) {
      return {
        error: data?.message || data?.error || "Failed to update company."
      };
    }

    return data;
  } catch (err) {
    console.error("Update company error:", err);
    return { error: "Network error or server unreachable." };
  }
};

export const getCompanyById = async (companyId) => {
  if (!companyId) return null;
  try {
    const res = await fetch(`${baseUrl}/api/companies/${companyId}`, { cache: "no-store" });
    if (res.status === 404) return null;
    const data = await res.json();
    if (!res.ok) return null;
    return data;
  } catch (err) {
    console.error("getCompanyById error:", err);
    return null;
  }
};