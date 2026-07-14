"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./date-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalculatorIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { calculatorFormSchema, TCalculatorFormData } from "./schema";
import { calculateGratuity } from "./calculateGratuity";
import { CalculatorResult } from "./calculator-result";
import type { ICalculationResult } from "./types";

export function CalculatorHero() {
    const [result, setResult] = useState<ICalculationResult | null>(null);
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TCalculatorFormData>({
        resolver: zodResolver(calculatorFormSchema),
        defaultValues: {
            unpaidLeaveDays: 0,
        },
    });

    const onSubmit = (data: TCalculatorFormData) => {
        setResult(calculateGratuity(data));
    };

    const resetResult = () => {
        setResult(null);
    };

    if (result) {
        return <CalculatorResult result={result} reset={resetResult} />;
    }

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label
                        htmlFor="lastMonthlyBasicSalary"
                        className="text-base font-medium text-white flex items-center gap-2"
                    >
                        Last Monthly Basic Salary
                    </Label>

                    <p className="text-sm text-white/70">
                        Only your monthly basic salary should be entered. Allowances such as housing, transport, bonuses, overtime, and commissions are not included in the gratuity calculation.
                    </p>

                    <div className="relative text-white/60 has-[input:focus]:text-white">
                        <Input
                            id="lastMonthlyBasicSalary"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 5000"
                            {...register("lastMonthlyBasicSalary", {
                                valueAsNumber: true,
                            })}
                            className="border border-white/60 focus:border-white focus:shadow-[0_0_0_1px_rgb(255,255,255)] pl-15 pr-6 bg-black/10 text-white/60! hover:text-white!"
                        />

                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-medium">
                            AED
                        </span>
                    </div>

                    {errors.lastMonthlyBasicSalary && (
                        <p className="text-sm text-red-400">
                            {errors.lastMonthlyBasicSalary.message}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <Label className="text-white">Employment Period</Label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label className="text-sm text-white/80">Start Date</Label>
                            <Controller
                                name="employmentPeriod.from"
                                control={control}
                                render={({ field }) => {
                                    const label = field.value
                                        ? format(field.value, "dd MMM yyyy")
                                        : "Select start date";

                                    return (
                                        <DatePicker
                                            label={label}
                                            open={openStartDate}
                                            setOpen={setOpenStartDate}
                                        >
                                            <Calendar
                                                mode="single"
                                                captionLayout="dropdown"
                                                selected={field.value}
                                                onSelect={(d) => {
                                                    if (d) {
                                                        field.onChange(d);
                                                        setOpenStartDate(false);
                                                    }
                                                }}
                                            />
                                        </DatePicker>
                                    );
                                }}
                            />

                            {errors.employmentPeriod?.from && (
                                <p className="text-sm text-red-400">
                                    {errors.employmentPeriod.from.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-white/80">Last working date</Label>
                            <Controller
                                name="employmentPeriod.to"
                                control={control}
                                render={({ field }) => {
                                    const label = field.value
                                        ? format(field.value, "dd MMM yyyy")
                                        : "Select date";

                                    return (
                                        <DatePicker
                                            label={label}
                                            open={openEndDate}
                                            setOpen={setOpenEndDate}
                                        >
                                            <Calendar
                                                mode="single"
                                                captionLayout="dropdown"
                                                selected={field.value}
                                                onSelect={(d) => {
                                                    if (d) {
                                                        field.onChange(d);
                                                        setOpenEndDate(false);
                                                    }
                                                }}
                                            />
                                        </DatePicker>
                                    );
                                }}
                            />
                            {errors.employmentPeriod?.to && (
                                <p className="text-sm text-red-400">
                                    {errors.employmentPeriod.to.message}
                                </p>
                            )}
                            {errors.employmentPeriod &&
                                typeof errors.employmentPeriod === "object" &&
                                "message" in errors.employmentPeriod && (
                                    <p className="text-sm text-red-400">
                                        {errors.employmentPeriod.message}
                                    </p>
                                )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="unpaidLeaveDays"
                        className="text-base font-medium text-white"
                    >
                        Unpaid Leave Days
                    </Label>
                    <Input
                        id="unpaidLeaveDays"
                        type="number"
                        step="1"
                        min={0}
                        placeholder="0"
                        {...register("unpaidLeaveDays", {
                            valueAsNumber: true,
                        })}
                        className="border border-white/60 focus:border-white focus:shadow-[0_0_0_1px_rgb(255,255,255)] bg-black/10 text-white/60! hover:text-white!"
                    />
                    {errors.unpaidLeaveDays && (
                        <p className="text-sm text-red-400">
                            {errors.unpaidLeaveDays.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full min-h-12 mt-3"
                >
                    <CalculatorIcon className="mr-3 size-6" />
                    Calculate My Gratuity
                </Button>
            </form>
        </>
    );
}
