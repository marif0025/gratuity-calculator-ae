"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export function DatePicker({
    label,
    children,
    open,
    setOpen,
    ...props
}: DatePickerProps) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    {...props}
                    variant="outline"
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal cursor-pointer border-2 rounded-2xl !pl-4.5"
                >
                    <CalendarIcon />
                    <span>{label}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">{children}</PopoverContent>
        </Popover>
    );
}
