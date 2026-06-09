import { isLucideIconName, LucideIcon } from "@/components/lucide-icon";

export function lucideIconSubtitle(icon?: string) {
    if (!icon) return "No icon — not available";
    if (isLucideIconName(icon)) return icon;
    return `"${icon}" not available`;
}

export function createLucideIconMedia(icon?: string) {
    return function LucideIconMedia() {
        return <LucideIcon name={icon} size={20} />;
    };
}
