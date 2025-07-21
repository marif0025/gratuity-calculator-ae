import { useCalculator } from "@/state/calculator";
import { Label } from "../ui/label";
import { DatePicker } from "./calculator-date-picker";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export function CalculatorEmployementPeriod() {
    const startDate = useCalculator((state) => state.startDate);
    const endDate = useCalculator((state) => state.endDate);
    const setStartDate = useCalculator((state) => state.actions.setStartDate);
    const setEndDate = useCalculator((state) => state.actions.setEndDate);
    const errors = useCalculator((state) => state.errors);
    const setErrors = useCalculator((state) => state.actions.setErrors);

    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);

    const startDateError = errors.find((error) => error.field === "startDate");
    const endDateError = errors.find((error) => error.field === "endDate");

    const handleStartDateChange = (date: Date) => {
        if (endDate && date > endDate) {
            setErrors([
                ...errors,
                {
                    message: "Joining date must be before end date",
                    field: "startDate",
                },
            ]);
            return;
        }

        setStartDate(date);
        setOpenStartDate(false);
        setErrors(errors.filter((error) => error.field !== "startDate"));
    };

    const handleEndDateChange = (date: Date) => {
        if (startDate && date < startDate) {
            setErrors([
                ...errors,
                {
                    message: "End date must be after joining date",
                    field: "endDate",
                },
            ]);
            return;
        }

        setEndDate(date);
        setOpenEndDate(false);
        setErrors(errors.filter((error) => error.field !== "endDate"));
    };

    return (
        <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Employment Period
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <DatePicker
                        open={openStartDate}
                        setOpen={setOpenStartDate}
                        label={
                            startDate
                                ? format(startDate, "dd MMM yyyy")
                                : "Joining Date"
                        }
                    >
                        <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={startDate}
                            onSelect={(d) => d && handleStartDateChange(d)}
                        />
                    </DatePicker>
                    {startDateError && (
                        <p className="text-sm text-red-500">
                            {startDateError.message}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <DatePicker
                        open={openEndDate}
                        setOpen={setOpenEndDate}
                        label={
                            endDate
                                ? format(endDate, "dd MMM yyyy")
                                : "End Date"
                        }
                    >
                        <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={endDate}
                            className="rounded-lg border shadow-sm"
                            onSelect={(d) => d && handleEndDateChange(d)}
                        />
                    </DatePicker>

                    {endDateError && (
                        <p className="text-sm text-red-500">
                            {endDateError.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
