"use client";

import { useState } from "react";
import { ArrowRight, CrownDiamond, ChartBar, Thunderbolt, Plus } from "@gravity-ui/icons";

const plans = [
  {
    icon: CrownDiamond,
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    tagline: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
  },
  {
    icon: ChartBar,
    name: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 13,
    tagline: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
  },
  {
    icon: Thunderbolt,
    name: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 74,
    tagline: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="bg-[#0a0a0f] py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-[6px] h-[6px] bg-[#6b5ce7] rounded-sm inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">
              Pricing
            </span>
            <span className="w-[6px] h-[6px] bg-[#6b5ce7] rounded-sm inline-block" />
          </div>

          <h2 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] font-medium text-white leading-[1.1] tracking-tight max-w-xl">
            Pay for the leverage,<br />not the listings
          </h2>
        </div>

        {/* ── Billing Toggle ── */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex items-center bg-[#18181f] border border-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-white text-[#0a0a0f] shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billing === "yearly"
                  ? "bg-white text-[#0a0a0f] shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="bg-[#c026d3] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(({ icon: Icon, name, monthlyPrice, yearlyPrice, tagline, features, highlighted }) => {
            const price = billing === "monthly" ? monthlyPrice : yearlyPrice;
            return (
              <div
                key={name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 transition-all duration-200 ${
                  highlighted
                    ? "bg-[#18181f] border-white/20 shadow-2xl shadow-black/60"
                    : "bg-[#111118] border-white/8"
                }`}
              >
                {/* Plan header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1e1e28] border border-white/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#7c6af7]" />
                    </div>
                    <span className="text-lg font-semibold text-white">{name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[2rem] sm:text-[2.2rem] font-bold text-white leading-none">
                      ${price}
                    </span>
                    <span className="text-[13px] text-gray-500 ml-0.5">/month</span>
                  </div>
                </div>

                {/* Feature list */}
                <p className="text-[13px] text-gray-300 font-medium mb-4">{tagline}</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-md bg-[#1e1e28] border border-white/10 flex items-center justify-center shrink-0">
                        <Plus className="w-3 h-3 text-gray-400" />
                      </span>
                      <span className="text-[13px] text-gray-400">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <button
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      highlighted
                        ? "bg-white text-[#0a0a0f] hover:bg-gray-100"
                        : "bg-[#1e1e28] text-white border border-white/10 hover:bg-[#252530]"
                    }`}
                  >
                    Choose This Plan
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}