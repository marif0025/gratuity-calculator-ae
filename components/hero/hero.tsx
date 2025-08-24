"use client";

import BackgroundPattern from "./background-pattern";
import FloatingElements from "./floating-elements";
import TrustBadge from "./trust-badge";
import HeroHeadline from "./hero-headline";
import ValuePropositions from "./value-propositions";
import CTAButtons from "./cta-buttons";
import TrustIndicators from "./trust-indicators";
import HeroVisual from "./hero-visual";
import BottomWave from "./bottom-wave";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
        >
            <BackgroundPattern />
            <FloatingElements />

            <div className="relative container mx-auto px-4 py-24 lg:py-27">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="text-white">
                        <TrustBadge />
                        <HeroHeadline
                            title="Calculate Your UAE"
                            subtitle="in 30 Seconds"
                            description="Get instant, accurate end-of-service calculations for all UAE emirates."
                            highlightedText="Gratuity Benefits"
                        />
                        <ValuePropositions />
                        <CTAButtons />
                        <TrustIndicators />
                    </div>

                    {/* Right Column - Hero Visual */}
                    <HeroVisual />
                </div>
            </div>

            <BottomWave />
        </section>
    );
}
