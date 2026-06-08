import { Zap, Calculator, Users, Building } from "lucide-react";

interface ValuePropositionItem {
    title: string;
    subtitle: string;
}

interface ValuePropositionsProps {
    items: ValuePropositionItem[];
}

const VALUE_PROP_STYLES = [
    { icon: Zap, bgColor: "bg-green-500" },
    { icon: Calculator, bgColor: "bg-blue-500" },
    { icon: Users, bgColor: "bg-purple-500" },
    { icon: Building, bgColor: "bg-orange-500" },
] as const;

export default function ValuePropositions({ items }: ValuePropositionsProps) {
    return (
        <div className="grid sm:grid-cols-2 gap-4 mb-5 lg:mb-8">
            {items.map((prop, index) => {
                const style =
                    VALUE_PROP_STYLES[index % VALUE_PROP_STYLES.length];
                const Icon = style.icon;
                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20"
                    >
                        <div className={`${style.bgColor} rounded-full p-1`}>
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
