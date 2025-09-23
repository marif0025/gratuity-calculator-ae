"use client";

import { useCalculator } from "@/state/calculator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

export function CalculatorBasicSalary() {
    const basicSalary = useCalculator((state) => state.lastBasicSalary);
    const errors = useCalculator((state) => state.errors);
    const setErrors = useCalculator((state) => state.actions.setErrors);
    const setLastBasicSalary = useCalculator(
        (state) => state.actions.setLastBasicSalary
    );

    const basicSalaryError = errors.find(
        (error) => error.field === "lastBasicSalary"
    );

    const handleBasicSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, "");
        setLastBasicSalary(numericValue ? parseInt(numericValue, 10) : 0);

        // If there is a basic salary error, remove it from errors when updating salary
        if (basicSalaryError) {
            setErrors(
                errors.filter((error) => error.field !== "lastBasicSalary")
            );
        }
    };

    return (
        <div className="space-y-3">
            <Label
                htmlFor="salary"
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
            >
                Basic Monthly Salary (AED)
            </Label>

            <div className="relative">
                <Input
                    id="salary"
                    type="string"
                    placeholder="e.g., 5000"
                    value={basicSalary}
                    onChange={handleBasicSalaryChange}
                    className="border-2 px-6"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                    AED
                </span>
            </div>

            {basicSalaryError && (
                <p className="text-sm text-red-500">
                    {basicSalaryError.message}
                </p>
            )}
        </div>
    );
}
