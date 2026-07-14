import { z } from "zod";
import { getGrossCalendarDays } from "./servicePeriod";

export const calculatorFormSchema = z
    .object({
        lastMonthlyBasicSalary: z
            .number({
                required_error: "Please enter a valid number",
                invalid_type_error: "Please enter a valid number",
            })
            .finite("Please enter a valid number")
            .positive("Basic salary must be greater than zero"),
        employmentPeriod: z
            .object({
                from: z.date({
                    required_error: "Please select a valid start date",
                    invalid_type_error: "Please select a valid start date",
                }),
                to: z.date({
                    required_error: "Please select a valid last working date",
                    invalid_type_error: "Please select a valid last working date",
                }),
            })
            .refine((data) => data.from < data.to, {
                message: "Start date must be before last working date",
                path: ["to"],
            }),
        unpaidLeaveDays: z
            .number({
                required_error: "Please enter a valid number",
                invalid_type_error: "Please enter a valid number",
            })
            .int("Unpaid leave must be a whole number of days")
            .min(0, "Unpaid leave cannot be negative"),
    })
    .superRefine((data, ctx) => {
        const grossDays = getGrossCalendarDays(
            data.employmentPeriod.from,
            data.employmentPeriod.to
        );

        if (data.unpaidLeaveDays > grossDays) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Unpaid leave cannot exceed total calendar service days",
                path: ["unpaidLeaveDays"],
            });
        }
    });

export type TCalculatorFormData = z.infer<typeof calculatorFormSchema>;
