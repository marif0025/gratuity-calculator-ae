import { z } from "zod";

export const calculatorFormSchema = z.object({
    salary: z
        .number({
            message: "Please enter a valid number",
        })
        .min(1, "Basic salary must be at least 1 AED"),
    employmentPeriod: z
        .object({
            from: z.date({
                message: "Please select a valid start date",
            }),
            to: z.date({
                message: "Please select a valid end date",
            }),
        })
        .refine((data) => data.from < data.to, {
            message: "Start date must be before end date",
            path: ["to"],
        })
        .refine((data) => data.to <= new Date(), {
            message: "End date cannot be in the future",
            path: ["to"],
        })
        .refine(
            (data) => {
                const diffTime = Math.abs(
                    data.to.getTime() - data.from.getTime()
                );
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays >= 365; // At least 1 year
            },
            {
                message: "Employment period must be at least 1 year",
                path: ["to"],
            }
        ),
    contractType: z.enum(["limited", "unlimited"], {
        message: "Please select a contract type",
    }),
    reasonForLeaving: z.enum(["resignation", "termination", "completion"], {
        message: "Please select a reason for leaving",
    }),
});

export type TCalculatorFormData = z.infer<typeof calculatorFormSchema>;
