"use client";

import { Calculator } from "@/components/calculator-hero";
import type { HomeHero } from "@/sanity/lib/types";
import BackgroundPattern from "./background-pattern";
import FloatingElements from "./floating-elements";
import TrustBadge from "./trust-badge";
import HeroHeadline from "./hero-headline";
import ValuePropositions from "./value-propositions";
import TrustIndicators from "./trust-indicators";
import BottomWave from "./bottom-wave";
import { DEFAULT_HERO } from "./defaults";

interface HeroProps {
    content?: HomeHero;
}

export default function Hero({ content }: HeroProps) {
    const hero = content ?? DEFAULT_HERO;

    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-linear-to-br from-blue-800 via-[#2a3455] to-[#4e4a71]  py-10"
        >
            <BackgroundPattern />
            <FloatingElements />

            <div className="relative container mx-auto px-4 pt-14 lg:py-27">
                <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-24 items-center">
                    <div className="text-white">
                        <TrustBadge text={hero.trustBadgeText} />
                        <HeroHeadline
                            title={hero.headlineTitle}
                            subtitle={hero.headlineSubtitle}
                            description={hero.headlineDescription}
                            highlightedText={hero.headlineHighlightedText}
                            tagline={hero.headlineTagline}
                        />
                        {hero.valuePropositions && (
                            <ValuePropositions
                                items={hero.valuePropositions}
                            />
                        )}
                        <TrustIndicators
                            items={
                                hero.trustIndicators ??
                                DEFAULT_HERO.trustIndicators!
                            }
                        />
                    </div>

                    <Calculator />
                </div>
            </div>

            <BottomWave />
        </section>
    );
}
