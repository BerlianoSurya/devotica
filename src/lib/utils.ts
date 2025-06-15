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
