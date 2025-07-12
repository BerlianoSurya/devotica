// Updated to match your database schema
export interface UserPrayerLog {
  id: string;
  userId: string;
  prayerId: string;
  prayedAt: string;
  prayerTitle: string;
}

export interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  prayerLogs: UserPrayerLog[];
}
