import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CalculatorHero } from "./calculator-hero";
import { CalculatorResult } from "./calculator-result";
import type { ICalculationResult } from "./types";

const mockResult: ICalculationResult = {
    dailyBasicSalary: 5000 / 30,
    firstFiveYearsAmount: 3500,
    afterFiveYearsAmount: 0,
    grossGratuity: 3500,
    statutoryCap: 120000,
    capAdjustment: 0,
    capApplied: false,
    totalGratuity: 3500,
    creditedServiceYears: 1,
    creditedServiceMonths: 0,
    creditedServiceDays: 0,
    proportionalCreditedYears: 1,
    grossServiceDays: 365,
    unpaidLeaveDays: 0,
    creditedServiceDaysTotal: 365,
    isEligible: true,
    breakdown: [
        {
            type: "creditedService",
            years: 1,
            months: 0,
            days: 0,
            variant: "period",
        },
        { type: "salary", salary: 5000 },
        {
            type: "dailySalary",
            salary: 5000,
            dailySalary: 5000 / 30,
        },
        {
            type: "firstFiveYears",
            serviceYears: 1,
            dailySalary: 5000 / 30,
            amount: 3500,
        },
        { type: "grossGratuity", amount: 3500 },
        { type: "statutoryCap", amount: 120000 },
        { type: "finalGratuity", amount: 3500 },
    ],
};

describe("CalculatorHero", () => {
    it("renders updated form fields", () => {
        render(<CalculatorHero />);

        expect(
            screen.getByLabelText(/Last Monthly Basic Salary/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Employment Start Date/i)).toBeInTheDocument();
        expect(screen.getByText(/^Last Working Date$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Unpaid Leave Days/i)).toBeInTheDocument();
    });

    it("does not render legacy contract or resignation fields", () => {
        render(<CalculatorHero />);

        expect(screen.queryByText(/^Contract Type$/i)).not.toBeInTheDocument();
        expect(
            screen.queryByText(/^Reason for Leaving$/i)
        ).not.toBeInTheDocument();
        expect(screen.queryByText(/Limited Contract/i)).not.toBeInTheDocument();
        expect(
            screen.queryByRole("option", { name: /Resignation/i })
        ).not.toBeInTheDocument();
    });
});

describe("CalculatorResult", () => {
    it("displays synchronized result values", () => {
        render(<CalculatorResult result={mockResult} reset={vi.fn()} />);

        expect(screen.getAllByText(/AED\s*3,500\.00/i).length).toBeGreaterThan(
            0
        );
        expect(
            screen.getAllByText(/1 year, 0 months and 0 days/i).length
        ).toBeGreaterThan(0);
        expect(screen.getAllByText(/Credited Service Period/i).length).toBeGreaterThan(
            0
        );
        expect(screen.getByText(/Daily Basic Salary/i)).toBeInTheDocument();
        expect(screen.queryByText(/Limited contract/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/33% gratuity/i)).not.toBeInTheDocument();
    });

    it("shows cap adjustment only when applicable", () => {
        render(
            <CalculatorResult
                result={{
                    ...mockResult,
                    grossGratuity: 122500,
                    totalGratuity: 120000,
                    capApplied: true,
                    capAdjustment: 2500,
                    breakdown: [
                        ...mockResult.breakdown.filter(
                            (item) =>
                                item.type !== "grossGratuity" &&
                                item.type !== "finalGratuity"
                        ),
                        { type: "grossGratuity", amount: 122500 },
                        { type: "statutoryCap", amount: 120000 },
                        { type: "capAdjustment", adjustment: 2500 },
                        { type: "finalGratuity", amount: 120000 },
                    ],
                }}
                reset={vi.fn()}
            />
        );

        expect(screen.getByText(/Statutory Cap Adjustment/i)).toBeInTheDocument();
        expect(screen.getAllByText(/AED\s*120,000\.00/i).length).toBeGreaterThan(
            0
        );
    });
});
