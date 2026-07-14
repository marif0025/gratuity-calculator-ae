import { describe, expect, it } from "vitest";
import { calculateGratuity } from "./calculateGratuity";
import { roundCurrency } from "./currency";
import { calculatorFormSchema } from "./schema";
import {
    calculateServicePeriod,
    lastWorkingDateAfterExactYearsPlusOneDay,
    lastWorkingDateForExactYears,
    parseLocalDateString,
} from "./servicePeriod";
import type { ICalculationResult, TCalculatorFormData } from "./types";

const SALARY = 5000;

function dates(start: string, end: string) {
    return {
        from: parseLocalDateString(start),
        to: parseLocalDateString(end),
    };
}

function form(overrides: Partial<TCalculatorFormData> = {}): TCalculatorFormData {
    return {
        lastMonthlyBasicSalary: SALARY,
        employmentPeriod: dates("2020-01-01", "2020-12-31"),
        unpaidLeaveDays: 0,
        ...overrides,
    };
}

function exactYearsForm(years: number, start = "2020-01-01"): TCalculatorFormData {
    return form({
        employmentPeriod: {
            from: parseLocalDateString(start),
            to: lastWorkingDateForExactYears(start, years),
        },
    });
}

function assertReconciliation(result: ICalculationResult) {
    expect(
        roundCurrency(
            result.firstFiveYearsAmount + result.afterFiveYearsAmount
        )
    ).toBe(result.grossGratuity);
    expect(
        roundCurrency(Math.min(result.grossGratuity, result.statutoryCap))
    ).toBe(result.totalGratuity);

    if (result.capApplied) {
        expect(result.capAdjustment).toBe(
            roundCurrency(result.grossGratuity - result.totalGratuity)
        );
    } else {
        expect(result.capAdjustment).toBe(0);
    }

    expect(Number.isFinite(result.totalGratuity)).toBe(true);
    expect(Number.isNaN(result.totalGratuity)).toBe(false);
    expect(Number.isFinite(result.grossGratuity)).toBe(true);
}

describe("calculateGratuity", () => {
    describe("exact-year statutory examples", () => {
        it.each([
            [1, 3500, 0, 3500, 3500],
            [2, 7000, 0, 7000, 7000],
            [3, 10500, 0, 10500, 10500],
            [5, 17500, 0, 17500, 17500],
            [6, 17500, 5000, 22500, 22500],
            [7, 17500, 10000, 27500, 27500],
            [10, 17500, 25000, 42500, 42500],
        ])(
            "test: %i credited years",
            (
                years,
                firstFive,
                afterFive,
                gross,
                final
            ) => {
                const result = calculateGratuity(exactYearsForm(years));

                expect(result.firstFiveYearsAmount).toBe(firstFive);
                expect(result.afterFiveYearsAmount).toBe(afterFive);
                expect(result.grossGratuity).toBe(gross);
                expect(result.totalGratuity).toBe(final);
                assertReconciliation(result);
            }
        );
    });

    describe("partial service", () => {
        it("test 8: less than one year — ineligible", () => {
            const result = calculateGratuity(
                form({
                    employmentPeriod: dates("2025-01-01", "2025-12-30"),
                })
            );

            expect(result.isEligible).toBe(false);
            expect(result.totalGratuity).toBe(0);
        });

        it("test 9: inclusive exact anniversary — AED 3,500", () => {
            const result = calculateGratuity(
                form({
                    employmentPeriod: dates("2025-01-01", "2025-12-31"),
                })
            );

            expect(result.creditedServiceYears).toBe(1);
            expect(result.totalGratuity).toBe(3500);
        });

        it("test 10: one year and six months — AED 5,250", () => {
            const result = calculateGratuity(
                form({
                    employmentPeriod: dates("2024-01-01", "2025-06-30"),
                })
            );

            expect(result.proportionalCreditedYears).toBe(1.5);
            expect(result.firstFiveYearsAmount).toBe(5250);
            expect(result.totalGratuity).toBe(5250);
        });

        it("test 11: five years and six months — AED 20,000", () => {
            const result = calculateGratuity(
                form({
                    employmentPeriod: dates("2020-01-01", "2025-06-30"),
                })
            );

            expect(result.firstFiveYearsAmount).toBe(17500);
            expect(result.afterFiveYearsAmount).toBe(2500);
            expect(result.grossGratuity).toBe(20000);
            expect(result.totalGratuity).toBe(20000);
        });

        it("test 12: one year and one additional day", () => {
            const start = "2024-01-01";
            const end = lastWorkingDateAfterExactYearsPlusOneDay(start, 1);
            const service = calculateServicePeriod(
                parseLocalDateString(start),
                end,
                0
            );
            const daily = SALARY / 30;
            const expected = roundCurrency(
                daily * 21 * service.proportionalCreditedYears
            );

            const result = calculateGratuity(
                form({
                    employmentPeriod: {
                        from: parseLocalDateString(start),
                        to: end,
                    },
                })
            );

            expect(result.totalGratuity).toBe(expected);
            expect(result.totalGratuity).toBeCloseTo(3509.59, 2);
        });

        it("test 13: five years and one additional day", () => {
            const start = "2020-01-01";
            const end = lastWorkingDateAfterExactYearsPlusOneDay(start, 5);
            const service = calculateServicePeriod(
                parseLocalDateString(start),
                end,
                0
            );
            const daily = SALARY / 30;
            const firstFive = daily * 21 * 5;
            const afterFive =
                daily * 30 * (service.proportionalCreditedYears - 5);
            const expected = roundCurrency(firstFive + afterFive);

            const result = calculateGratuity(
                form({
                    employmentPeriod: {
                        from: parseLocalDateString(start),
                        to: end,
                    },
                })
            );

            expect(result.totalGratuity).toBe(expected);
            expect(result.totalGratuity).toBeCloseTo(17513.7, 2);
        });
    });

    describe("unpaid leave", () => {
        it("test 14: one unpaid day removes eligibility", () => {
            const result = calculateGratuity(
                form({
                    employmentPeriod: dates("2025-01-01", "2025-12-31"),
                    unpaidLeaveDays: 1,
                })
            );

            expect(result.isEligible).toBe(false);
            expect(result.totalGratuity).toBe(0);
        });

        it("test 15: unpaid leave reduces but does not remove eligibility", () => {
            const start = parseLocalDateString("2020-01-01");
            const end = lastWorkingDateForExactYears("2020-01-01", 2);
            const withoutLeave = calculateGratuity(
                form({ employmentPeriod: { from: start, to: end } })
            );
            const withLeave = calculateGratuity(
                form({
                    employmentPeriod: { from: start, to: end },
                    unpaidLeaveDays: 30,
                })
            );

            const service = calculateServicePeriod(start, end, 30);
            const daily = SALARY / 30;
            const expected = roundCurrency(
                daily * 21 * service.proportionalCreditedYears
            );

            expect(withLeave.creditedServiceDaysTotal).toBe(
                withoutLeave.creditedServiceDaysTotal - 30
            );
            expect(withLeave.totalGratuity).toBeLessThan(7000);
            expect(withLeave.totalGratuity).toBe(expected);
            expect(
                withLeave.breakdown.some((item) => item.type === "unpaidLeave")
            ).toBe(true);
            assertReconciliation(withLeave);
        });
    });

    describe("cap tests", () => {
        it("test 17: below the cap — 25 years", () => {
            const result = calculateGratuity(exactYearsForm(25));

            expect(result.grossGratuity).toBe(117500);
            expect(result.totalGratuity).toBe(117500);
            expect(result.capApplied).toBe(false);
        });

        it("test 18: exactly at the cap — 25 years 6 months", () => {
            const result = calculateGratuity(
                form({
                    employmentPeriod: dates("2000-01-01", "2025-06-30"),
                })
            );

            expect(result.grossGratuity).toBe(120000);
            expect(result.totalGratuity).toBe(120000);
        });

        it("test 19: above the cap — 26 years", () => {
            const result = calculateGratuity(exactYearsForm(26));

            expect(result.grossGratuity).toBe(122500);
            expect(result.statutoryCap).toBe(120000);
            expect(result.capAdjustment).toBe(2500);
            expect(result.totalGratuity).toBe(120000);
            expect(result.capApplied).toBe(true);
        });
    });

    describe("legacy regression — fields removed", () => {
        it("test 20: two credited years returns AED 7,000", () => {
            const result = calculateGratuity(exactYearsForm(2));
            expect(result.totalGratuity).toBe(7000);
        });

        it("test 21: four credited years returns AED 14,000", () => {
            const result = calculateGratuity(exactYearsForm(4));
            expect(result.totalGratuity).toBe(14000);
        });
    });

    describe("daily salary precision", () => {
        it("AED 5,000 ÷ 30 × 21 = AED 3,500 without intermediate rounding", () => {
            const result = calculateGratuity(exactYearsForm(1));
            expect(result.dailyBasicSalary).toBeCloseTo(166.6666666667, 10);
            expect(result.totalGratuity).toBe(3500);
        });
    });

    describe("boundary and validation", () => {
        it("rejects start date after last working date", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({
                    employmentPeriod: dates("2025-12-31", "2025-01-01"),
                })
            );
            expect(parsed.success).toBe(false);
        });

        it("allows same start and last working date for schema but produces short service", () => {
            const sameDay = dates("2025-06-15", "2025-06-15");
            const parsed = calculatorFormSchema.safeParse(
                form({ employmentPeriod: sameDay })
            );
            expect(parsed.success).toBe(false);
        });

        it("rejects zero salary", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({ lastMonthlyBasicSalary: 0 })
            );
            expect(parsed.success).toBe(false);
        });

        it("rejects negative salary", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({ lastMonthlyBasicSalary: -100 })
            );
            expect(parsed.success).toBe(false);
        });

        it("allows decimal salary", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({ lastMonthlyBasicSalary: 5250.75 })
            );
            expect(parsed.success).toBe(true);
            const result = calculateGratuity(
                form({
                    lastMonthlyBasicSalary: 5250.75,
                    employmentPeriod: dates("2025-01-01", "2025-12-31"),
                })
            );
            expect(result.totalGratuity).toBeGreaterThan(0);
        });

        it("rejects negative unpaid leave", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({ unpaidLeaveDays: -1 })
            );
            expect(parsed.success).toBe(false);
        });

        it("rejects decimal unpaid leave", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({ unpaidLeaveDays: 1.5 })
            );
            expect(parsed.success).toBe(false);
        });

        it("test 16: rejects unpaid leave greater than gross service", () => {
            const parsed = calculatorFormSchema.safeParse(
                form({
                    employmentPeriod: dates("2025-01-01", "2025-01-31"),
                    unpaidLeaveDays: 40,
                })
            );
            expect(parsed.success).toBe(false);
        });

        it("very long service where cap applies", () => {
            const result = calculateGratuity(exactYearsForm(30));
            expect(result.capApplied).toBe(true);
            expect(result.totalGratuity).toBe(120000);
        });
    });
});
