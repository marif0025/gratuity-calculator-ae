import { LucideIcon } from "@/components/lucide-icon";

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
            {items.map((indicator, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 text-blue-200"
                >
                    <LucideIcon
                        name={indicator.icon}
                        className="size-5 text-green-300"
                    />
                    <span className="text-sm">{indicator.text}</span>
                </div>
            ))}
        </div>
    );
}
