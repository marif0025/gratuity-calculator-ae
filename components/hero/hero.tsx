

import { Calculator } from "@/components/calculator-hero";
import type { HomeData, HomeHero } from "@/sanity/lib/types";
import BackgroundPattern from "./background-pattern";
import FloatingElements from "./floating-elements";
import TrustBadge from "./trust-badge";
import HeroHeadline from "./hero-headline";
import ValuePropositions from "./value-propositions";
import TrustIndicators from "./trust-indicators";
import BottomWave from "./bottom-wave";
import { DEFAULT_HERO } from "./defaults";

interface HeroProps {
    content?: Promise<HomeData | null>;
}

export default async function Hero({ content }: HeroProps) {
    const homeData = await content;
    const hero = homeData?.hero ?? DEFAULT_HERO;

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
                        <TrustBadge
                            icon={hero.trustBadge.icon}
                            text={hero.trustBadge.text}
                        />
                        <HeroHeadline
                            title={hero.title}
                            description={hero.description}
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

                    <Calculator calculator={hero.calculator ?? DEFAULT_HERO.calculator} />
                </div>
            </div>

            <BottomWave />
        </section>
    );
}
