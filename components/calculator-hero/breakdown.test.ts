import { describe, expect, it } from "vitest";
import {
    breakdownItemToText,
    formatTierServiceForFormula,
} from "./breakdown";

describe("formatTierServiceForFormula", () => {
    it.each([
        [{ years: 1, months: 0, days: 1 }, "1 year and 1 day"],
        [{ years: 1, months: 6, days: 0 }, "1 year and 6 months"],
        [{ years: 5, months: 0, days: 0 }, "5 years"],
        [{ years: 0, months: 6, days: 0 }, "6 months"],
    ] as const)(
        "formats %o as human-readable period",
        (period, expected) => {
            expect(formatTierServiceForFormula(period)).toBe(expected);
        }
    );

    it("falls back to rounded years when period is empty", () => {
        expect(formatTierServiceForFormula({ years: 0, months: 0, days: 0 }, 1.0027397260273974)).toBe(
            "1.00 years"
        );
    });
});

describe("breakdownItemToText tier formulas", () => {
    const dailySalary = 5000 / 30;

    it("shows human-readable service in first-five-years formula", () => {
        const text = breakdownItemToText({
            type: "firstFiveYears",
            serviceYears: 1.0027397260273974,
            servicePeriod: { years: 1, months: 0, days: 1 },
            dailySalary,
            amount: 3509.59,
        });

        expect(text).toContain("× 21 days × 1 year and 1 day");
        expect(text).not.toMatch(/\d+\.\d{4,}/);
    });

    it("shows human-readable service in after-five-years formula", () => {
        const text = breakdownItemToText({
            type: "afterFiveYears",
            serviceYears: 0.5,
            servicePeriod: { years: 0, months: 6, days: 0 },
            dailySalary,
            amount: 2500,
        });

        expect(text).toContain("× 30 days × 6 months");
        expect(text).toContain("After 5 Years (6 months)");
    });

    it("uses First 5 Years heading for exact five-year first tier", () => {
        const text = breakdownItemToText({
            type: "firstFiveYears",
            serviceYears: 5,
            servicePeriod: { years: 5, months: 0, days: 0 },
            dailySalary,
            amount: 17500,
        });

        expect(text).toContain("First 5 Years");
        expect(text).toContain("× 21 days × 5 years");
    });
});
