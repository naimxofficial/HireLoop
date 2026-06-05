import {
  Magnifier,
  ChartLine,
  ChartBar,
  Bookmark,
  HandPointUp,
  FileText,
  Shapes3,
  ChartLineArrowUp,
} from "@gravity-ui/icons";

const features = [
  {
    icon: Magnifier,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartBar,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: HandPointUp,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Shapes3,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: ChartLineArrowUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesJob() {
  return (
    <section className="bg-[#0d0d12] py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-[6px] h-[6px] bg-[#6b5ce7] rounded-sm inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">
              Features Job
            </span>
            <span className="w-[6px] h-[6px] bg-[#6b5ce7] rounded-sm inline-block" />
          </div>

          <h2 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem]  text-white leading-[1.1] tracking-tight font-medium">
            Everything you need<br />to succeed
          </h2>
        </div>

        {/* ── Features Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-y-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">

              {/* Icon box */}
              <div className="shrink-0 w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-xl bg-[#17171f] border border-white/8 flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#7c6af7]" />
              </div>

              {/* Text */}
              <div className="pt-1">
                <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}