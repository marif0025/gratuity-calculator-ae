
import { create } from "zustand";

type TExitReason = "resignation" | "termination" | "completion";
type TContractType = "limited" | "unlimited";
export interface ICalculationResult {
    totalGratuity: number;
    firstFiveYears: number;
    afterFiveYears: number;
    totalServiceYears: number;
    totalServiceMonths: number;
    breakdown: string[];
}

export interface ICalculatorError {
    message: string;
    field: string;
}

interface CalculatorState {
    startDate?: Date;
    endDate?: Date;
    lastBasicSalary: number;
    exitReason: TExitReason;
    contractType: TContractType;
    result: ICalculationResult | null;
    errors: ICalculatorError[];
    actions: {
        setStartDate: (date?: Date) => void;
        setEndDate: (date?: Date) => void;
        setLastBasicSalary: (salary: number) => void;
        setExitReason: (reason: TExitReason) => void;
        setContractType: (type: TContractType) => void;
        setResult: (result: ICalculationResult) => void;
        setErrors: (errors: ICalculatorError[]) => void;
        reset: () => void;
    }
}

export const useCalculator = create<CalculatorState>((set) => ({
    lastBasicSalary: 0,
    exitReason: "resignation",
    contractType: "limited",
    result: null,
    errors: [],
    actions: {
        setStartDate: (date) => set({ startDate: date }),
        setEndDate: (date) => set({ endDate: date }),
        setLastBasicSalary: (salary) => set({ lastBasicSalary: salary }),
        setExitReason: (reason) => set({ exitReason: reason }),
        setContractType: (type) => set({ contractType: type }),
        setResult: (result) => set({ result }),
        setErrors: (errors) => set({ errors }),
        reset: () =>
            set({
                startDate: undefined,
                endDate: undefined,
                lastBasicSalary: 0,
                exitReason: "resignation",
                contractType: "limited",
                result: null,
            }),
    }
}));
