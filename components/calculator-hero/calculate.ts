import { ICalculationResult } from "@/state/calculator";
import { TCalculatorFormData } from "./schema";

export function calculateGratuity(data: TCalculatorFormData): ICalculationResult {
    const start = new Date(data.employmentPeriod.from);
    const end = new Date(data.employmentPeriod.to);

    const totalMonths =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    console.log(`Total months of service: ${totalMonths}`);

    if (totalMonths < 12) {
        return {
            totalGratuity: 0,
            firstFiveYears: 0,
            afterFiveYears: 0,
            totalServiceYears: totalYears,
            totalServiceMonths: totalMonths,
            breakdown: [
                "Service period less than 1 year - No gratuity applicable",
            ],
        }
    }

    let gratuity = 0;
    let firstFiveYearsAmount = 0;
    let afterFiveYearsAmount = 0;
    const breakdown: string[] = [];

    // Calculate for first 5 years (21 days per year)
    const firstFiveYears = Math.min(totalYears, 5);
    if (firstFiveYears > 0) {
        firstFiveYearsAmount = (data.salary / 30) * 21 * firstFiveYears;
        breakdown.push(
            `First ${firstFiveYears} years: ${firstFiveYears} × 21 days = AED ${firstFiveYearsAmount.toLocaleString()}`
        );
    }

    // Calculate for years after 5 (30 days per year)
    const afterFiveYears = Math.max(0, totalYears - 5);
    if (afterFiveYears > 0) {
        afterFiveYearsAmount = (data.salary / 30) * 30 * afterFiveYears;
        breakdown.push(
            `After 5 years (${afterFiveYears} years): ${afterFiveYears} × 30 days = AED ${afterFiveYearsAmount.toLocaleString()}`
        );
    }

    gratuity = firstFiveYearsAmount + afterFiveYearsAmount;

    // Apply contract type and exit reason rules
    if (data.contractType === "limited") {
        if (data.reasonForLeaving === "resignation" && totalYears < 2) {
            gratuity = 0;
            breakdown.push(
                "Limited contract resignation before 2 years - No gratuity"
            );
        } else if (
            data.reasonForLeaving === "resignation" &&
            totalYears < 5
        ) {
            gratuity = gratuity / 2;
            breakdown.push(
                "Limited contract resignation before 5 years - 50% gratuity"
            );
        }
    } else if (data.contractType === "unlimited") {
        if (data.reasonForLeaving === "resignation" && totalYears < 5) {
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
    const maxGratuity = data.salary * 24;
    if (gratuity > maxGratuity) {
        gratuity = maxGratuity;
        breakdown.push(
            `Capped at 2 years salary: AED ${maxGratuity.toLocaleString()}`
        );
    }

    return {
        totalGratuity: gratuity,
        firstFiveYears: firstFiveYearsAmount,
        afterFiveYears: afterFiveYearsAmount,
        totalServiceYears: totalYears,
        totalServiceMonths: remainingMonths,
        breakdown,
    }
}
