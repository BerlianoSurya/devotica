import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const categoryPills = [
    "All",
    "Marian Devotions",
    "Novenas",
    "Chaplets",
    "Sacred Heart",
    "Daily Prayers",
    "Lenten Devotions",
    "Litanies",
  ];

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col space-y-4">
        <div>
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-3 h-4 w-[520px] max-w-full" />
        </div>

        <div className="relative max-w-md">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryPills.map((pill) => (
            <Skeleton key={pill} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border border-border rounded-xl p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-44" />
                  <Skeleton className="h-4 w-24 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
