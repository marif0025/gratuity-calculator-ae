"use client";

import { CalculatorIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CalculatorBasicSalary } from "./calculator-basic-salary";
import { CalculatorEmployementPeriod } from "./calculator-employement-period";
import { CalculatorContractType } from "./calculator-contract-type";
import { CalculatorExitReason } from "./calculator-exit-reason";
import { ICalculatorError, useCalculator } from "@/state/calculator";
import { useCallback } from "react";

export function CalculatorForm() {
    const {
        lastBasicSalary,
        exitReason,
        contractType,
        startDate,
        endDate,
        result,
        actions: { setErrors, setResult },
    } = useCalculator((state) => state);

    const isValidForm = useCallback(() => {
        const errors: ICalculatorError[] = [];

        // Validate basic salary
        if (!lastBasicSalary || lastBasicSalary <= 0) {
            errors.push({
                message: "Basic salary must be a valid number greater than 0",
                field: "lastBasicSalary",
            });
        }

        // Validate contract type
        if (!contractType) {
            errors.push({
                message: "Contract type is required",
                field: "contractType",
            });
        }

        // Validate dates
        if (!startDate) {
            errors.push({
                message: "Joining date is required",
                field: "startDate",
            });
        }

        if (!endDate) {
            errors.push({
                message: "End date is required",
                field: "endDate",
            });
        }

        // Validate date logic (only if both dates exist)
        if (startDate && endDate && startDate > endDate) {
            errors.push({
                message: "Joining date must be before end date",
                field: "startDate",
            });
        }

        // If there are errors, set them and return null
        if (errors.length > 0) {
            setErrors(errors);
            return null;
        }

        // Return validated data with proper typing
        return {
            lastBasicSalary: Number(lastBasicSalary),
            contractType,
            startDate: startDate!,
            endDate: endDate!,
            exitReason,
        } as const;
    }, [
        lastBasicSalary,
        contractType,
        startDate,
        endDate,
        exitReason,
        setErrors,
    ]);

    const calculateGratuity = () => {
        const formData = isValidForm();
        if (!formData) return;

        const { startDate, endDate, lastBasicSalary } = formData;

        // At this point, we know startDate and endDate are defined due to validation
        const start = new Date(startDate);
        const end = new Date(endDate);

        const totalMonths =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        const totalYears = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        // TODO: Implement the complete gratuity calculation logic
        // The calculation logic is currently commented out below
        console.log(`Total months of service: ${totalMonths}`);

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
            firstFiveYearsAmount = (lastBasicSalary / 30) * 21 * firstFiveYears;
            breakdown.push(
                `First ${firstFiveYears} years: ${firstFiveYears} × 21 days = AED ${firstFiveYearsAmount.toLocaleString()}`
            );
        }

        // Calculate for years after 5 (30 days per year)
        const afterFiveYears = Math.max(0, totalYears - 5);
        if (afterFiveYears > 0) {
            afterFiveYearsAmount = (lastBasicSalary / 30) * 30 * afterFiveYears;
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
        const maxGratuity = lastBasicSalary * 24;
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

                <CardContent className="px-8 py-4 space-y-4">
                    {/* Basic Salary */}
                    <CalculatorBasicSalary />

                    {/* Employment Period */}
                    <CalculatorEmployementPeriod />

                    {/* Contract Type */}
                    <CalculatorContractType />

                    {/* Exit Reason */}
                    <CalculatorExitReason />

                    <Button
                        onClick={calculateGratuity}
                        variant="default"
                        size="lg"
                        className="w-full"
                    >
                        <CalculatorIcon className="mr-3 h-6 w-6" />
                        Calculate My Gratuity
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
