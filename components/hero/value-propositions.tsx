import { LucideIcon } from "@/components/lucide-icon";
import { cn } from "@/lib/utils";

interface ValuePropositionItem {
    icon?: string;
    title: string;
    subtitle: string;
}

interface ValuePropositionsProps {
    items: ValuePropositionItem[];
}

const BG_COLORS = [
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
] as const;

export default function ValuePropositions({ items }: ValuePropositionsProps) {
    return (
        <div className="grid sm:grid-cols-2 gap-4 mb-5 lg:mb-8">
            {items.map((prop, index) => {
                const bgColor = BG_COLORS[index % BG_COLORS.length];

                return (
                    <div
                        key={index}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20"
                    >
                        <span className={cn(bgColor, "rounded-full p-1.5 mt-1")}>
                            <LucideIcon
                                name={prop.icon}
                                className="size-4 text-white"
                            />
                        </span>

                        <div>
                            <h4 className="font-semibold text-sm">
                                {prop.title}
                            </h4>
                            <p className="text-sm text-blue-200">
                                {prop.subtitle}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
