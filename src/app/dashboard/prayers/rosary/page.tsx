import { RosaryDashboard } from "@/components/prayers-pages/rosary-dashboard";
import { getCurrentPath } from "@/lib/get‑current‑path";
import GoatCounterScript from "@/components/goat-counter-sc";

export default async function Dashboard() {
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <RosaryDashboard />
      <GoatCounterScript path={path} />
    </div>
  );
}
