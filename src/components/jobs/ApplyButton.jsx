"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, TriangleExclamation } from "@gravity-ui/icons";

export default function ApplyButton({ jobId, isLoggedIn }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleApply() {
    if (!isLoggedIn) {
      router.push(`/signin?redirect=/jobs/${jobId}`);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // TODO: replace with your real apply server action once application-limit logic is ready
      // const result = await applyToJob(jobId);
      // if (result?.error) throw new Error(result.error);

      await new Promise((r) => setTimeout(r, 600)); // placeholder delay
      setStatus("applied");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    }
  }

  if (status === "applied") {
    return (
      <div className="shrink-0 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold px-6 py-3 rounded-xl">
        <CircleCheck className="w-4 h-4" />
        Application Sent
      </div>
    );
  }

  return (
    <div className="shrink-0 flex flex-col gap-2">
      <button
        onClick={handleApply}
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 bg-[#6b5ce7] hover:bg-[#7c6af7]
                   disabled:opacity-60 disabled:cursor-not-allowed
                   text-white text-sm font-semibold px-7 py-3 rounded-xl
                   transition-all duration-200 shadow-lg shadow-[#6b5ce7]/25 whitespace-nowrap"
      >
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Applying…
          </>
        ) : isLoggedIn ? (
          "Apply Now"
        ) : (
          "Sign In to Apply"
        )}
      </button>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <TriangleExclamation className="w-3 h-3 shrink-0" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}