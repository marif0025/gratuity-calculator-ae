import { CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAED } from "./currency";
import { renderBreakdownLines } from "./breakdown";
import { formatServicePeriod } from "./servicePeriod";
import type { ICalculationResult } from "./types";

function CalculationBreakdown({ result }: { result: ICalculationResult }) {
    const lines = renderBreakdownLines(result.breakdown);

    return (
        <ul className="space-y-4 pl-2">
            {lines.map((item, index) => {
                const [heading, ...rest] = item.split("\n");
                return (
                    <li key={index} className="text-white">
                        <p className="font-semibold">{heading}</p>
                        {rest.map((line, lineIndex) => (
                            <p
                                key={lineIndex}
                                className={
                                    lineIndex === rest.length - 1 &&
                                    heading !== "Eligibility"
                                        ? "font-medium"
                                        : "text-white/90"
                                }
                            >
                                {line}
                            </p>
                        ))}
                    </li>
                );
            })}
        </ul>
    );
}

interface CalculatorResultProps {
    result: ICalculationResult;
    reset: () => void;
}

export function CalculatorResult({ result, reset }: CalculatorResultProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">
                Calculation Result
            </h2>
            <p className="text-white mb-4">
                Your end-of-service gratuity calculation
            </p>

            <div className="space-y-4">
                <div className="relative border border-white/20 bg-black/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center">
                    <strong className="text-4xl font-bold text-yellow-400 mb-3">
                        {formatAED(result.totalGratuity)}
                    </strong>
                    <small className="text-lg text-white font-medium">
                        Final Gratuity
                    </small>
                </div>

                <div className="flex justify-between items-center py-4 px-6 border border-white/20 bg-black/10 backdrop-blur-sm rounded-xl">
                    <span className="text-white font-semibold">
                        Credited Service Period:
                    </span>
                    <span className="font-bold text-white text-lg text-right">
                        {formatServicePeriod(
                            result.creditedServiceYears,
                            result.creditedServiceMonths,
                            result.creditedServiceDays,
                            { alwaysShowAll: true }
                        )}
                    </span>
                </div>

                <div className="space-y-4 my-6">
                    <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                        <CalculatorIcon className="size-4" />
                        Calculation Breakdown
                    </h4>

                    <CalculationBreakdown result={result} />
                </div>

                <Button
                    onClick={reset}
                    variant="primary"
                    size="lg"
                    className="w-full min-h-12"
                >
                    <CalculatorIcon className="h-6 w-6" />
                    Calculate Again
                </Button>
            </div>
        </div>
    );
}
