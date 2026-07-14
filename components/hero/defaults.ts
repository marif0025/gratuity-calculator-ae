import type { HomeHero } from "@/sanity/lib/types";

export const DEFAULT_HERO: HomeHero = {
    title: "Calculate Your UAE <strong>Gratuity Benefits</strong> in 30 Seconds",
    description:
        "Get a quick estimated end-of-service calculation for UAE employees. Understand your possible gratuity before making a decision. <strong>Know your rights, claim what you've earned.</strong>",
    trustBadge: {
        icon: "Shield",
        text: "Based on UAE Public Guidance • Free to Use • Instant Estimate",
    },
    calculator: {
        title: "Calculate Your Gratuity",
        description:
            "Enter your employment details below to get an estimated calculation of your end-of-service benefits.",
    },
    valuePropositions: [
        {
            icon: "Zap",
            title: "Instant Results",
            subtitle: "No waiting, no paperwork",
        },
        {
            icon: "Calculator",
            title: "Estimated Result",
            subtitle: "Updated for UAE rules",
        },
        {
            icon: "Users",
            title: "UAE Private Sector",
            subtitle: "Federal labour law employees",
        },
        {
            icon: "Building",
            title: "All Emirates",
            subtitle: "Dubai, Abu Dhabi & more",
        },
    ],
    trustIndicators: [
        { icon: "CheckCircle", text: "Simple tool for UAE employees" },
        { icon: "CheckCircle", text: "Based on public UAE guidance" },
        { icon: "CheckCircle", text: "No registration required" },
    ],
};
