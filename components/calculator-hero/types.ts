import type { TCalculatorFormData } from "./schema";

export type { TCalculatorFormData };

export type BreakdownItem =
    | {
          type: "grossService";
          years: number;
          months: number;
          days: number;
      }
    | {
          type: "unpaidLeave";
          days: number;
      }
    | {
          type: "creditedService";
          years: number;
          months: number;
          days: number;
          variant?: "period" | "used";
      }
    | {
          type: "salary";
          salary: number;
      }
    | {
          type: "dailySalary";
          salary: number;
          dailySalary: number;
      }
    | {
          type: "firstFiveYears";
          serviceYears: number;
          dailySalary: number;
          amount: number;
      }
    | {
          type: "afterFiveYears";
          serviceYears: number;
          dailySalary: number;
          amount: number;
      }
    | {
          type: "grossGratuity";
          amount: number;
      }
    | {
          type: "statutoryCap";
          amount: number;
      }
    | {
          type: "capAdjustment";
          adjustment: number;
      }
    | {
          type: "finalGratuity";
          amount: number;
      }
    | {
          type: "eligibility";
          message: string;
      };

export interface ICalculationResult {
    dailyBasicSalary: number;
    firstFiveYearsAmount: number;
    afterFiveYearsAmount: number;
    grossGratuity: number;
    statutoryCap: number;
    capAdjustment: number;
    capApplied: boolean;
    totalGratuity: number;

    creditedServiceYears: number;
    creditedServiceMonths: number;
    creditedServiceDays: number;
    proportionalCreditedYears: number;

    grossServiceDays: number;
    unpaidLeaveDays: number;
    creditedServiceDaysTotal: number;

    isEligible: boolean;
    breakdown: BreakdownItem[];
}
