import { formatAED, roundCurrency } from "./currency";
import { formatServicePeriod } from "./servicePeriod";
import type { BreakdownItem, ServicePeriodDisplay } from "./types";

function titleCaseServicePeriod(period: string): string {
    return period.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatTierServiceForFormula(
    period: ServicePeriodDisplay,
    fallbackYears?: number
): string {
    const { years, months, days } = period;
    if (years === 0 && months === 0 && days === 0 && fallbackYears) {
        return `${fallbackYears.toFixed(2)} years`;
    }
    return formatServicePeriod(years, months, days);
}

function formatFirstFiveLabel(period: ServicePeriodDisplay): string {
    const periodText = formatTierServiceForFormula(period);
    if (period.years === 5 && period.months === 0 && period.days === 0) {
        return "First 5 Years";
    }
    if (period.years === 1 && period.months === 0 && period.days === 0) {
        return "First 1 Year";
    }
    return `First ${titleCaseServicePeriod(periodText)}`;
}

function formatAfterFiveLabel(period: ServicePeriodDisplay): string {
    const periodText = formatTierServiceForFormula(period);
    if (period.years === 1 && period.months === 0 && period.days === 0) {
        return "After 5 Years";
    }
    return `After 5 Years (${periodText})`;
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
        case "firstFiveYears": {
            const serviceText = formatTierServiceForFormula(
                item.servicePeriod,
                item.serviceYears
            );
            return `${formatFirstFiveLabel(item.servicePeriod)}\n${formatAED(roundCurrency(item.dailySalary))} × 21 days × ${serviceText}\n= ${formatAED(roundCurrency(item.amount))}`;
        }
        case "afterFiveYears": {
            const serviceText = formatTierServiceForFormula(
                item.servicePeriod,
                item.serviceYears
            );
            return `${formatAfterFiveLabel(item.servicePeriod)}\n${formatAED(roundCurrency(item.dailySalary))} × 30 days × ${serviceText}\n= ${formatAED(roundCurrency(item.amount))}`;
        }
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
