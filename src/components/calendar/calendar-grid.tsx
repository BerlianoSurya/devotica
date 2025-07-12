"use client";

import type { CalendarDay } from "./types";
import CalendarDayComponent from "./calendar-day";

interface CalendarGridProps {
  days: CalendarDay[];
  onDateSelect: (date: string) => void;
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarGrid({
  days,
  onDateSelect,
}: CalendarGridProps) {
  return (
    <div className="ring-1 shadow-sm ring-border lg:flex lg:flex-auto lg:flex-col">
      <div className="grid grid-cols-7 gap-px border-b border-border bg-muted text-center text-xs font-semibold text-muted-foreground lg:flex-none">
        {dayNames.map((day) => (
          <div key={day} className="bg-background py-2">
            {day.charAt(0)}
            <span className="sr-only sm:not-sr-only">{day.slice(1)}</span>
          </div>
        ))}
      </div>

      <div className="flex bg-muted text-xs text-muted-foreground lg:flex-auto">
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {days.map((day) => (
            <CalendarDayComponent
              key={day.date}
              day={day}
              onDateSelect={onDateSelect}
              isDesktop={true}
            />
          ))}
        </div>

        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {days.map((day) => (
            <CalendarDayComponent
              key={day.date}
              day={day}
              onDateSelect={onDateSelect}
              isDesktop={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
