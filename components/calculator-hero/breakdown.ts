import { formatAED, roundCurrency } from "./currency";
import { formatServicePeriod } from "./servicePeriod";
import type { BreakdownItem } from "./types";

function formatFirstFiveLabel(serviceYears: number): string {
    if (serviceYears === 1) {
        return "First 1 Year";
    }
    if (serviceYears === 5) {
        return "First 5 Years";
    }
    return `First ${serviceYears} Years`;
}

function formatAfterFiveLabel(serviceYears: number): string {
    if (serviceYears === 1) {
        return "After 5 Years";
    }
    return `After 5 Years (${serviceYears} years)`;
}

export function breakdownItemToText(item: BreakdownItem): string {
    switch (item.type) {
        case "grossService":
            return `Gross Calendar Service\n${formatServicePeriod(item.years, item.months, item.days)}`;
        case "unpaidLeave":
            return `Unpaid Leave Excluded\n${item.days} day${item.days === 1 ? "" : "s"}`;
        case "creditedService": {
            const heading =
                item.variant === "used"
                    ? "Credited Service Used"
                    : "Credited Service Period";
            return `${heading}\n${formatServicePeriod(item.years, item.months, item.days, { alwaysShowAll: true })}`;
        }
        case "salary":
            return `Last Monthly Basic Salary\n${formatAED(item.salary)}`;
        case "dailySalary":
            return `Daily Basic Salary\n${formatAED(item.salary)} ÷ 30 = ${formatAED(roundCurrency(item.dailySalary))}`;
        case "firstFiveYears":
            return `${formatFirstFiveLabel(item.serviceYears)}\n${formatAED(roundCurrency(item.dailySalary))} × 21 days × ${item.serviceYears}\n= ${formatAED(roundCurrency(item.amount))}`;
        case "afterFiveYears":
            return `${formatAfterFiveLabel(item.serviceYears)}\n${formatAED(roundCurrency(item.dailySalary))} × 30 days × ${item.serviceYears}\n= ${formatAED(roundCurrency(item.amount))}`;
        case "grossGratuity":
            return `Gross Gratuity\n${formatAED(roundCurrency(item.amount))}`;
        case "statutoryCap":
            return `Maximum Permitted Gratuity\n${formatAED(roundCurrency(item.amount))}`;
        case "capAdjustment":
            return `Statutory Cap Adjustment\n− ${formatAED(roundCurrency(item.adjustment))}`;
        case "finalGratuity":
            return `Final Gratuity\n${formatAED(roundCurrency(item.amount))}`;
        case "eligibility":
            return `Eligibility\n${item.message}`;
        default:
            return "";
    }
}

export function renderBreakdownLines(items: BreakdownItem[]): string[] {
    return items.map(breakdownItemToText);
}
