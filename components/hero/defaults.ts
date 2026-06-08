import type { HomeHero } from "@/sanity/lib/types";

export const DEFAULT_HERO: HomeHero = {
    headlineTitle: "Calculate Your UAE",
    headlineHighlightedText: "Gratuity Benefits",
    headlineSubtitle: "in 30 Seconds",
    headlineDescription:
        "Get instant, accurate end-of-service calculations for all UAE emirates.",
    headlineTagline: "Know your rights, claim what you've earned.",
    trustBadgeText: "MOHRE-Certified • 100% Free • Instant Results",
    valuePropositions: [
        { title: "Instant Results", subtitle: "No waiting, no paperwork" },
        { title: "100% Accurate", subtitle: "UAE Labour Law 2025" },
        {
            title: "All Employee Types",
            subtitle: "Private, domestic, free zone",
        },
        { title: "All Emirates", subtitle: "Dubai, Abu Dhabi & more" },
    ],
    trustIndicators: [
        { text: "Used by 50,000+ employees" },
        { text: "MOHRE guidelines compliant" },
        { text: "No registration required" },
    ],
};
