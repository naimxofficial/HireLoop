import Link from "next/link";
import Image from "next/image";
import { LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";

const footerLinks = {
  Product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salary-data" },
  ],
  Navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/newsroom" },
  ],
};

const socialLinks = [
  { icon: LogoFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: LogoGithub, href: "https://github.com", label: "GitHub" },
  { icon: LogoLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-between">

          {/* Left — Logo + tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="HireLoop"
                width={130}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right — Link columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-3 min-w-[110px]">
                <h4
                  className={`text-sm font-semibold ${
                    heading === "Product"
                      ? "text-[#f97316]"
                      : heading === "Navigations"
                      ? "text-[#7c6af7]"
                      : "text-[#7c6af7]"
                  }`}
                >
                  {heading}
                </h4>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-white/5" />

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-gray-300" />
              </a>
            ))}
          </div>

          {/* Copyright + Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-600">
            <span>Copyright 2024 — Programming Hero</span>
            <div className="flex items-center gap-2">
              <Link href="/terms" className="hover:text-gray-400 transition-colors">
                Terms &amp; Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}