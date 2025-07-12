"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const currentMonthYear = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold text-card-foreground">
        <time dateTime={currentDate.toISOString().slice(0, 7)}>
          {currentMonthYear}
        </time>
      </h1>
      <div className="flex items-center">
        <div className="inline-flex items-center rounded-lg border border-border bg-background shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreviousMonth}
            className="h-9 w-9 rounded-l-lg rounded-r-none border-0 hover:bg-muted"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>

          <div className="h-6 w-px bg-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onToday}
            className="h-9 rounded-none border-0 px-4 text-sm font-medium hover:bg-muted"
          >
            Today
          </Button>

          <div className="h-6 w-px bg-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onNextMonth}
            className="h-9 w-9 rounded-l-none rounded-r-lg border-0 hover:bg-muted"
          >
            <span className="sr-only">Next month</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}
