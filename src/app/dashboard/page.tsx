import { fetchUserPrayerLogWrapper } from "@/actions/prayers-action";
import Calendar from "@/components/calendar";
import CalendarSkeleton from "@/components/calendar/calendar-skeleton";
import PermanentModal from "@/components/permanent-modal";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const data = await fetchUserPrayerLogWrapper();
  if (data.error === "unauthorized") {
    redirect("/login");
  }
  if (!data.success)
    return (
      <>
        <PermanentModal
          title="System Maintenance"
          iconType="alert"
          iconSize="lg"
          message="The prayer database is currently undergoing scheduled maintenance. Some features may be temporarily unavailable."
        >
          <div className="text-sm">
            <p className="font-medium text-card-foreground mb-2">
              Maintenance Details:
            </p>
            <p className="text-muted-foreground">
              Expected duration: 15-30 minutes
            </p>
            <p className="text-muted-foreground">Started: 2:30 PM EST</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="animate-pulse h-2 w-2 rounded-full bg-amber-500"></div>
              <span className="text-xs text-muted-foreground">
                Maintenance in progress...
              </span>
            </div>
          </div>
        </PermanentModal>{" "}
        <CalendarSkeleton />
      </>
    );
  return (
    <div className="flex-1">
      <Calendar userPrayerLogs={data.logs} />
    </div>
  );
}
