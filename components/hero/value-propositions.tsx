import { Zap, Calculator, Users, Building } from "lucide-react";

interface ValueProposition {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    bgColor: string;
}

const valuePropositions: ValueProposition[] = [
    {
        icon: Zap,
        title: "Instant Results",
        subtitle: "No waiting, no paperwork",
        bgColor: "bg-green-500",
    },
    {
        icon: Calculator,
        title: "100% Accurate",
        subtitle: "UAE Labour Law 2025",
        bgColor: "bg-blue-500",
    },
    {
        icon: Users,
        title: "All Employee Types",
        subtitle: "Private, domestic, free zone",
        bgColor: "bg-purple-500",
    },
    {
        icon: Building,
        title: "All Emirates",
        subtitle: "Dubai, Abu Dhabi & more",
        bgColor: "bg-orange-500",
    },
];

export default function ValuePropositions() {
    return (
        <div className="grid sm:grid-cols-2 gap-4 mb-5 lg:mb-8">
            {valuePropositions.map((prop, index) => {
                const Icon = prop.icon;
                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20"
                    >
                        <div className={`${prop.bgColor} rounded-full p-1`}>
                            <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <div className="font-semibold text-sm">
                                {prop.title}
                            </div>
                            <div className="text-xs text-blue-200">
                                {prop.subtitle}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
