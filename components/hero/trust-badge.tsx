import { Shield } from "lucide-react";
import { resolveLucideIcon } from "@/lib/lucide-icon";

interface TrustBadgeProps {
    icon?: string;
    text: string;
}

export default function TrustBadge({ icon, text }: TrustBadgeProps) {
    const Icon = resolveLucideIcon(icon, Shield);

    return (
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-5">
            <Icon className="size-4 text-green-300" />
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}
