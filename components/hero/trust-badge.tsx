import { LucideIcon } from "@/components/lucide-icon";

interface TrustBadgeProps {
    icon?: string;
    text: string;
}

export default function TrustBadge({ icon, text }: TrustBadgeProps) {
    return (
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-5">
            <LucideIcon name={icon} className="size-4 text-green-300" />
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}
