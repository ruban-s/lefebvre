"use client";

import * as React from "react";
import { SlCalender } from "react-icons/sl";
import { addDays, format, differenceInDays } from "date-fns";
import { DateRange, Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { undefined } from "zod";

interface DatePickerWithRangeProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  disabled?: Matcher[];
  selectedData: DateRange | undefined;
  onselect: Function;
  fromDate?: string;
  toDate?: string;
}

export function DatePickerWithRange({
  className,
  disabled,
  onselect,
  selectedData,
  fromDate,
  toDate,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  React.useEffect(() => {
    console.log(selectedData);
    setDate(selectedData);
  }, [selectedData]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}>
            <SlCalender className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick Dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus={false}
            mode="range"
            fromDate={new Date(fromDate!)}
            toDate={new Date(toDate!)}
            selected={date}
            onSelect={(data) => {
              setDate(data);
              onselect(data);
            }}
            numberOfMonths={2}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
