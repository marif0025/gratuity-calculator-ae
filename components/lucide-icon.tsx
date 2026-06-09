import { Ban, icons } from "lucide-react";

export type LucideIconName = keyof typeof icons;

function resolveIcon(name?: string) {
    if (!name || !(name in icons)) return Ban;
    return icons[name as LucideIconName];
}

export function LucideIcon({
    name,
    size,
    className,
}: {
    name?: string;
    size?: number;
    className?: string;
}) {
    const Icon = resolveIcon(name);
    return <Icon strokeWidth={1.8} size={size} className={className} />;
}

export function isLucideIconName(name?: string): name is LucideIconName {
    return !!name && name in icons;
}
