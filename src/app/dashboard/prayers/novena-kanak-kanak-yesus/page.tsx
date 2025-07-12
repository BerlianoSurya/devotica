import GoatCounterScript from "@/components/goat-counter-sc";
import { NovenaKanakKanakYesus } from "@/components/prayers-pages/novena-kanak-kanak-yesus-page";
import { getCurrentPath } from "@/lib/get‑current‑path";

export default async function Prayer() {
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <NovenaKanakKanakYesus />
      <GoatCounterScript path={path} />
    </div>
  );
}
