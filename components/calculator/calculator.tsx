"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    CalculatorIcon as CalcIcon,
    FileText,
    DollarSign,
    Users,
    Building,
    Clock,
} from "lucide-react";
import { CalculatorTips } from "./calculator-tips";
import { CalculatorResult } from "./calculator-result";
import { CalculatorForm } from "./calculator-form";

export interface ICalculationResult {
    totalGratuity: number;
    firstFiveYears: number;
    afterFiveYears: number;
    totalServiceYears: number;
    totalServiceMonths: number;
    breakdown: string[];
}

export function Calculator() {
    const [result, setResult] = useState<ICalculationResult | null>(null);

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

                    <CalculatorForm result={result} setResult={setResult} />

                    {/* Right Column - Results */}
                    <CalculatorResult result={result} />

                    {/* Quick Tips */}
                    <CalculatorTips />
                </div>
            </div>
        </section>
    );
}
