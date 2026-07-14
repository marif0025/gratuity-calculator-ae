import { roundCurrency } from "./currency";
import { calculateServicePeriod } from "./servicePeriod";
import type { BreakdownItem, ICalculationResult } from "./types";
import type { TCalculatorFormData } from "./schema";

export function calculateGratuity(
    data: TCalculatorFormData
): ICalculationResult {
    const service = calculateServicePeriod(
        data.employmentPeriod.from,
        data.employmentPeriod.to,
        data.unpaidLeaveDays
    );

    const dailyBasicSalary = data.lastMonthlyBasicSalary / 30;
    const statutoryCap = data.lastMonthlyBasicSalary * 24;

    if (!service.isEligible) {
        const breakdown: BreakdownItem[] = [
            {
                type: "creditedService",
                years: service.creditedServiceYears,
                months: service.creditedServiceMonths,
                days: service.creditedServiceDays,
                variant: "period",
            },
            {
                type: "eligibility",
                message: "At least 1 full credited year is required.",
            },
            { type: "finalGratuity", amount: 0 },
        ];

        if (data.unpaidLeaveDays > 0) {
            breakdown.unshift(
                {
                    type: "grossService",
                    years: service.grossDecomposition.years,
                    months: service.grossDecomposition.months,
                    days: service.grossDecomposition.days,
                },
                { type: "unpaidLeave", days: data.unpaidLeaveDays }
            );
        }

        return {
            dailyBasicSalary,
            firstFiveYearsAmount: 0,
            afterFiveYearsAmount: 0,
            grossGratuity: 0,
            statutoryCap: roundCurrency(statutoryCap),
            capAdjustment: 0,
            capApplied: false,
            totalGratuity: 0,
            creditedServiceYears: service.creditedServiceYears,
            creditedServiceMonths: service.creditedServiceMonths,
            creditedServiceDays: service.creditedServiceDays,
            proportionalCreditedYears: service.proportionalCreditedYears,
            grossServiceDays: service.grossServiceDays,
            unpaidLeaveDays: service.unpaidLeaveDays,
            creditedServiceDaysTotal: service.creditedServiceDaysTotal,
            isEligible: false,
            breakdown,
        };
    }

    const firstFiveYears = Math.min(service.proportionalCreditedYears, 5);
    const yearsAfterFive = Math.max(service.proportionalCreditedYears - 5, 0);

    const firstFiveYearsAmount = dailyBasicSalary * 21 * firstFiveYears;
    const afterFiveYearsAmount = dailyBasicSalary * 30 * yearsAfterFive;
    const grossGratuity = firstFiveYearsAmount + afterFiveYearsAmount;
    const capApplied = grossGratuity > statutoryCap;
    const totalGratuity = Math.min(grossGratuity, statutoryCap);
    const capAdjustment = capApplied ? grossGratuity - totalGratuity : 0;

    const breakdown: BreakdownItem[] = [];

    if (data.unpaidLeaveDays > 0) {
        breakdown.push(
            {
                type: "grossService",
                years: service.grossDecomposition.years,
                months: service.grossDecomposition.months,
                days: service.grossDecomposition.days,
            },
            { type: "unpaidLeave", days: data.unpaidLeaveDays },
            {
                type: "creditedService",
                years: service.creditedServiceYears,
                months: service.creditedServiceMonths,
                days: service.creditedServiceDays,
                variant: "used",
            }
        );
    } else {
        breakdown.push({
            type: "creditedService",
            years: service.creditedServiceYears,
            months: service.creditedServiceMonths,
            days: service.creditedServiceDays,
            variant: "period",
        });
    }

    breakdown.push(
        { type: "salary", salary: data.lastMonthlyBasicSalary },
        {
            type: "dailySalary",
            salary: data.lastMonthlyBasicSalary,
            dailySalary: dailyBasicSalary,
        }
    );

    if (firstFiveYears > 0) {
        breakdown.push({
            type: "firstFiveYears",
            serviceYears: firstFiveYears,
            dailySalary: dailyBasicSalary,
            amount: firstFiveYearsAmount,
        });
    }

    if (yearsAfterFive > 0) {
        breakdown.push({
            type: "afterFiveYears",
            serviceYears: yearsAfterFive,
            dailySalary: dailyBasicSalary,
            amount: afterFiveYearsAmount,
        });
    }

    breakdown.push({ type: "grossGratuity", amount: grossGratuity });
    breakdown.push({ type: "statutoryCap", amount: statutoryCap });

    if (capApplied) {
        breakdown.push({
            type: "capAdjustment",
            adjustment: capAdjustment,
        });
    }

    breakdown.push({ type: "finalGratuity", amount: totalGratuity });

    return {
        dailyBasicSalary,
        firstFiveYearsAmount: roundCurrency(firstFiveYearsAmount),
        afterFiveYearsAmount: roundCurrency(afterFiveYearsAmount),
        grossGratuity: roundCurrency(grossGratuity),
        statutoryCap: roundCurrency(statutoryCap),
        capAdjustment: roundCurrency(capAdjustment),
        capApplied,
        totalGratuity: roundCurrency(totalGratuity),
        creditedServiceYears: service.creditedServiceYears,
        creditedServiceMonths: service.creditedServiceMonths,
        creditedServiceDays: service.creditedServiceDays,
        proportionalCreditedYears: service.proportionalCreditedYears,
        grossServiceDays: service.grossServiceDays,
        unpaidLeaveDays: service.unpaidLeaveDays,
        creditedServiceDaysTotal: service.creditedServiceDaysTotal,
        isEligible: true,
        breakdown,
    };
}
