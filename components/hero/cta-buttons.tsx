import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTAButtons() {
    const handleCalculateClick = () => {
        document
            .getElementById("calculator")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleLearnClick = () => {
        document
            .querySelector('[data-section="guide"]')
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={handleCalculateClick}
            >
                Calculate My Gratuity Now
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
                variant="outline"
                size="lg"
                className="border-white/30 hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg text-black"
                onClick={handleLearnClick}
            >
                Learn How It Works
            </Button>
        </div>
    );
}
