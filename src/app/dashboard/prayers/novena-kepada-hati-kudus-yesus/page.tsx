import GoatCounterScript from "@/components/goat-counter-sc";
import { NovenaKepadaHatiKudusYesusPrayer } from "@/components/prayers-pages/novena-kepada-hati-kudus-yesus-page";
import { getCurrentPath } from "@/lib/get‑current‑path";

export default async function Prayer() {
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <NovenaKepadaHatiKudusYesusPrayer />
      <GoatCounterScript path={path} />
    </div>
  );
}
