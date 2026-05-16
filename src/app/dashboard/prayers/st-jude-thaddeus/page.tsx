import GoatCounterScript from "@/components/goat-counter-sc";
import { StJudeThaddeusPrayer } from "@/components/prayers-pages/st-jude-thaddeus-page";
import { getCurrentPath } from "@/lib/get‑current‑path";

export default async function Prayer() {
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <StJudeThaddeusPrayer />
      <GoatCounterScript path={path} />
    </div>
  );
}
