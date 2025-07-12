"use client";

import { cn } from "@/lib/utils";
import type { CalendarDay } from "./types";
import PrayerLogComponent from "./prayer-log-component";

interface CalendarDayProps {
  day: CalendarDay;
  onDateSelect: (date: string) => void;
  isDesktop?: boolean;
}

export default function CalendarDayComponent({
  day,
  onDateSelect,
  isDesktop = false,
}: CalendarDayProps) {
  if (isDesktop) {
    return (
      <div
        className={cn(
          day.isCurrentMonth
            ? "bg-background"
            : "bg-muted/50 text-muted-foreground",
          "relative px-3 py-2 min-h-[120px] cursor-pointer hover:bg-accent/50"
        )}
        onClick={() => onDateSelect(day.date)}
      >
        <time
          dateTime={day.date}
          className={cn(
            day.isToday
              ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
              : day.isCurrentMonth
              ? "text-card-foreground"
              : "text-muted-foreground"
          )}
        >
          {day.date.split("-").pop()?.replace(/^0/, "")}
        </time>
        {day.prayerLogs.length > 0 && (
          <ol className="mt-2 space-y-1">
            {day.prayerLogs.slice(0, 2).map((prayerLog) => (
              <PrayerLogComponent
                key={prayerLog.id}
                prayerLog={prayerLog}
                onPrayerClick={(e) => {
                  e.stopPropagation();
                  onDateSelect(day.date);
                }}
              />
            ))}
            {day.prayerLogs.length > 2 && (
              <li className="text-muted-foreground text-xs">
                + {day.prayerLogs.length - 2} more
              </li>
            )}
          </ol>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onDateSelect(day.isSelected ? "" : day.date)}
      className={cn(
        day.isCurrentMonth ? "bg-background" : "bg-muted/50",
        (day.isSelected || day.isToday) && "font-semibold",
        day.isSelected && "text-primary-foreground",
        !day.isSelected && day.isToday && "text-primary",
        !day.isSelected &&
          day.isCurrentMonth &&
          !day.isToday &&
          "text-card-foreground",
        !day.isSelected &&
          !day.isCurrentMonth &&
          !day.isToday &&
          "text-muted-foreground",
        "flex h-14 flex-col px-3 py-2 hover:bg-accent focus:z-10"
      )}
    >
      <time
        dateTime={day.date}
        className={cn(
          day.isSelected &&
            "flex h-6 w-6 items-center justify-center rounded-full",
          day.isSelected && day.isToday && "bg-primary",
          day.isSelected && !day.isToday && "bg-card-foreground text-primary",
          "ml-auto"
        )}
      >
        {day.date.split("-").pop()?.replace(/^0/, "")}
      </time>
      <span className="sr-only">{day.prayerLogs.length} prayers</span>
      {day.prayerLogs.length > 0 && (
        <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
          {day.prayerLogs.map((prayerLog) => (
            <span
              key={prayerLog.id}
              className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"
            />
          ))}
        </span>
      )}
    </button>
  );
}
