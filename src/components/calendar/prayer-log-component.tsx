"use client";

import type React from "react";
import type { UserPrayerLog } from "./types";
import { formatPrayerTitle } from "@/lib/utils";

interface PrayerLogComponentProps {
  prayerLog: UserPrayerLog;
  onPrayerClick: (e: React.MouseEvent) => void;
}

export default function PrayerLogComponent({
  prayerLog,
  onPrayerClick,
}: PrayerLogComponentProps) {
  return (
    <li>
      <button onClick={onPrayerClick} className="group flex w-full text-left">
        <p className="flex-auto truncate font-medium text-card-foreground group-hover:text-primary text-xs">
          {formatPrayerTitle(prayerLog.prayerId) || "Unknown Prayer"}
        </p>
        <time
          dateTime={prayerLog.prayedAt}
          className="ml-3 hidden flex-none text-muted-foreground group-hover:text-primary xl:block text-xs"
        >
          {new Date(prayerLog.prayedAt).toLocaleDateString()}
        </time>
      </button>
    </li>
  );
}
