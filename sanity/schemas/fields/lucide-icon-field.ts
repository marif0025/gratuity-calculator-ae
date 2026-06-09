import { defineField } from "sanity";

import { LucideIconInput } from "@/sanity/components/lucide-icon-input";

type LucideIconFieldOverrides = Partial<{
    title: string;
    description: string;
}>;

export function lucideIconField(overrides?: LucideIconFieldOverrides) {
    return defineField({
        name: "icon",
        title: "Icon",
        description:
            "Lucide icon name in PascalCase (e.g. Shield, Zap). Browse icons at lucide.dev.",
        type: "string",
        components: {
            input: LucideIconInput,
        },
        ...overrides,
    });
}
