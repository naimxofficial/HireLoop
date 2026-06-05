"use client";

import { useState } from "react";
import {
  Magnifier,
  OfficeBadge,
  Person,
  Star,
  Briefcase,
  LocationArrow,
} from "@gravity-ui/icons";
import HeroBackground from "./HeroBackground";

const stats = [
  { icon: Briefcase,   value: "50K",  label: "Active Jobs" },
  { icon: OfficeBadge, value: "12K",  label: "Companies" },
  { icon: Person,      value: "2M",   label: "Job Seekers" },
  { icon: Star,        value: "97%",  label: "Satisfaction Rate" },
];

const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function HeroStats() {
  const [jobQuery, setJobQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden min-h-screen">

      {/* ── All background layers (globe, glows, fades, stars) ── */}
      <HeroBackground />

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-28 sm:pt-32">

        {/* Badge with extending lines */}
        <div className="flex items-center mb-7 sm:mb-8">
          <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-white/20" />
          <div className="flex items-center gap-2 border border-white/15 bg-[#16161f] rounded-full px-3.5 sm:px-4 py-[6px] sm:py-[7px] mx-1">
            <span className="text-xs sm:text-sm">🏅</span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-white">
              50,000+{" "}
              <span className="text-gray-400 font-normal">New Jobs This Month</span>
            </span>
          </div>
          <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Headline */}
        <h1 className="text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]  text-white leading-[1.08] tracking-tight max-w-xs sm:max-w-xl md:max-w-2xl font-medium">
          Find Your Dream Job Today
        </h1>

        {/* Subheadline */}
        <p className="mt-4 sm:mt-5 text-[13px] sm:text-[15px] text-gray-400 max-w-xs sm:max-w-md leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div className="mt-6 sm:mt-8 w-full max-w-xs sm:max-w-xl md:max-w-2xl flex items-center bg-[#13131e]/90 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/60">

          {/* Mobile: stacked; SM+: side by side */}
          <div className="flex items-center gap-2 flex-1 px-4 sm:px-5 py-[11px] sm:py-[13px] min-w-0">
            <Magnifier className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] text-gray-500 shrink-0" />
            <input
              type="text"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              placeholder="Job title, skill or company"
              className="bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 outline-none w-full"
            />
          </div>

          <div className="w-px h-5 bg-white/10 shrink-0" />

          <div className="flex items-center gap-2 flex-1 px-4 sm:px-5 py-[11px] sm:py-[13px] min-w-0">
            <LocationArrow className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] text-gray-500 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Remote"
              className="bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 outline-none w-full"
            />
          </div>

          <button className="m-1.5 sm:m-2 bg-[#6b5ce7] hover:bg-[#7c6af7] active:scale-95 transition-all rounded-lg sm:rounded-xl p-2 sm:p-[10px] shrink-0">
            <Magnifier className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* Trending tags */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <span className="text-[12px] sm:text-[13px] text-gray-500">Trending Position</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              className="text-[12px] sm:text-[13px] text-gray-300 bg-transparent hover:bg-white/8 border border-white/15 rounded-full px-3 sm:px-3.5 py-0.5 sm:py-1 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* "Assisting over…" — floats over globe centre */}
        {/* Spacer pushes text down to globe mid-point */}
        <div className="mt-[120px] sm:mt-[160px] md:mt-[200px] lg:mt-[240px] mb-6 sm:mb-8">
          <p className="text-[15px] sm:text-[17px] md:text-xl text-gray-300 font-medium text-center leading-snug">
            Assisting over{" "}
            <span className="text-white font-bold">15,000 job seekers</span>
            <br />
            find their dream positions.
          </p>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 px-3 sm:px-4 pb-10 sm:pb-12">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="bg-[#0f0f18]/90 backdrop-blur-md border border-white/8 rounded-xl sm:rounded-2xl px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 flex flex-col gap-2 sm:gap-3 hover:border-white/16 transition-colors duration-200 shadow-xl shadow-black/60"
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <span className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-medium text-white leading-none tracking-tight mt-1 sm:mt-2">
              {value}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}