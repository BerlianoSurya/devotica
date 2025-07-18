import { clsx, type ClassValue } from "clsx";
import { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { type LucideIcon } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ReactFC<T> = React.FC<PropsWithChildren & T>;

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface SelectOption {
  value: string;
  label?: string;
  emoji?: string;
  icon?: LucideIcon;
  closeOnClick?: boolean;
}

export const processColor = (c: string | undefined): string | undefined => {
  if (!c) return undefined;
  return c.startsWith("bg-") ? c.substring(3) : c;
};

export function formatPrayerTitle(input: string): string {
  const withSpaces = input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ");

  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
export function isNotTodayOrPast(dateString: string) {
  const inputDate = new Date(dateString);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate > today;
}

export function getRateLimitKey(userId: string, ip: string) {
  return `${userId}-${ip}`;
}
