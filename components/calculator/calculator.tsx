"use client";

import { CalculatorTips } from "./calculator-tips";
import { CalculatorResult } from "./calculator-result";
import { CalculatorForm } from "./calculator-form";

export function Calculator() {
    return (
        <section id="calculator" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Calculate Your Gratuity
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Enter your employment details below to get an
                            instant, accurate calculation of your end-of-service
                            benefits.
                        </p>
                    </div>

                    <CalculatorForm />
                    <CalculatorResult />
                    <CalculatorTips />
                </div>
            </div>
        </section>
    );
}
