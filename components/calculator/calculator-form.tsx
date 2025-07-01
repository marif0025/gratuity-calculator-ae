"use client";

import { useState } from "react";
import { Building, CalculatorIcon, Clock, FileText, Users } from "lucide-react";

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

import { ICalculationResult } from "./calculator";
import { cn } from "@/lib/utils";

export function CalculatorForm({
    result,
    setResult,
}: {
    result: ICalculationResult | null;
    setResult: (result: ICalculationResult | null) => void;
}) {
    const [basicSalary, setBasicSalary] = useState("");
    const [contractType, setContractType] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [exitReason, setExitReason] = useState("");

    const calculateGratuity = () => {
        if (
            !basicSalary ||
            !contractType ||
            !joiningDate ||
            !endDate ||
            !exitReason
        ) {
            alert("Please fill in all fields");
            return;
        }

        const salary = Number.parseFloat(basicSalary);
        const start = new Date(joiningDate);
        const end = new Date(endDate);

        // Calculate total service period
        const totalMonths =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        const totalYears = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        if (totalMonths < 12) {
            setResult({
                totalGratuity: 0,
                firstFiveYears: 0,
                afterFiveYears: 0,
                totalServiceYears: totalYears,
                totalServiceMonths: totalMonths,
                breakdown: [
                    "Service period less than 1 year - No gratuity applicable",
                ],
            });
            return;
        }

        let gratuity = 0;
        let firstFiveYearsAmount = 0;
        let afterFiveYearsAmount = 0;
        const breakdown: string[] = [];

        // Calculate for first 5 years (21 days per year)
        const firstFiveYears = Math.min(totalYears, 5);
        if (firstFiveYears > 0) {
            firstFiveYearsAmount = (salary / 30) * 21 * firstFiveYears;
            breakdown.push(
                `First ${firstFiveYears} years: ${firstFiveYears} × 21 days = AED ${firstFiveYearsAmount.toLocaleString()}`
            );
        }

        // Calculate for years after 5 (30 days per year)
        const afterFiveYears = Math.max(0, totalYears - 5);
        if (afterFiveYears > 0) {
            afterFiveYearsAmount = (salary / 30) * 30 * afterFiveYears;
            breakdown.push(
                `After 5 years (${afterFiveYears} years): ${afterFiveYears} × 30 days = AED ${afterFiveYearsAmount.toLocaleString()}`
            );
        }

        gratuity = firstFiveYearsAmount + afterFiveYearsAmount;

        // Apply contract type and exit reason rules
        if (contractType === "limited") {
            if (exitReason === "resignation" && totalYears < 2) {
                gratuity = 0;
                breakdown.push(
                    "Limited contract resignation before 2 years - No gratuity"
                );
            } else if (exitReason === "resignation" && totalYears < 5) {
                gratuity = gratuity / 2;
                breakdown.push(
                    "Limited contract resignation before 5 years - 50% gratuity"
                );
            }
        } else if (contractType === "unlimited") {
            if (exitReason === "resignation" && totalYears < 5) {
                if (totalYears >= 1 && totalYears < 3) {
                    gratuity = gratuity / 3;
                    breakdown.push(
                        "Unlimited contract resignation (1-3 years) - 33% gratuity"
                    );
                } else if (totalYears >= 3 && totalYears < 5) {
                    gratuity = (gratuity * 2) / 3;
                    breakdown.push(
                        "Unlimited contract resignation (3-5 years) - 67% gratuity"
                    );
                }
            }
        }

        // Cap at 2 years salary
        const maxGratuity = salary * 24;
        if (gratuity > maxGratuity) {
            gratuity = maxGratuity;
            breakdown.push(
                `Capped at 2 years salary: AED ${maxGratuity.toLocaleString()}`
            );
        }

        setResult({
            totalGratuity: gratuity,
            firstFiveYears: firstFiveYearsAmount,
            afterFiveYears: afterFiveYearsAmount,
            totalServiceYears: totalYears,
            totalServiceMonths: remainingMonths,
            breakdown,
        });
    };

    if (result) return null;

    return (
        <div className="space-y-8">
            <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 rounded-3xl overflow-hidden pt-0">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                            <CalculatorIcon className="h-6 w-6" />
                        </div>
                        Employment Details
                    </CardTitle>
                    <CardDescription className="text-blue-100 mt-2">
                        Fill in your employment information for accurate
                        calculation
                    </CardDescription>
                </div>

                <CardContent className="p-8 space-y-10">
                    {/* Basic Salary */}
                    <div className="space-y-4">
                        <Label
                            htmlFor="salary"
                            className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                        >
                            Basic Monthly Salary (AED)
                        </Label>

                        <div className="relative">
                            <Input
                                id="salary"
                                type="number"
                                placeholder="e.g., 5000"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(e.target.value)}
                                className="text-xl py-4 px-6 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gradient-to-r from-gray-50 to-blue-50/30"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                                AED
                            </div>
                        </div>
                    </div>

                    {/* Employment Period */}
                    <div className="space-y-6">
                        <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            Employment Period
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label
                                    htmlFor="joining"
                                    className="text-base font-medium text-gray-700"
                                >
                                    Joining Date
                                </Label>
                                <Input
                                    id="joining"
                                    type="date"
                                    value={joiningDate}
                                    onChange={(e) =>
                                        setJoiningDate(e.target.value)
                                    }
                                    className="text-lg py-4 px-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label
                                    htmlFor="end"
                                    className="text-base font-medium text-gray-700"
                                >
                                    End Date
                                </Label>
                                <Input
                                    id="end"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="text-lg py-4 px-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contract Type */}
                    <div className="space-y-6">
                        <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            Contract Type
                        </Label>

                        <RadioGroup
                            value={contractType}
                            onValueChange={setContractType}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                                    <RadioGroupItem
                                        value="limited"
                                        id="limited"
                                        className="mt-2 w-5 h-5 border-2 border-blue-500 opacity-0 absolute inset-0"
                                    />

                                    <div className="flex-1">
                                        <Label
                                            htmlFor="limited"
                                            className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                                        >
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-2">
                                                <FileText className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-lg">
                                                Limited Contract
                                            </span>
                                        </Label>
                                        <p className="text-gray-600 mt-2 leading-relaxed">
                                            Fixed-term contract with specific
                                            end date. Common in free zones like
                                            JAFZA, DMCC, DDA.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                                    <RadioGroupItem
                                        value="unlimited"
                                        id="unlimited"
                                        className="mt-2 w-5 h-5 border-2 border-green-500 opacity-0 absolute inset-0"
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="unlimited"
                                            className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                                        >
                                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-2">
                                                <Clock className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-lg">
                                                Unlimited Contract
                                            </span>
                                        </Label>
                                        <p className="text-gray-600 mt-2 leading-relaxed">
                                            Open-ended contract with no specific
                                            end date. More flexible for both
                                            parties.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Exit Reason */}
                    <div className="space-y-6">
                        <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            Reason for Leaving
                        </Label>

                        <RadioGroup
                            value={exitReason}
                            onValueChange={setExitReason}
                            className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            <div className="group relative">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                                        exitReason === "resignation" &&
                                            "opacity-100"
                                    )}
                                ></div>
                                <div
                                    className={cn(
                                        "relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm",
                                        exitReason === "resignation" &&
                                            "border-orange-400 shadow-lg"
                                    )}
                                >
                                    <RadioGroupItem
                                        value="resignation"
                                        id="resignation"
                                        className="mt-2 w-5 h-5 border-2 border-orange-500 absolute inset-0 opacity-0 z-10"
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="resignation"
                                            className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                                        >
                                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-2">
                                                <Users className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-lg">
                                                Resignation
                                            </span>
                                        </Label>
                                        <p className="text-gray-600 mt-2 leading-relaxed">
                                            You are voluntarily leaving your
                                            job. May affect gratuity calculation
                                            based on service years.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                                        exitReason === "termination" &&
                                            "opacity-100"
                                    )}
                                ></div>
                                <div
                                    className={cn(
                                        "relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm",
                                        exitReason === "termination" &&
                                            "border-red-400 shadow-lg"
                                    )}
                                >
                                    <RadioGroupItem
                                        value="termination"
                                        id="termination"
                                        className="mt-2 w-5 h-5 border-2 border-red-500 absolute inset-0 opacity-0 z-10"
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="termination"
                                            className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                                        >
                                            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-2">
                                                <Building className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-lg">
                                                Termination by Employer
                                            </span>
                                        </Label>
                                        <p className="text-gray-600 mt-2 leading-relaxed">
                                            Your employer is ending your
                                            contract. Usually qualifies for full
                                            gratuity rights.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                                        exitReason === "completion" &&
                                            "opacity-100"
                                    )}
                                ></div>
                                <div
                                    className={cn(
                                        "relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300 bg-white/70 ",
                                        exitReason === "completion" &&
                                            "border-green-400"
                                    )}
                                >
                                    <RadioGroupItem
                                        value="completion"
                                        id="completion"
                                        className="mt-2 w-5 h-5 border-2 border-green-500 absolute inset-0 opacity-0 z-10"
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="completion"
                                            className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                                        >
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2">
                                                <FileText className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-lg">
                                                Contract Completion
                                            </span>
                                        </Label>
                                        <p className="text-gray-600 mt-2 leading-relaxed">
                                            Your contract term has naturally
                                            ended. Qualifies for full gratuity
                                            payment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button
                        onClick={calculateGratuity}
                        className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                        size="lg"
                    >
                        <CalculatorIcon className="mr-3 h-6 w-6" />
                        Calculate My Gratuity
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
