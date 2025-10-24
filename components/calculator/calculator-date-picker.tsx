"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
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
                    className={cn(
                        "data-[empty=true]:text-white/60 text-white/60 w-full justify-start text-left font-normal cursor-pointer min-h-12 !pl-4.5 bg-black/10 hover:text-white hover:bg-transparent",
                        {
                            "text-white": label,
                        }
                    )}
                >
                    <CalendarIcon />
                    <span>{label ?? "Employment Period"}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">{children}</PopoverContent>
        </Popover>
    );
}
