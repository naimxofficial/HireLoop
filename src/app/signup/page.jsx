"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash, CircleCheck, TriangleExclamation } from "@gravity-ui/icons";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm]           = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass]   = useState(false);
  const [errors, setErrors]       = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);

  /* ── Validation ── */
  function validate() {
    const e = {};
    if (!form.name.trim())                      e.name     = "Name is required.";
    if (!form.email.trim())                     e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email    = "Enter a valid email address.";
    if (!form.password)                         e.password = "Password is required.";
    else if (form.password.length < 8)          e.password = "Password must be at least 8 characters.";
    return e;
  }

  /* ── Submit ── */
  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await authClient.signUp.email({
        name:     form.name,
        email:    form.email,
        password: form.password,
      });

      setSuccess(true);
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err) {
      setServerError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  /* ── Field config ── */
  const fields = [
    { name: "name",     label: "Full Name",       type: "text",     placeholder: "John Doe" },
    { name: "email",    label: "Email Address",   type: "email",    placeholder: "john@example.com" },
    { name: "password", label: "Password",        type: "password", placeholder: "Min. 8 characters" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-25">

      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(107,92,231,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="HireLoop" width={130} height={36} className="h-8 w-auto" priority />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/60">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Join thousands finding their dream roles on HireLoop.
            </p>
          </div>

          {/* Success banner */}
          {success && (
            <div className="mb-6 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3.5">
              <CircleCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-400">Account created!</p>
                <p className="text-xs text-emerald-400/70 mt-0.5">Redirecting you to sign in…</p>
              </div>
            </div>
          )}

          {/* Server error banner */}
          {serverError && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3.5">
              <TriangleExclamation className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-red-400">{serverError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {label}
                </label>

                <div className="relative">
                  <input
                    name={name}
                    type={name === "password" ? (showPass ? "text" : "password") : type}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete={name === "password" ? "new-password" : name}
                    className={`w-full bg-[#0d0d15] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200
                      focus:ring-2 focus:ring-[#6b5ce7]/50 focus:border-[#6b5ce7]/60
                      ${errors[name] ? "border-red-500/50" : "border-white/8 hover:border-white/14"}`}
                  />

                  {/* Password eye toggle */}
                  {name === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPass
                        ? <EyeSlash className="w-4 h-4" />
                        : <Eye className="w-4 h-4" />
                      }
                    </button>
                  )}
                </div>

                {/* Inline field error */}
                {errors[name] && (
                  <p className="text-xs text-red-400 flex items-center gap-1.5 mt-0.5">
                    <TriangleExclamation className="w-3 h-3 shrink-0" />
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="mt-1 w-full bg-[#6b5ce7] hover:bg-[#7c6af7] disabled:opacity-60 disabled:cursor-not-allowed
                         text-white text-sm font-semibold py-3.5 rounded-xl
                         transition-all duration-200 shadow-lg shadow-[#6b5ce7]/25
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-xs text-gray-600">Already have an account?</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          {/* Sign in link */}
          <Link
            href="/signin"
            className="w-full flex items-center justify-center border border-white/10 bg-white/4
                       hover:bg-white/8 text-white text-sm font-medium py-3 rounded-xl
                       transition-all duration-200"
          >
            Sign In
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-600 mt-6">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-gray-500 hover:text-gray-300 underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-gray-500 hover:text-gray-300 underline underline-offset-2">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </main>
  );
}