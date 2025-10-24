"use client";

import BackgroundPattern from "./background-pattern";
import FloatingElements from "./floating-elements";
import TrustBadge from "./trust-badge";
import HeroHeadline from "./hero-headline";
import ValuePropositions from "./value-propositions";
import TrustIndicators from "./trust-indicators";
import BottomWave from "./bottom-wave";
import { CalculatorHero } from "../calculator-hero/calculator-hero";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-10"
        >
            <BackgroundPattern />
            <FloatingElements />

            <div className="relative container mx-auto px-4 lg:py-27">
                <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-24 items-center">
                    <div className="text-white">
                        <TrustBadge />
                        <HeroHeadline
                            title="Calculate Your UAE"
                            subtitle="in 30 Seconds"
                            description="Get instant, accurate end-of-service calculations for all UAE emirates."
                            highlightedText="Gratuity Benefits"
                        />
                        <ValuePropositions />
                        {/* <CTAButtons /> */}
                        <TrustIndicators />
                    </div>

                    <Calculator />
                </div>
            </div>

            <BottomWave />
        </section>
    );
}

function Calculator() {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <CalculatorHero />
        </div>
    );
}
