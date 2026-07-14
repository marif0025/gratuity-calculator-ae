/**
 * Date-only service period calculations for UAE gratuity.
 *
 * Conventions:
 * - Dates are normalized to local calendar Y/M/D (never UTC getters on parsed strings).
 * - Last working date is inclusive: internal end = lastWorkingDate + 1 day.
 * - Gross calendar days = difference between start and exclusive end.
 * - Credited service = gross calendar days − unpaid leave days.
 * - Y/M/D decomposition walks anniversaries via date-fns addYears/addMonths.
 * - Leap-year / Feb 29: follows date-fns addYears (e.g. 2024-02-29 + 1y → 2025-02-28).
 * - Eligibility requires proportionalCreditedYears >= 1.
 */
import { addDays, addMonths, addYears, differenceInDays } from "date-fns";

export interface DateOnly {
    year: number;
    month: number;
    day: number;
}

export interface ServicePeriodDecomposition {
    years: number;
    months: number;
    days: number;
    daysInCurrentServiceYear: number;
}

export interface ServicePeriodResult {
    grossServiceDays: number;
    unpaidLeaveDays: number;
    creditedServiceDaysTotal: number;
    creditedServiceYears: number;
    creditedServiceMonths: number;
    creditedServiceDays: number;
    proportionalCreditedYears: number;
    daysInCurrentServiceYear: number;
    isEligible: boolean;
    grossDecomposition: ServicePeriodDecomposition;
    creditedDecomposition: ServicePeriodDecomposition;
}

export function toDateOnly(date: Date): DateOnly {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    };
}

export function fromDateOnly({ year, month, day }: DateOnly): Date {
    return new Date(year, month, day);
}

export function normalizeDate(date: Date): Date {
    return fromDateOnly(toDateOnly(date));
}

/** Parse YYYY-MM-DD as a local calendar date (for tests). */
export function parseLocalDateString(isoDate: string): Date {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export function getGrossCalendarDays(
    startDate: Date,
    lastWorkingDate: Date
): number {
    const start = normalizeDate(startDate);
    const exclusiveEnd = addDays(normalizeDate(lastWorkingDate), 1);
    return differenceInDays(exclusiveEnd, start);
}

export function decomposePeriod(
    startDate: Date,
    exclusiveEndDate: Date
): ServicePeriodDecomposition {
    const start = normalizeDate(startDate);
    const exclusiveEnd = normalizeDate(exclusiveEndDate);

    if (differenceInDays(exclusiveEnd, start) <= 0) {
        const daysInCurrentServiceYear = differenceInDays(
            addYears(start, 1),
            start
        );
        return {
            years: 0,
            months: 0,
            days: 0,
            daysInCurrentServiceYear,
        };
    }

    let current = start;
    let years = 0;

    while (true) {
        const nextYear = addYears(current, 1);
        if (nextYear.getTime() <= exclusiveEnd.getTime()) {
            years += 1;
            current = nextYear;
        } else {
            break;
        }
    }

    const serviceYearStart = addYears(start, years);

    let months = 0;
    current = serviceYearStart;
    while (true) {
        const nextMonth = addMonths(current, 1);
        if (nextMonth.getTime() <= exclusiveEnd.getTime()) {
            months += 1;
            current = nextMonth;
        } else {
            break;
        }
    }

    const days = differenceInDays(exclusiveEnd, current);
    const daysInCurrentServiceYear = differenceInDays(
        addYears(serviceYearStart, 1),
        serviceYearStart
    );

    return { years, months, days, daysInCurrentServiceYear };
}

export function toProportionalYears({
    years,
    months,
    days,
    daysInCurrentServiceYear,
}: ServicePeriodDecomposition): number {
    return (
        years +
        months / 12 +
        (daysInCurrentServiceYear > 0 ? days / daysInCurrentServiceYear : 0)
    );
}

export function formatServicePeriod(
    years: number,
    months: number,
    days: number,
    options?: { alwaysShowAll?: boolean }
): string {
    if (options?.alwaysShowAll) {
        return `${years} year${years === 1 ? "" : "s"}, ${months} month${months === 1 ? "" : "s"} and ${days} day${days === 1 ? "" : "s"}`;
    }

    const parts: string[] = [];
    if (years > 0) {
        parts.push(`${years} year${years === 1 ? "" : "s"}`);
    }
    if (months > 0) {
        parts.push(`${months} month${months === 1 ? "" : "s"}`);
    }
    if (days > 0 || parts.length === 0) {
        parts.push(`${days} day${days === 1 ? "" : "s"}`);
    }
    if (parts.length === 1) {
        return parts[0];
    }
    if (parts.length === 2) {
        return `${parts[0]} and ${parts[1]}`;
    }
    return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

export function calculateServicePeriod(
    startDate: Date,
    lastWorkingDate: Date,
    unpaidLeaveDays = 0
): ServicePeriodResult {
    const start = normalizeDate(startDate);
    const grossExclusiveEnd = addDays(normalizeDate(lastWorkingDate), 1);
    const grossServiceDays = differenceInDays(grossExclusiveEnd, start);
    const creditedServiceDaysTotal = grossServiceDays - unpaidLeaveDays;
    const creditedExclusiveEnd = addDays(start, creditedServiceDaysTotal);

    const grossDecomposition = decomposePeriod(start, grossExclusiveEnd);
    const creditedDecomposition = decomposePeriod(start, creditedExclusiveEnd);

    const proportionalCreditedYears = toProportionalYears(creditedDecomposition);

    return {
        grossServiceDays,
        unpaidLeaveDays,
        creditedServiceDaysTotal,
        creditedServiceYears: creditedDecomposition.years,
        creditedServiceMonths: creditedDecomposition.months,
        creditedServiceDays: creditedDecomposition.days,
        proportionalCreditedYears,
        daysInCurrentServiceYear: creditedDecomposition.daysInCurrentServiceYear,
        isEligible: proportionalCreditedYears >= 1,
        grossDecomposition,
        creditedDecomposition,
    };
}

/** End date that yields exactly N credited years from start (inclusive last working day). */
export function lastWorkingDateForExactYears(
    startIso: string,
    years: number
): Date {
    const start = parseLocalDateString(startIso);
    const exclusiveEnd = addYears(start, years);
    return addDays(exclusiveEnd, -1);
}

/** Last working date that is exactly one day after N complete credited years. */
export function lastWorkingDateAfterExactYearsPlusOneDay(
    startIso: string,
    years: number
): Date {
    const start = parseLocalDateString(startIso);
    const exclusiveEnd = addDays(addYears(start, years), 1);
    return addDays(exclusiveEnd, -1);
}
