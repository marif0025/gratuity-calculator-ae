import { addYears } from "date-fns";
import { describe, expect, it } from "vitest";
import {
    calculateServicePeriod,
    decomposePeriod,
    getGrossCalendarDays,
    lastWorkingDateAfterExactYearsPlusOneDay,
    lastWorkingDateForExactYears,
    parseLocalDateString,
    toProportionalYears,
} from "./servicePeriod";

describe("servicePeriod", () => {
    describe("date inclusivity", () => {
        it("treats last working date as inclusive — exactly one year", () => {
            const start = parseLocalDateString("2025-01-01");
            const end = parseLocalDateString("2025-12-31");
            const result = calculateServicePeriod(start, end, 0);

            expect(result.creditedServiceYears).toBe(1);
            expect(result.creditedServiceMonths).toBe(0);
            expect(result.creditedServiceDays).toBe(0);
            expect(result.proportionalCreditedYears).toBe(1);
            expect(result.isEligible).toBe(true);
        });

        it("one day before anniversary is less than one year", () => {
            const start = parseLocalDateString("2025-01-01");
            const end = parseLocalDateString("2025-12-30");
            const result = calculateServicePeriod(start, end, 0);

            expect(result.isEligible).toBe(false);
            expect(result.proportionalCreditedYears).toBeLessThan(1);
        });
    });

    describe("gross calendar days", () => {
        it("counts inclusive end date via exclusive boundary", () => {
            const start = parseLocalDateString("2025-01-01");
            const end = parseLocalDateString("2025-12-31");
            expect(getGrossCalendarDays(start, end)).toBe(365);
        });
    });

    describe("exact credited years", () => {
        it.each([
            [1, 1, 0, 0],
            [2, 2, 0, 0],
            [5, 5, 0, 0],
            [10, 10, 0, 0],
        ])(
            "%i credited years from Jan 1 start",
            (years, expectedYears, expectedMonths, expectedDays) => {
                const start = parseLocalDateString("2020-01-01");
                const end = lastWorkingDateForExactYears("2020-01-01", years);
                const result = calculateServicePeriod(start, end, 0);

                expect(result.creditedServiceYears).toBe(expectedYears);
                expect(result.creditedServiceMonths).toBe(expectedMonths);
                expect(result.creditedServiceDays).toBe(expectedDays);
                expect(result.proportionalCreditedYears).toBe(years);
            }
        );
    });

    describe("partial service", () => {
        it("one year and six complete months", () => {
            const start = parseLocalDateString("2024-01-01");
            const end = parseLocalDateString("2025-06-30");
            const result = calculateServicePeriod(start, end, 0);

            expect(result.creditedServiceYears).toBe(1);
            expect(result.creditedServiceMonths).toBe(6);
            expect(result.creditedServiceDays).toBe(0);
            expect(result.proportionalCreditedYears).toBe(1.5);
        });

        it("five years and six complete months", () => {
            const start = parseLocalDateString("2020-01-01");
            const end = parseLocalDateString("2025-06-30");
            const result = calculateServicePeriod(start, end, 0);

            expect(result.creditedServiceYears).toBe(5);
            expect(result.creditedServiceMonths).toBe(6);
            expect(result.creditedServiceDays).toBe(0);
            expect(result.proportionalCreditedYears).toBe(5.5);
        });

        it("one year and one additional day uses service-year denominator", () => {
            const start = parseLocalDateString("2024-01-01");
            const end = lastWorkingDateAfterExactYearsPlusOneDay(
                "2024-01-01",
                1
            );
            const result = calculateServicePeriod(start, end, 0);
            const expectedFraction =
                1 / result.daysInCurrentServiceYear;

            expect(result.creditedServiceYears).toBe(1);
            expect(result.creditedServiceDays).toBe(1);
            expect(result.proportionalCreditedYears).toBeCloseTo(
                1 + expectedFraction,
                10
            );
        });
    });

    describe("unpaid leave", () => {
        it("one unpaid day removes eligibility from exact one-year period", () => {
            const start = parseLocalDateString("2025-01-01");
            const end = parseLocalDateString("2025-12-31");
            const result = calculateServicePeriod(start, end, 1);

            expect(result.grossServiceDays).toBe(365);
            expect(result.creditedServiceDaysTotal).toBe(364);
            expect(result.isEligible).toBe(false);
        });

        it("reduces credited service by unpaid leave days", () => {
            const start = parseLocalDateString("2020-01-01");
            const end = lastWorkingDateForExactYears("2020-01-01", 2);
            const withoutLeave = calculateServicePeriod(start, end, 0);
            const withLeave = calculateServicePeriod(start, end, 30);

            expect(withLeave.creditedServiceDaysTotal).toBe(
                withoutLeave.creditedServiceDaysTotal - 30
            );
            expect(withLeave.proportionalCreditedYears).toBeLessThan(
                withoutLeave.proportionalCreditedYears
            );
        });
    });

    describe("leap year and Feb 29", () => {
        it("uses 366 days when current service year spans a leap year", () => {
            const start = parseLocalDateString("2024-01-01");
            const end = parseLocalDateString("2024-06-30");
            const result = calculateServicePeriod(start, end, 0);

            expect(result.daysInCurrentServiceYear).toBe(366);
        });

        it("follows date-fns addYears for Feb 29 start", () => {
            const start = parseLocalDateString("2024-02-29");
            const oneYearAnniversary = addYears(start, 1);
            expect(oneYearAnniversary.getFullYear()).toBe(2025);
            expect(oneYearAnniversary.getMonth()).toBe(1);
            expect(oneYearAnniversary.getDate()).toBe(28);
        });

        it("handles month-end January 31", () => {
            const start = parseLocalDateString("2025-01-31");
            const end = parseLocalDateString("2025-02-28");
            const result = calculateServicePeriod(start, end, 0);
            expect(result.grossServiceDays).toBeGreaterThan(0);
        });
    });

    describe("proportional years", () => {
        it("derives from decomposition components", () => {
            const decomposition = {
                years: 1,
                months: 6,
                days: 0,
                daysInCurrentServiceYear: 365,
            };
            expect(toProportionalYears(decomposition)).toBe(1.5);
        });
    });

    describe("five-year boundary decomposition", () => {
        it("exact five-year anniversary", () => {
            const start = parseLocalDateString("2020-01-01");
            const end = lastWorkingDateForExactYears("2020-01-01", 5);
            const result = calculateServicePeriod(start, end, 0);
            expect(result.proportionalCreditedYears).toBe(5);
        });

        it("one day before five-year boundary", () => {
            const start = parseLocalDateString("2020-01-01");
            const dayBefore = parseLocalDateString("2024-12-30");

            const result = calculateServicePeriod(start, dayBefore, 0);
            expect(result.proportionalCreditedYears).toBeLessThan(5);
        });

        it("one day after five-year boundary", () => {
            const start = parseLocalDateString("2020-01-01");
            const end = lastWorkingDateAfterExactYearsPlusOneDay(
                "2020-01-01",
                5
            );
            const result = calculateServicePeriod(start, end, 0);
            expect(result.proportionalCreditedYears).toBeGreaterThan(5);
        });
    });
});
