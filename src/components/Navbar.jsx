"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars, Xmark } from "@gravity-ui/icons";
import { clsx } from "clsx";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3">

      {/* ── Floating navbar pill ── */}
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between
                    bg-[#16161e]/95 backdrop-blur-md
                    border border-white/8
                    rounded-2xl
                    px-4 sm:px-6 h-14
                    transition-all duration-300
                    ${scrolled ? "shadow-xl shadow-black/40" : "shadow-lg shadow-black/20"}`}
      >

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={120}
            height={32}
            priority
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Sign In */}
          <Link
            href="/signin"
            className="text-sm font-semibold text-[#7c6af7] hover:text-[#9d8fff] transition-colors duration-200"
          >
            Sign In
          </Link>

          {/* Get Started - Desktop */}
          <Link
            href="/signup"
            className={clsx(
              "inline-flex items-center justify-center bg-[#6b5ce7] hover:bg-[#7c6af7]",
              "text-white text-sm font-semibold px-5 h-9 rounded-xl",
              "transition-all duration-200 shadow-md shadow-[#6b5ce7]/30 hover:shadow-[#7c6af7]/40"
            )}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <Xmark className="w-5 h-5" />
          ) : (
            <Bars className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ── Mobile dropdown (sits below the pill) ── */}
      <div
        className={`md:hidden mx-auto max-w-7xl overflow-hidden transition-all duration-300 ease-in-out
                    ${menuOpen ? "max-h-72 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
      >
        <div className="bg-[#16161e]/95 backdrop-blur-md border border-white/8 rounded-2xl px-5 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-300 hover:text-white transition-colors font-medium py-1"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-white/8" />

          <Link
            href="/signin"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#7c6af7] hover:text-[#9d8fff] transition-colors py-1"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className={clsx(
              "inline-flex items-center justify-center bg-[#6b5ce7] hover:bg-[#7c6af7]",
              "text-white text-sm font-semibold h-10 rounded-xl w-full",
              "transition-all duration-200 shadow-md shadow-[#6b5ce7]/30"
            )}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}