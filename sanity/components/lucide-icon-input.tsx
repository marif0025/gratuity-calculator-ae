"use client";

import { TextInput, type StringInputProps } from "sanity";

import { isLucideIconName, LucideIcon } from "@/components/lucide-icon";

function previewMessage(icon?: string) {
    if (!icon) return "No icon added — Ban will be shown";
    if (isLucideIconName(icon)) return icon;
    return `"${icon}" not available — Ban will be shown`;
}

export function LucideIconInput(props: StringInputProps) {
    const icon = props.value || undefined;
    const resolved = isLucideIconName(icon);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TextInput {...props} />

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 4,
                    border: `1px solid ${resolved ? "#e5e7eb" : "#fcd34d"}`,
                    backgroundColor: resolved ? "#f9fafb" : "#fffbeb",
                }}
            >
                <LucideIcon name={icon} size={24} />
                <span style={{ fontSize: 13 }}>{previewMessage(icon)}</span>
            </div>

            <a
                href="https://lucide.dev/icons"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: "#2563eb" }}
            >
                Browse icons on lucide.dev
            </a>
        </div>
    );
}
