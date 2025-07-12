"use client";

import { useState, useMemo } from "react";
import type { CalendarDay, UserPrayerLog } from "./calendar/types";
import CalendarHeader from "./calendar/calendar-header";
import CalendarGrid from "./calendar/calendar-grid";
import DayPrayersModal from "./calendar/day-prayers-modal";
import { Toaster } from "sonner";

export default function Calendar({
  userPrayerLogs,
}: {
  userPrayerLogs: UserPrayerLog[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setShowDayModal(false);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setShowDayModal(false);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
    setShowDayModal(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const closeDayModal = () => {
    setShowDayModal(false);
  };

  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const firstDay = new Date(year, month, 1);

    const startDate = new Date(firstDay);
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(firstDay.getDate() - dayOfWeek);

    const days: CalendarDay[] = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dateString = [
        currentDateObj.getFullYear(),
        String(currentDateObj.getMonth() + 1).padStart(2, "0"),
        String(currentDateObj.getDate()).padStart(2, "0"),
      ].join("-");
      const isCurrentMonth = currentDateObj.getMonth() === month;
      const isToday = dateString === todayString;
      const isSelected = dateString === selectedDate;

      const dayPrayerLogs = isCurrentMonth
        ? userPrayerLogs.filter(
            (log: UserPrayerLog) => log.prayedAt === dateString
          )
        : [];

      days.push({
        date: dateString,
        isCurrentMonth,
        isToday,
        isSelected,
        prayerLogs: dayPrayerLogs,
      });

      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  }, [currentDate, selectedDate, userPrayerLogs]);

  const selectedDay = days.find((day) => day.isSelected);

  return (
    <div className="lg:flex lg:h-full lg:flex-col bg-card border border-border rounded-xl overflow-hidden">
      <Toaster richColors />
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />

      <CalendarGrid days={days} onDateSelect={handleDateSelect} />

      {showDayModal && selectedDay && (
        <DayPrayersModal selectedDay={selectedDay} onClose={closeDayModal} />
      )}
    </div>
  );
}
