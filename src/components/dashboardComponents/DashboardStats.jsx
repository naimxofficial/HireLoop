import { FileText, PersonWorker, Thunderbolt, CircleCheckFill } from "@gravity-ui/icons";

const stats = [
    { icon: FileText, label: "Total Job Posts", value: "48" },
    { icon: PersonWorker, label: "Total Applicants", value: "1,284" },
    { icon: Thunderbolt, label: "Active Jobs", value: "18" },
    { icon: CircleCheckFill, label: "Jobs Closed", value: "32" },
];

export default function DashboardStats() {
    return (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 mt-5">
            {stats.map(({ icon: Icon, label, value }) => (
                <div
                    key={label}
                    className="bg-[#111118] border border-white/8 rounded-2xl p-3 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5 lg:gap-6"
                >
                    {/* Icon box */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1e1e28] border border-white/8 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                    </div>

                    {/* Label + Value */}
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <span className="text-xs sm:text-sm text-gray-500 leading-snug">
                            {label}
                        </span>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-none tracking-tight">
                            {value}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}