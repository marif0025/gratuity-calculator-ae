"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../calculator/calculator-date-picker";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalculatorIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { ICalculationResult } from "@/state/calculator";
import { calculatorFormSchema, TCalculatorFormData } from "./schema";
import { calculateGratuity } from "./calculate";

const contractTypes = [
    {
        label: "Limited Contract",
        value: "limited",
    },
    {
        label: "Unlimited Contract",
        value: "unlimited",
    },
]

const reasonForLeaving = [
    {
        label: "Resignation",
        value: "resignation",
    },
    {
        label: "Termination by Employer",
        value: "termination",
    },
    {
        label: "Contract Completion",
        value: "completion",
    },
]

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
    });

    const onSubmit = (data: TCalculatorFormData) => {
        const result = calculateGratuity(data);
        setResult(result);
    };

    const resetResult = () => {
        setResult(null);
    };

    if (result) return <CalculatorResult result={result} reset={resetResult} />;

    return (
        <>
            <h2 className="text-2xl font-bold text-white mb-4">
                Calculate Your Gratuity
            </h2>
            <p className="text-gray-200 mb-4">
                Enter your employment details below to get an instant, accurate
                calculation of your end-of-service benefits.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label
                        htmlFor="salary"
                        className="text-base font-medium text-white flex items-center gap-2"
                    >
                        Basic Monthly Salary (AED)
                    </Label>

                    <div className="relative text-white/60 has-[input:focus]:text-white">
                        <Input
                            id="salary"
                            type="number"
                            placeholder="e.g., 5000"
                            {...register("salary", { valueAsNumber: true })}
                            className="border border-white/60 focus:border-white focus:shadow-[0_0_0_1px_rgb(255,255,255)] pl-15 pr-6 bg-black/10 text-white/60! hover:text-white!"
                        />

                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-medium">
                            AED
                        </span>
                    </div>

                    {errors.salary && (
                        <p className="text-sm text-red-400">
                            {typeof errors.salary === "string"
                                ? errors.salary
                                : errors.salary.message}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <Label htmlFor="employmentPeriod" className="text-white">
                        Employment Period
                    </Label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
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
                                    {typeof errors.employmentPeriod.from === "string"
                                        ? errors.employmentPeriod.from
                                        : errors.employmentPeriod.from.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Controller
                                name="employmentPeriod.to"
                                control={control}
                                render={({ field }) => {
                                    const label = field.value
                                        ? format(field.value, "dd MMM yyyy")
                                        : "Select end date";

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
                                    {typeof errors.employmentPeriod.to === "string"
                                        ? errors.employmentPeriod.to
                                        : errors.employmentPeriod.to.message}
                                </p>
                            )}
                            {errors.employmentPeriod && typeof errors.employmentPeriod === "object" && "message" in errors.employmentPeriod && (
                                <p className="text-sm text-red-400">
                                    {errors.employmentPeriod.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contractType" className="text-white">
                        Contract Type
                    </Label>

                    <Controller
                        name="contractType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    aria-label="Select a contract type"
                                    className="w-full min-h-12 border-white/60 bg-black/10 text-white data-placeholder:text-white/60! hover:data-placeholder:text-white! pl-4.5 cursor-pointer"
                                >
                                    <SelectValue className="text-white" placeholder="Select a contract type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Contract Types
                                        </SelectLabel>
                                        {
                                            contractTypes.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.contractType && (
                        <p className="text-sm text-red-400">
                            {typeof errors.contractType === "string"
                                ? errors.contractType
                                : errors.contractType.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="reasonForLeaving" className="text-white">
                        Reason for Leaving
                    </Label>

                    <Controller
                        name="reasonForLeaving"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    aria-label="Select a reason for leaving"
                                    className="w-full min-h-12 border-white/60 bg-black/10 text-white data-placeholder:text-white/60! hover:data-placeholder:text-white! pl-4.5 cursor-pointer"
                                >
                                    <SelectValue placeholder="Select a reason for leaving" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Reason for Leaving
                                        </SelectLabel>
                                        {
                                            reasonForLeaving.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.reasonForLeaving && (
                        <p className="text-sm text-red-400">
                            {typeof errors.reasonForLeaving === "string"
                                ? errors.reasonForLeaving
                                : errors.reasonForLeaving.message}
                        </p>
                    )}
                </div>

                <Button
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

interface ICalculatorResultProps {
    result: ICalculationResult;
    reset: () => void;
}

function CalculatorResult({ result, reset, }: ICalculatorResultProps) {
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
                        AED {result.totalGratuity.toLocaleString()}
                    </strong>
                    <small className="text-lg text-white font-medium">
                        Total Gratuity Amount
                    </small>
                </div>
                <div className="flex justify-between items-center py-4 px-6 border border-white/20 bg-black/10 backdrop-blur-sm rounded-xl">
                    <span className="text-white font-semibold">
                        Service Period:
                    </span>
                    <span className="font-bold text-white text-lg">
                        {result.totalServiceYears} years,{" "}
                        {result.totalServiceMonths} months
                    </span>
                </div>

                <div className="space-y-4 my-6">
                    <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                        <CalculatorIcon className="size-4" />
                        Calculation Breakdown
                    </h4>

                    <ul className="space-y-2 pl-2">
                        {result.breakdown.map((item, index) => (
                            <li
                                key={index}
                                className="list-decimal list-inside text-white"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <div className="relative p-6 border rounded-2xl overflow-hidden">
                    <div className="flex items-start gap-3">
                        <div className=" rounded-xl p-2 mt-1">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white mb-2">
                                Important Disclaimer
                            </p>
                            <p className="text-white leading-relaxed">
                                This calculation is based on UAE Labour Law 2025
                                and MOHRE guidelines. Results are estimates for
                                informational purposes only. Consult with HR or
                                legal advisor for specific cases and final
                                confirmation.
                            </p>
                        </div>
                    </div>
                </div> */}

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
