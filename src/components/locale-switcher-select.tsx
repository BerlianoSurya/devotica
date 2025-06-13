"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { cn } from "@/lib/utils";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          className={cn(
            "w-auto border-none bg-transparent p-2 shadow-none hover:bg-slate-200 focus:ring-0",
            isPending && "pointer-events-none opacity-60"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end" className="min-w-32">
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="flex cursor-default items-center px-3 py-2 text-base"
            >
              <span className="text-slate-900">{item.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
