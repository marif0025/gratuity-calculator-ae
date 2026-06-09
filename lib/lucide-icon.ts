import {
    Building,
    Calculator,
    CheckCircle,
    Shield,
    Users,
    Zap,
    type LucideIcon,
} from "lucide-react";

const LUCIDE_ICON_MAP: Record<string, LucideIcon> = {
    Building,
    Calculator,
    CheckCircle,
    Shield,
    Users,
    Zap,
};

export function resolveLucideIcon(
    name: string | undefined,
    fallback: LucideIcon,
): LucideIcon {
    if (!name) return fallback;
    return LUCIDE_ICON_MAP[name] ?? fallback;
}
