import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex-1">
      <div className="lg:flex lg:h-full lg:flex-col bg-card border border-border rounded-xl overflow-hidden">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 lg:flex-none">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center">
            <div className="inline-flex items-center rounded-lg border border-border bg-background shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-9 w-9 rounded-l-lg rounded-r-none border-0"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-9 rounded-none border-0 px-4 text-sm font-medium"
              >
                Today
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-9 w-9 rounded-l-none rounded-r-lg border-0"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Skeleton className="h-9 w-24" />
              <div className="ml-6 h-6 w-px bg-border" />
              <Skeleton className="ml-6 h-9 w-32" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="ml-6 md:hidden"
            >
              <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </header>

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
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-background relative px-3 py-2 min-h-[120px]"
                >
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="mt-2 space-y-1">
                    {Math.random() > 0.7 && <Skeleton className="h-3 w-full" />}
                    {Math.random() > 0.8 && <Skeleton className="h-3 w-3/4" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-background flex h-14 flex-col px-3 py-2"
                >
                  <Skeleton className="h-4 w-4 ml-auto rounded-full" />
                  <div className="mt-auto flex flex-wrap-reverse -mx-0.5">
                    {Math.random() > 0.7 && (
                      <div className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    )}
                    {Math.random() > 0.8 && (
                      <div className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
