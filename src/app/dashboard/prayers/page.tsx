import GoatCounterScript from "@/components/goat-counter-sc";
import PrayersPage from "@/components/prayers";
import { getCurrentPath } from "@/lib/get‑current‑path";

export default async function Prayers() {
  const path = await getCurrentPath();
  return (
    <>
      <PrayersPage />
      <GoatCounterScript path={path} />
    </>
  );
}
