"use client";

import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import type { CalendarDay } from "./types";
import { formatPrayerTitle } from "@/lib/utils";

interface SelectedDayPrayersProps {
  selectedDay: CalendarDay | undefined;
}

export default function SelectedDayPrayers({
  selectedDay,
}: SelectedDayPrayersProps) {
  if (!selectedDay?.prayerLogs.length) {
    return null;
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:hidden">
      <ol className="divide-y divide-border overflow-hidden rounded-lg bg-background text-sm ring-1 shadow-sm ring-border">
        {selectedDay.prayerLogs.map((prayerLog) => (
          <li
            key={prayerLog.id}
            className="group flex p-4 pr-6 focus-within:bg-accent hover:bg-accent"
          >
            <div className="flex-auto">
              <p className="font-semibold text-card-foreground">
                {formatPrayerTitle(prayerLog.prayerId) || "Unknown Prayer"}
              </p>
              <time
                dateTime={prayerLog.prayedAt}
                className="mt-2 flex items-center text-muted-foreground"
              >
                <Clock
                  className="mr-2 h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                {new Date(prayerLog.prayedAt).toLocaleDateString()}
              </time>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-6 flex-none self-center opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              View<span className="sr-only">, {prayerLog.prayerTitle}</span>
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}
