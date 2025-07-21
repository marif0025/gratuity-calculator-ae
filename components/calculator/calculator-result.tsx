import { DollarSign, FileText, CalculatorIcon, X } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

import { useCalculator } from "@/state/calculator";
import { Button } from "@/components/ui/button";

export function CalculatorResult() {
    const result = useCalculator((state) => state.result);
    const reset = useCalculator((state) => state.actions.reset);

    if (!result) return null;

    return (
        <div className="space-y-3">
            <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 rounded-3xl overflow-hidden pt-0 relative">
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        Calculation Result
                    </CardTitle>
                    <CardDescription className="text-green-100 mt-2">
                        Your end-of-service gratuity calculation
                    </CardDescription>
                </div>

                <button
                    onClick={reset}
                    className="absolute top-6 right-6 text-white w-12 aspect-square rounded-full hover:bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                >
                    <X className="h-6 w-6" />
                </button>

                <CardContent className="p-8">
                    <div className="space-y-8">
                        <div className="relative text-center p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl border-2 border-emerald-200 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
                            <div className="relative">
                                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
                                    AED {result.totalGratuity.toLocaleString()}
                                </div>
                                <div className="text-lg text-gray-600 font-medium">
                                    Total Gratuity Amount
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                                <span className="text-gray-700 font-semibold">
                                    Service Period:
                                </span>
                                <span className="font-bold text-gray-900 text-lg">
                                    {result.totalServiceYears} years,{" "}
                                    {result.totalServiceMonths} months
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gradient-to-r text-white from-blue-500 to-purple-500 rounded-full"></span>
                                    Calculation Breakdown
                                </h4>

                                <ul className="space-y-2 pl-4">
                                    {result.breakdown.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="bg-gradient-to-r bg-gray-700 rounded-xl p-0.5"></span>
                                            <p className="text-gray-700 font-medium leading-relaxed">
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="relative p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                            <div className="flex items-start gap-3">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-2 mt-1">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-yellow-800 mb-2">
                                        Important Disclaimer
                                    </p>
                                    <p className="text-yellow-700 leading-relaxed">
                                        This calculation is based on UAE Labour
                                        Law 2025 and MOHRE guidelines. Results
                                        are estimates for informational purposes
                                        only. Consult with HR or legal advisor
                                        for specific cases and final
                                        confirmation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={reset}
                            variant="default"
                            size="lg"
                            className="w-full"
                        >
                            <CalculatorIcon className="h-6 w-6" />
                            Calculate Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
