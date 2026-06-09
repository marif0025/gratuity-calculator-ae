import { CheckCircle } from "lucide-react";
import { resolveLucideIcon } from "@/lib/lucide-icon";

interface TrustIndicatorItem {
    icon?: string;
    text: string;
}

interface TrustIndicatorsProps {
    items: TrustIndicatorItem[];
}

export default function TrustIndicators({ items }: TrustIndicatorsProps) {
    return (
        <div className="flex flex-wrap items-center gap-6 pt-4 mt-6 lg:mt-8">
            {items.map((indicator, index) => {
                const Icon = resolveLucideIcon(indicator.icon, CheckCircle);

                return (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-blue-200"
                    >
                        <Icon className="h-5 w-5 text-green-300" />
                        <span className="text-sm">{indicator.text}</span>
                    </div>
                );
            })}
        </div>
    );
}
